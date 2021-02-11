import React, {
  useLayoutEffect,
  useCallback,
  useMemo,
  useEffect,
  useState,
} from 'react';
import {View, Text, Pressable, ToastAndroid} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';

import {BottomSheet} from 'components/common';

import {dateFormat, timeFormat} from 'constants/App';

import {usePosts} from 'hooks/usePosts';
import {useAsyncStorage} from 'hooks/useAsyncStorage';
import {useModal} from 'contexts/ModalContext';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const PostDetail = styled.View`
  background-color: white;
  height: 100%;
  padding: 20px;
`;

const Title = styled.TextInput`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.fontColor};
`;

const Content = styled.TextInput`
  font-size: 18px;
  color: ${Colors.fontColor};
  height: 80%;
  margin-bottom: 20px;
  text-align-vertical: top;
`;

const DateInfo = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Date = styled.Text`
  font-weight: bold;
  font-size: 18px;
  letter-spacing: 1px;
`;

const Time = styled.Text`
  font-size: 15px;
  letter-spacing: 1px;
`;

const EditWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const Menu = styled.Pressable`
  display: flex;
  flex-direction: row;
  padding: 15px;
  align-items: center;
`;

const MenuName = styled.Text`
  margin-left: 16px;
`;

const EditButton = ({onShowMenu}) => (
  <EditWrapper>
    <Pressable
      style={{marginRight: 5, padding: 5}}
      android_ripple={{color: 'lightgray'}}>
      <Icon name="favorite-border" size={30} />
    </Pressable>
    <Pressable
      style={{marginRight: 5, padding: 5}}
      android_ripple={{color: 'lightgray'}}
      onPress={onShowMenu}>
      <Icon name="more-vert" size={30} />
    </Pressable>
  </EditWrapper>
);

const PostDetailScreen = ({route, navigation}) => {
  const {groupId, isEditMode = false, post = {}} = route.params;
  console.log('<PostDetailScreen /> params ', groupId, isEditMode, post);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const sheetRef = React.useRef(null);
  const {createPost, updatePost, deletePost} = usePosts();
  const {openModal, closeModal} = useModal();
  const {setItem, getItem, removeItem} = useAsyncStorage();
  const key = useMemo(
    () => (post.id ? `${groupId}_${post.id}` : `${groupId}_new`),
    [],
  );

  const items = useMemo(
    () => [
      {
        icon: 'delete-outline',
        name: '삭제하기',
        onPress: () => handleDeletePost(),
      },
      {icon: 'folder-open', name: '다른 그룹으로 이동', onPress: () => {}},
    ],
    [],
  );

  const date = isEditMode ? new moment(post.date) : new moment();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        isEditMode ? (
          <EditButton
            onShowMenu={() => {
              sheetRef.current.present();
            }}
          />
        ) : (
          <Pressable
            style={{marginRight: 5, padding: 5}}
            android_ripple={{color: 'lightgray'}}>
            <Icon name="photo-camera" size={30} />
          </Pressable>
        ),
      headerTitle: () => (
        <DateInfo>
          <Date> {date.format(dateFormat)} </Date>
          <Time> {date.format(timeFormat)}</Time>
        </DateInfo>
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    if (!isEditMode) return;

    const {title, content} = post;
    setTitle(title);
    setContent(content);
  }, []);
  
  //check for previously stored data
  useEffect(() => {
    getItem(key).then((storedItem) => {
      if (!storedItem) return;
      const {title: storedTitle, content: storedContent} = storedItem;
      if (!storedTitle && !storedContent) return;

      openModal(<Text> 임시저장된 글이 존재합니다. 복원하시겠습니까? </Text>, {
        onConfirm: () => handleRestorePost(storedTitle, storedContent),
        onClose: () => {
          removeItem(key);
          closeModal();
        },
        disableBackdropPress: true,
      });
    });
  }, []);

  const handleChangeTitle = useCallback(
    (value) => {
      setTitle(value);

      getItem(key).then((storedValue) => {
        setItem(key, {...storedValue, title: value});
      });
    },
    [title],
  );

  const handleChangeContent = useCallback(
    (value) => {
      setContent(value);

      getItem(key).then((storedValue) => {
        setItem(key, {...storedValue, content: value});
      });
    },
    [content],
  );

  const handleRestorePost = (title = '', content = '') => {
    setTitle(title);
    setContent(content);
    closeModal();
  };

  const handleSavePost = async () => {
    if (!content.trim()) {
      ToastAndroid.show('내용을 입력해주세요', ToastAndroid.SHORT);
      return;
    }

    const params = {
      groupId: parseInt(groupId),
      date: new moment().toDate().toUTCString(),
      title,
      content,
      images: '',
    };

    const query = await (isEditMode
      ? updatePost({...params, postId: parseInt(post.id)})
      : createPost(params));
    console.log('create post', post);

    if (query.error) {
      ToastAndroid.show(
        '일시적인 에러가 발생했습니다. 다시 시도해 주세요.',
        ToastAndroid.SHORT,
      );
      return;
    }

    ToastAndroid.show('글을 저장했어요 :)', ToastAndroid.SHORT);
    navigation.goBack();
  };

  const handleDeletePost = () => {
    openModal(<Text> 글을 삭제 하시겠습니까? </Text>, {
      onConfirm: async () => {
        const del = await deletePost(post.id);
        if (del.error) {
          ToastAndroid.show(
            '일시적인 에러가 발생했습니다. 다시 시도해 주세요.',
            ToastAndroid.SHORT,
          );
          return;
        }

        ToastAndroid.show('글을 삭제했어요', ToastAndroid.SHORT);
        closeModal();
        navigation.goBack();
      },
      onClose: () => closeModal(),
      disableBackdropPress: true,
    });
  };

  return (
    <PostDetail>
      <View>
        <Text> Images .. . </Text>
      </View>

      <Title
        editable
        numberOfLines={1}
        placeholder="제목없음"
        autoCorrect={false}
        value={title}
        onChangeText={handleChangeTitle}
      />
      <Content
        editable
        multiline
        placeholder="내용을 입력해 주세요 :)"
        autoCorrect={false}
        value={content}
        onChangeText={handleChangeContent}
      />

      <Button title="Save" onPress={handleSavePost} />
      <BottomSheet ref={sheetRef} snapPoints={[0, 130]}>
        {items.map((item) => (
          <Menu android_ripple={{color: 'lightgray'}} onPress={item.onPress}>
            <Icon name={item.icon} size={28} />
            <MenuName> {item.name}</MenuName>
          </Menu>
        ))}
      </BottomSheet>
    </PostDetail>
  );
};

export default PostDetailScreen;
