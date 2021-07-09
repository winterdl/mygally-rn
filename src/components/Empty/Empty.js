import React from 'react';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const Wrapper = styled.View`
  width: 100%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Message = styled.Text`
  color: ${Colors.fontColor};
  font-size: 17px;
`;

const Empty = ({message}) => {
  return (
    <Wrapper>
      <Message> {message} </Message>
    </Wrapper>
  );
};

Empty.defaultProps = {
  message: '',
};

export default Empty;
