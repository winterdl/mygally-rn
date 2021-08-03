import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const MenuItemWrapper = styled.Pressable`
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: auto;
`;

const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-left: 5px;
`;
const MenuItemName = styled.Text`
  color: ${(props) => (props.disabled ? 'lightgray' : Colors.fontColor)};
`;

const Description = styled.Text`
  margin-top: 5px;
  font-size: 13px;
  color: ${(props) => (props.disabled ? 'lightgray' : '#696969')};
`;

const RightComponent = ({routeTo, component = null}) => {
  if (routeTo) return <Icon name="chevron-right" size={25} color="#9e9e9e" />;
  return component;
};

const MenuItem = ({item, navigation}) => {
  const {
    name,
    icon,
    routeTo,
    children,
    description,
    callback,
    rightComponent,
    disabled,
  } = item;
  return (
    <MenuItemWrapper
      key={item.name}
      android_ripple={{color: 'lightgray'}}
      onPress={(e) => {
        routeTo && navigation.navigate(routeTo, {title: name, children});
        callback && callback(e);
      }}>
      <Icon name={icon} size={25} color={Colors.fontColor} />
      <Wrapper>
        <MenuItemName disabled={disabled}> {name}</MenuItemName>
        {description && (
          <Description disabled={disabled}> {description}</Description>
        )}
      </Wrapper>
      <RightComponent routeTo={routeTo} component={rightComponent} />
    </MenuItemWrapper>
  );
};

MenuItem.defaultProps = {
  item: {
    name: '',
    icon: null,
    description: '',
    routeTo: null,
    callback: null,
    rightComponent: null,
    disabled: false,
  },
};
export default MenuItem;
