import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Calendar} from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import {BottomSheet} from 'components/common';

import {usePosts} from 'hooks';
import {DATE_DB_FORMAT} from 'constants/App';

import styled from 'styled-components';

const CalendarWrapper = styled.View`
  height: 100%;
  background-color: white;
`;

const startDay = moment().startOf('day').format(DATE_DB_FORMAT);
const endDay = moment().endOf('day').format(DATE_DB_FORMAT);

function CustomArrow({ref, direction}) {
  return <Icon name={`chevron-${direction}`} size={30} />;
}

function CalendarScreen({navigation}) {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState();
  const [currentMonth, setCurrentMonth] = useState(Date());

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
    postList.forEach(({date, ...rest}) => {
      const _date = date.split(' ')[0]; //YYYY-MM-DD
      formattedDates[_date] = {...rest, marked: true, dotColor: 'white'};
    });

    setMarkedDates(formattedDates);
    sheetRef.current.present();
  }, [postList]);

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
  }

  function handleMonthChange(type, callback) {
    const newMonth =
      type === 'subtract'
        ? moment(currentMonth).subtract(1, 'month')
        : moment(currentMonth).add(1, 'month');

    setCurrentMonth(newMonth);
    callback();
  }

  return (
    <CalendarWrapper>
      <LinearGradient colors={['#6a81ea', '#754ca3']} style={{height: '55%'}}>
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
    </CalendarWrapper>
  );
}

export default CalendarScreen;
