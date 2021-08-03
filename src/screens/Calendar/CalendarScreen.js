import React, {useState, useEffect, useRef} from 'react';
import {Dimensions} from 'react-native';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {BottomSheet} from 'components/common';
import Post from 'components/Post';
import Empty from 'components/Empty/Empty';

import {usePosts} from 'hooks';
import {DATE_DB_FORMAT, EMPTY_CONTENT} from 'constants/App';

import Colors from 'datas/Colors';
import styled from 'styled-components';

const CalendarWrapper = styled.View`
  height: 100%;
  background-color: white;
`;

const PostList = styled.FlatList`
  padding: 15px;
`;

function CalendarScreen({navigation}) {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState(
    moment().format('YYYY-MM-DD'),
  );
  const [currentMonth, setCurrentMonth] = useState(Date());
  const [postListByGroup, setPostListByGroup] = useState([]);

  const sheetRef = useRef(null);
  const {postList, getFilteredPostList} = usePosts();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const startOfMonth = moment().startOf('month').format(DATE_DB_FORMAT);
      const endOfMonth = moment().endOf('month').format(DATE_DB_FORMAT);
      getFilteredPostList(startOfMonth, endOfMonth);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    let formattedDates = {};
    let postListByGroup = {};
    postList.forEach(({date, ...rest}) => {
      const _date = date.split(' ')[0]; //YYYY-MM-DD
      formattedDates[_date] = {...rest, marked: true, dotColor: 'white'};

      if (!postListByGroup[_date]) postListByGroup[_date] = [];
      postListByGroup[_date].push(rest);
    });

    setMarkedDates(formattedDates);
    setPostListByGroup(postListByGroup);

    sheetRef.current.present();
  }, [postList]);

  //load datas in current month
  useEffect(() => {
    const startOfMonth = moment(currentMonth)
      .startOf('month')
      .format(DATE_DB_FORMAT);
    const endOfMonth = moment(currentMonth)
      .endOf('month')
      .format(DATE_DB_FORMAT);
    getFilteredPostList(startOfMonth, endOfMonth);
  }, [currentMonth]);

  function handleDateClick(day) {
    const {dateString} = day; //yyyy-mm-dd
    setSelectedDate(dateString);
    sheetRef.current?.present();
  }

  //handles event when month changes
  function handleMonthChange(type, callback) {
    const newMonth =
      type === 'subtract'
        ? moment(currentMonth).subtract(1, 'month')
        : moment(currentMonth).add(1, 'month');

    setCurrentMonth(newMonth);
    setSelectedDate(moment(newMonth).startOf('month').format('YYYY-MM-DD')); //select first day of new month
    callback();
  }

  return (
    <CalendarWrapper>
      <LinearGradient colors={['#6a81ea', '#754ca3']} style={{height: '60%'}}>
        <Calendar
          onDayPress={handleDateClick}
          monthFormat={'yyyy MMMM'}
          onMonthChange={(month) => console.log('month changed', month)}
          onPressArrowLeft={(subtractMonth) =>
            handleMonthChange('subtract', subtractMonth)
          }
          onPressArrowRight={(addMonth) => handleMonthChange('add', addMonth)}
          enableSwipeMonths={true}
          renderArrow={(direction) => (
            <Icon name={`chevron-${direction}`} color="white" size={30} />
          )}
          markedDates={{...markedDates, [selectedDate]: {selected: true}}}
          theme={{
            backgroundColor: 'rgba(0,0,0,1)',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#ffffff',
            selectedDayTextColor: 'navy',
            todayTextColor: 'navy',
            dayTextColor: 'white',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'white',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'white',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16,
          }}
        />
      </LinearGradient>

      <BottomSheet
        ref={sheetRef}
        index={0}
        dismissOnPanDown={false}
        snapPoints={['40%', '80%']}>
        <PostList
          data={postListByGroup[selectedDate] || []}
          contentContainerStyle={{
            alignItems: 'center',
            flex: postListByGroup[selectedDate] ? 0 : 1,
          }}
          ListEmptyComponent={<Empty message={EMPTY_CONTENT} />}
          renderItem={({item}) => (
            <Post
              date={item.date}
              title={item.title}
              content={item.content}
              images={item.images}
              style={{
                width: Dimensions.get('window').width - 40,
                backgroundColor: Colors.backgroundColor,
                marginVertical: 8,
                marginHorizontal: 3,
              }}
              onPress={() =>
                navigation.navigate('PostDetail', {
                  groupId: item.group_id,
                  isEditMode: true,
                  post: item,
                })
              }
            />
          )}
        />
      </BottomSheet>
    </CalendarWrapper>
  );
}

export default CalendarScreen;
