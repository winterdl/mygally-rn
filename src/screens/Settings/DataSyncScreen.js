import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Pressable,
  ToastAndroid,
  FlatList,
} from 'react-native';
import {Button} from 'react-native-elements';
import {GoogleSignin} from 'react-native-google-signin';
import {HeaderBackButton} from '@react-navigation/stack';
import moment from 'moment';

import Header from 'components/Header';
import MenuCard from 'components/MenuCard';
import {BottomSheet} from 'components/common';

import styled from 'styled-components/native';
import Colors from 'datas/Colors';

import * as ErrorCode from 'constants/ErrorCode';
import {APP_DIRECTORY} from 'constants/App';
import {DB_FILE_NAME, DB_DIRECTORY} from 'constants/Database';
import {useGoogleLogin} from 'hooks';
import * as GoogleDrive from 'utils/GoogleDrive';
import {getFileList} from '../../utils/GoogleDrive';

const DataSyncContainer = styled.View`
  padding: 25px;
  background-color: ${Colors.backgroundColor};
  height: 100%;
`;

const Loader = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
`;

const FileList = styled.FlatList`
  margin-bottom: 20px;
`;
const BackupItem = styled.Pressable`
  padding: 7px 15px;
`;

const BackupDate = styled.Text`
  margin-bottom: 3px;
  font-size: 16px;
`;

const BackupInfo = styled.Text`
  color: #696969;
  font-size: 13px;
`;

const Divider = styled.View`
  background-color: lightgray;
  height: 1px;
`;
const DataSyncScreen = ({route, navigation}) => {
  const {
    userInfo,
    checkSignInStatus,
    getCurrentUserInfo,
    signIn,
    signOut,
  } = useGoogleLogin();
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [backupFileList, setBackupFileList] = useState([]);

  const sheetRef = useRef(null);

  const {title} = route.params;
  const menu = [
    {
      groupName: null,
      menuItems: [
        {
          name: '구글 계정 정보',
          description: userInfo ? userInfo.user.email : '로그인이 필요합니다.',
          callback: userInfo ? null : () => _signIn(),
        },
        {
          name: '데이터 백업하기',
          description: '구글 드라이브에 데이터를 백업합니다.',
          callback: () => onDataBackup(),
        },
        {
          name: '데이터 복원하기',
          description: '구글 드라이브로부터 데이터를 복원합니다.',
          callback: () => showBackupFileList(),
        },
      ],
    },
  ];

  //check for sign in status
  useEffect(() => {
    _checkSignInStatus();
  }, []);

  const onDataRestore = async (id) => {
    try {
      setGettingLoginStatus(true);
      sheetRef.current.close();
      await GoogleDrive.retrieveFile(id);
      ToastAndroid.show('백업 파일을 복구했습니다.', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    }
    setGettingLoginStatus(false);
  };

  const onDataBackup = async () => {
    try {
      if (!userInfo) {
        _signIn();
        return;
      }

      setGettingLoginStatus(true);
      const fileName = 'DayDiary' + '.' + moment().format('x');
      await GoogleDrive.uploadDataFile(
        `${DB_DIRECTORY}/${DB_FILE_NAME}`,
        fileName,
      );
      await GoogleDrive.uploadImageFile(APP_DIRECTORY);
      ToastAndroid.show('백업 파일을 업로드 했습니다.', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
      console.log('BACKUP ERROR', error);
    }

    setGettingLoginStatus(false);
  };

  const _checkSignInStatus = async () => {
    const isSignedIn = await checkSignInStatus();

    try {
      //if signed in, get user info
      if (isSignedIn) await getCurrentUserInfo();
    } catch (error) {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    }
    setGettingLoginStatus(false);
  };

  const _signIn = async () => {
    setGettingLoginStatus(true);
    try {
      await signIn();
    } catch (error) {
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    }
    setGettingLoginStatus(false);
  };

  const _signOut = async () => {
    setGettingLoginStatus(true);

    //remove user session from device
    try {
      await GoogleSignin.revokeAccess();
      await signOut();
    } catch (error) {
      console.error('SIGN OUT FAIL', error.toString());
    }

    setGettingLoginStatus(false);
  };

  const showBackupFileList = async () => {
    try {
      if (!userInfo) {
        _signIn();
        return;
      }

      setGettingLoginStatus(true);
      const backupDir = await GoogleDrive.createDirectory('DayDiary');
      const files = await getFileList(
        `'${backupDir}' in parents and trashed=false`,
      );

      if (!files.length) throw new Error(ErrorCode.BACKUP_FILE_NOT_EXISTS);
      setBackupFileList(files);
      sheetRef.current.present();
    } catch (error) {
      ToastAndroid.show('백업 파일을 불러오지 못했습니다.', ToastAndroid.SHORT);
      console.log('백업 파일 로드 실패', error);
    }
    setGettingLoginStatus(false);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        headerLeft={
          <HeaderBackButton
            style={{marginLeft: 0, marginRight: 0}}
            onPress={() => navigation.goBack()}
          />
        }
        headerTitle={title}
        searchVisible={false}
      />
      <DataSyncContainer>
        <View>
          {menu.map((group) => (
            <MenuCard group={group} navigation={navigation} />
          ))}
        </View>
        {gettingLoginStatus && (
          <Loader>
            <ActivityIndicator size="large" color={Colors.active} />
          </Loader>
        )}
        {userInfo && <Button title="로그아웃" onPress={_signOut} />}
      </DataSyncContainer>

      <BottomSheet ref={sheetRef} index={0} snapPoints={['50%', '70%']}>
        <FileList
          data={backupFileList}
          ItemSeparatorComponent={() => <Divider />}
          ListHeaderComponent={() => (
            <BackupItem>
              <BackupInfo>
                목록에서 복구할 백업 파일을 선택하세요. 복구를 진행하면 기존
                데이터는 날아갑니다.
              </BackupInfo>
            </BackupItem>
          )}
          renderItem={({item}) => {
            const {id, name} = item;
            const [, createdTime] = name.split('.');

            return (
              <BackupItem
                android_ripple={{color: 'lightgray'}}
                onPress={() => onDataRestore(id)}>
                <BackupDate>{moment(createdTime, 'x').fromNow()}</BackupDate>
                <BackupInfo>
                  {moment(createdTime, 'x').format(
                    'YYYY년 MM월 DD일 A hh시 mm분',
                  )}
                </BackupInfo>
              </BackupItem>
            );
          }}
        />
      </BottomSheet>
    </View>
  );
};

export default DataSyncScreen;
