import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, FlatList} from 'react-native';

import Header from 'components/Header';
import GroupCard from 'components/GroupCard';
import {FloatingButton} from 'components/common';

import {useGroups} from 'hooks/useGroups';

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
  const {getGroupList, groupList} = useGroups();

  useEffect(() => {
    getGroupList();
    console.log('>>grouplist<<', groupList);
  }, []);

  console.log('list', groupList);

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
          empty={true}
          style={{color: 'transparent', backgroundColor: 'transparent'}}
        />
      );
    }
    return (
      <GroupCard
        id={item.id}
        name={item.name}
        count={item.count || 0}
        icon={item.icon}
        onPress={() => navigation.navigate('Group', {groupId: item.id})}
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
          data={formatData(groupList, 2)}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
      </Groups>
      <FloatingButton onPress={() => navigation.navigate('GroupCreate')} />
    </HomeWrapper>
  );
};

export default Home;
