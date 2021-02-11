import React from 'react';
import {View, Button} from 'react-native';

import styled from 'styled-components';

const ModalContainer = styled.View`
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalBody = styled.View`
  background: white;
  min-width: 350px;
  min-height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 15px;
  z-index: 200;
  border-radius: 5px;
`;

const Content = styled.View`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ModalFooter = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const ButtonContainer = styled.View`
  flex: 1;
`;

const BackDrop = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 150;
  background-color: rgba(0, 0, 0, 0.2);
`;

const DefaultFooter = ({onConfirm, onClose}) => (
  <ModalFooter>
    <ButtonContainer>
      <Button title="취소" onPress={onClose} />
    </ButtonContainer>
    <View style={{flex: 0.1}}></View>
    <ButtonContainer>
      <Button title="확인" onPress={onConfirm} />
    </ButtonContainer>
  </ModalFooter>
);

const Modal = ({
  children,
  footer,
  disableBackdropPress,
  onConfirm,
  onClose,
}) => {
  const handlePressBackdrop = () => {
    if (disableBackdropPress) return;
    onClose();
  };
  return (
    <ModalContainer>
      <ModalBody>
        <Content>{children}</Content>

        {footer || <DefaultFooter onConfirm={onConfirm} onClose={onClose} />}
      </ModalBody>

      <BackDrop onPress={handlePressBackdrop} />
    </ModalContainer>
  );
};

export default Modal;
