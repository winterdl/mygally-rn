import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  Pressable,
  ToastAndroid,
} from 'react-native';
import {GoogleSignin} from 'react-native-google-signin';
import {HeaderBackButton} from '@react-navigation/stack';

import Header from 'components/Header';
import MenuCard from 'components/MenuCard';

import styled from 'styled-components';
import Colors from 'datas/Colors';

import {useGoogleLogin} from 'hooks';

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
const DataSyncScreen = ({route, navigation}) => {
  const {
    userInfo,
    checkSignInStatus,
    getCurrentUserInfo,
    signIn,
    signOut,
  } = useGoogleLogin();
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
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
          callback: () => onDataRestore(),
        },
      ],
    },
  ];

  const onDataRestore = () => {
    console.log('restore');
  };
  const onDataBackup = () => {
    console.log('backup');
  };

  //check for sign in status
  useEffect(() => {
    _checkSignInStatus();
  }, []);

  const _checkSignInStatus = async () => {
    const isSignedIn = await checkSignInStatus();

    try {
      //if signed in, get user info
      if (isSignedIn) await getCurrentUserInfo();
    } catch (error) {
      console.error('CHECK SIGN IN FAIL', error);
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    }
    setGettingLoginStatus(false);
  };

  const _signIn = async () => {
    setGettingLoginStatus(true);
    try {
      await signIn();
    } catch (error) {
      console.error('SIGN IN FAIL', error.toString());
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
          <Pressable onPress={_signOut}>
            <Text>logout</Text>
          </Pressable>
          {menu.map((group) => (
            <MenuCard group={group} navigation={navigation} />
          ))}
        </View>
        {gettingLoginStatus && (
          <Loader>
            <ActivityIndicator size="large" color={Colors.active} />
          </Loader>
        )}
      </DataSyncContainer>
    </View>
  );
};

export default DataSyncScreen;
