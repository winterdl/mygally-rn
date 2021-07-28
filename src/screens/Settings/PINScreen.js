import React from 'react';
import {View, Text} from 'react-native';
import PINCode, {deleteUserPinCode} from '@haskkor/react-native-pincode';

import Colors from 'datas/Colors';

import {useAuth} from 'contexts/AuthContext';
import {PIN_CODE_ENTER, PIN_CODE_CHOOSE} from 'constants/App';

const PINScreen = ({route, navigation}) => {
  const {status, resetPIN = false, callback, isInitialLaunch} = route.params;
  const {toggleLockState} = useAuth();

  const onFinishEnter = async () => {
    if (status === PIN_CODE_ENTER) {
      if (isInitialLaunch) {
        toggleLockState();
        return;
      } else await deleteUserPinCode();
    }

    if (resetPIN) navigation.navigate('PINScreen', {status: PIN_CODE_CHOOSE});

    navigation.goBack();
  };

  return (
    <View style={{flex: 1}}>
      <PINCode
        status={status}
        subtitleChoose="비밀번호를 입력해주세요."
        subtitleEnter="비밀번호를 입력해주세요."
        subtitleConfirm="비밀번호를 한번 더 입력해주세요."
        titleConfirmFailed="비밀번호가 일치하지 않습니다."
        vibrationEnabled={false}
        touchIDDisabled={true} 
        disableLockScreen={true}
        styleMainContainer={{backgroundColor: 'white'}}
        stylePinCodeColorTitle={Colors.fontColor}
        stylePinCodeColorSubtitle={Colors.fontColor}
        stylePinCodeCircle={{backgroundColor: '#a8beff'}}
        colorCircleButtons={Colors.backgroundColor}
        stylePinCodeButtonNumberPressed="white"
        numbersButtonOverlayColor={Colors.active} //color of button when pressed
        finishProcess={onFinishEnter}
      />
    </View>
  );
};

export default PINScreen;
