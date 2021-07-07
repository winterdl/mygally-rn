import React, {useLayoutEffect, useMemo, useEffect, useState} from 'react';
import {View, Text, Pressable, ToastAndroid, Image} from 'react-native';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import moment from 'moment';
import RNFS from 'react-native-fs';

import {BottomSheet, Carousel} from 'components/common';

import {DATE_DISPLAY_FORMAT, DATE_DB_FORMAT,TIME_FORMAT,} from 'constants/App';

import {
  usePosts,
  useAsyncStorage,
  useReferredState,
  useImagePicker,
} from 'hooks';
import {useModal} from 'contexts/ModalContext';

import styled from 'styled-components';
import Colors from 'datas/Colors';

import {APP_DIRECTORY} from 'constants/App';

const PostDetail = styled.View`
  background-color: white;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.TextInput`
  font-size: 20px;
  font-weight: bold;
  color: ${Colors.fontColor};
`;

const Content = styled.TextInput`
  font-size: 18px;
  color: ${Colors.fontColor};
  margin-bottom: 20px;
  flex: 1;
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

  const sheetRef = React.useRef(null);
  const [deleteList, setDeleteList] = useState([]);
  const [title, titleRef, setTitleRef] = useReferredState(title);
  const [content, contentRef, setContentRef] = useReferredState(content);

  const {createPost, updatePost, deletePost} = usePosts();
  const {openModal, closeModal} = useModal();
  const {setItem, getItem, removeItem} = useAsyncStorage();
  const {images, setImages, openImagePicker} = useImagePicker();
  const key = useMemo(
    () => (post.id ? `${groupId}_${post.id}` : `${groupId}_new`),
    [],
  );

  const items = useMemo(
    () => [
      {
        icon: 'photo-camera',
        name: '사진 첨부',
        onPress: () => openImagePicker(),
      },
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

  //set custom header button depending on edit mode
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
            android_ripple={{color: 'lightgray'}}
            onPress={openImagePicker}>
            <Icon name="photo-camera" size={30} />
          </Pressable>
        ),
      headerTitle: () => (
        <DateInfo>
          <Date> {date.format(DATE_DISPLAY_FORMAT)} </Date>
          <Time> {date.format(TIME_FORMAT)}</Time>
        </DateInfo>
      ),
      headerTitleAlign: 'center',
    });
  }, [navigation]);

  useEffect(() => {
    if (isEditMode) {
      setTitleRef(post.title);
      setContentRef(post.content);

      //set Images
      let images = [];
      if (!post.images) return;

      post.images
        .split(',')
        .forEach((name) =>
          images.push({fileName: name, modificationDate: name.split('_')[0]}),
        );
      setImages(images);
    }
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
      });
    });
  }, []);

  //check if there is current editing item before removing screen
  useEffect(() => {
    navigation.addListener('beforeRemove', handleNavigationGoBack);

    return () => navigation.removeListener('beforeRemove', null);
  }, [navigation]);

  const handleNavigationGoBack = (e) => {
    if (!titleRef.current && !contentRef.current) return;

    const hasUnsavedChanges = checkUnsavedChanges();
    if (!hasUnsavedChanges) return;

    e.preventDefault(); //prevent leaving the screen

    openModal(<Text> 작성중인 내용이 있습니다. 저장하시겠습니까? </Text>, {
      onConfirm: () => {
        handleSavePost();
        closeModal();
      },
      onClose: () => {
        removeItem(key);
        closeModal();
        navigation.dispatch(e.data.action);
      },
    });
  };

  /**
   *
   * @description compare previous value with current state
   * @return {Boolean}
   */
  const checkUnsavedChanges = () => {
    const {title: prevTitle, content: prevContent} = post;
    let hasUnsavedChanges = false;

    if (prevTitle !== titleRef.current || prevContent !== contentRef.current)
      hasUnsavedChanges = true;

    return hasUnsavedChanges;
  };

  const handleChangeTitle = (value) => {
    setTitleRef(value);

    getItem(key).then((storedValue) => {
      setItem(key, {...storedValue, title: value});
    });
  };

  const handleChangeContent = (value) => {
    setContentRef(value);

    getItem(key).then((storedValue) => {
      setItem(key, {...storedValue, content: value});
    });
  };

  const handleRestorePost = (title = '', content = '') => {
    setTitleRef(title);
    setContentRef(content);
    closeModal();
  };

  const handleSavePost = async () => {
    if (!contentRef.current.trim()) {
      ToastAndroid.show('내용을 입력해주세요', ToastAndroid.SHORT);
      return;
    }

    let index = 1;
    const params = {
      groupId: parseInt(groupId),
      date: new moment().format(DATE_DB_FORMAT),
      title: titleRef.current,
      content: contentRef.current,
      images: images
        .map((img) => img.fileName || `${img.modificationDate}_${index++}`)
        .join(','),
    };
    const query = await (isEditMode
      ? updatePost({...params, postId: parseInt(post.id)})
      : createPost(params));

    saveImagesToDB();
    removeImagesFromDB();

    if (query.error) {
      ToastAndroid.show(
        '일시적인 에러가 발생했습니다. 다시 시도해 주세요.',
        ToastAndroid.SHORT,
      );
      return;
    }

    ToastAndroid.show('글을 저장했어요 :)', ToastAndroid.SHORT);
    removeItem(key);
    setTitleRef(null);
    setContentRef(null);
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
        setTitleRef(null);
        setContentRef(null);
        navigation.goBack();
      },
      onClose: () => closeModal(),
      disableBackdropPress: true,
    });
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    if (images[index].fileName)
      setDeleteList((prevState) => [...prevState, images[index].fileName]);
  };

  //remove image files from DB, which has been deleted from list
  const removeImagesFromDB = () => {
    deleteList.forEach(({fileName}) => {
      RNFS.unlink(`${fileName}.jpg`).catch((err) => {
        console.log(err.message);
      });
    });
  };

  //save selected images to DB
  const saveImagesToDB = () => {
    let index = 1;

    images.forEach((image) => {
      const {path, modificationDate} = image;

      //only save newly added images, which has a path
      if (path) {
        RNFS.copyFile(
          path,
          `${APP_DIRECTORY}/${modificationDate}_${index++}.jpg`,
        ).catch((err) => {
          console.log(err.message);
        });
      }
    });
  };


  return (
    <PostDetail>
      <View>
        <Carousel
          items={images.map(
            (img, i) =>
              img.path || `file://${APP_DIRECTORY}/${img.fileName}.jpg`,
          )}
          onDelete={handleDeleteImage}
        />
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

      <Button title="저장" onPress={handleSavePost} />
      <BottomSheet ref={sheetRef} snapPoints={[0, 180]}>
        {items.map((item) => (
          <Menu
            android_ripple={{color: 'lightgray'}}
            onPress={() => {
              item.onPress();
              sheetRef.current.close();
            }}>
            <Icon name={item.icon} size={28} />
            <MenuName> {item.name}</MenuName>
          </Menu>
        ))}
      </BottomSheet>
    </PostDetail>
  );
};

export default PostDetailScreen;
