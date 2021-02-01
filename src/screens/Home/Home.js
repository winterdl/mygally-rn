import React, {useState, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';

import Header from 'components/Header';
import GroupCard from 'components/GroupCard';
import GroupCreate from 'components/GroupCreate';
import {FloatingButton} from 'components/common';

import styled from 'styled-components';
import Colors from 'datas/Colors';

const HomeWrapper = styled.View`
  background-color: ${Colors.backgroundColor};
  height: 100%;
`;

const Groups = styled.View`
  padding: 16px;
  flex: 1;
`;

const Home = ({navigation}) => {
  const [isVisible, setVisible] = useState(false);

  const toggleGroupCreate = useCallback(() => {
    setVisible((prevState) => !prevState);
  }, [isVisible]);

  const groups = [
    {
      name: '다이어리 이름',
      count: '10',
      id: 1,
    },
    {
      name: '밥 일기',
      count: '10',
      id: 2,
    },
    {
      name: 'lorem ipsum lnogong text very long!!',
      count: '10',
      id: 3,
    },
  ];

  const renderItem = ({item}) => {
    if (item.empty) {
      return (
        <GroupCard
          style={{color: 'transparent', backgroundColor: 'transparent'}}
        />
      );
    }
    return (
      <GroupCard
        id={item.id}
        name={item.name}
        count={item.count}
        icon={true}
        onPress={() => navigation.navigate('Group')}
      />
    );
  };

  const formatData = (data, columns) => {
    const numberOfRows = Math.floor(data.length / columns);

    const remainingElements = data.length - numberOfRows * columns;

    [new Array(remainingElements)].forEach((item, index) =>
      data.push({id: `blank-${index}`, empty: true}),
    );

    return data;
  };

  return (
    <HomeWrapper>
      <Header />
      <Groups>
        <FlatList
          data={formatData(groups, 2)}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </Groups>
      <FloatingButton onPress={() => navigation.navigate('GroupCreate')} />
      {/* <GroupCreate isVisible={isVisible} onClose={toggleGroupCreate} /> */}
    </HomeWrapper>
  );
};

export default Home;
