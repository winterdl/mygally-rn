import React, {useState, useEffect} from 'react';
import {View, Switch} from 'react-native';
import {HeaderBackButton} from '@react-navigation/stack';
import {hasUserSetPinCode} from '@haskkor/react-native-pincode';

import Header from 'components/Header';
import MenuCard from 'components/MenuCard';

import styled from 'styled-components';
import Colors from 'datas/Colors';

import {PIN_CODE_ENTER, PIN_CODE_CHOOSE} from 'constants/App';

const LockScreenContainer = styled.View`
  padding: 25px;
  background-color: ${Colors.backgroundColor};
  height: 100%;
`;

const LockScreen = ({route, navigation}) => {
  const [hasPinCode, setHasPinCode] = useState(false);

  const menu = [
    {
      groupName: null,
      menuItems: [
        {
          name: '잠금 사용',
          description: null,
          callback: () => onOpenPinCode(),
          rightComponent: (
            <Switch
              trackColor={{false: '#767577', true: Colors.active}}
              thumbColor={hasPinCode ? 'white' : 'lightgray'}
              ios_backgroundColor="#3e3e3e"
              onChange={onOpenPinCode}
              value={hasPinCode}
            />
          ),
        },
        {
          name: '비밀번호 변경',
          description: '설정한 비밀번호를 변경합니다. ',
          disabled: !hasPinCode,
          callback: () => {
            if (!hasPinCode) return;
            navigation.navigate('PINScreen', {
              status: PIN_CODE_ENTER,
              resetPIN: true,
            });
          },
        },
      ],
    },
  ];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const hasPin = await hasUserSetPinCode();
      setHasPinCode(hasPin);
    });
    return unsubscribe;
  }, [navigation]);

  const onOpenPinCode = () => {
    const status = hasPinCode ? PIN_CODE_ENTER : PIN_CODE_CHOOSE;
    navigation.navigate('PINScreen', {
      status,
    });
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
        headerTitle={'잠금 설정'}
        searchVisible={false}
      />

      <LockScreenContainer>
        <View>
          {menu.map((group) => (
            <MenuCard group={group} navigation={navigation} />
          ))}
        </View>
      </LockScreenContainer>
    </View>
  );
};

export default LockScreen;
