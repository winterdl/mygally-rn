import React, {useState, useEffect} from 'react';
import {View, Text, Pressable} from 'react-native';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CalendarWrapper = styled.View`
  height: 100%;
  background-color: white;
`;

function CustomArrow({direction}) {
  function handleClick() {
    console.log(direction);
  }
  return (
    <Pressable
      onPress={handleClick}
      style={{marginRight: 5, padding: 5}}
      android_ripple={{color: 'lightgray'}}>
      <Icon name={`chevron-${direction}`} size={30} />
    </Pressable>
  );
}

function CalendarScreen({navigation}) {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDate, setSelectedDate] = useState();
  const [currentMonth, setCurrentMonth] = useState(Date());

  useEffect(() => {
    //TODO: mock db call
    const dates = [
      {
        date: '2021-07-04',
        title: 'hello1',
        content: 'hello2',
      },
      {
        date: '2021-07-05',
        title: 'title',
        content: 'this is content',
      },
    ];

    let formattedDates = {};
    dates.forEach(({date, ...rest}) => {
      formattedDates[date] = {...rest, marked: true, dotColor: 'white'};
    });

    setMarkedDates(formattedDates);
  }, []);

  function handleDateClick(day) {
    const {dateString} = day; //yyyy-mm-dd
    setSelectedDate(dateString);
  }

    callback();
  }

  return (
    <CalendarWrapper>
      <LinearGradient colors={['#6a81ea', '#754ca3']} style={{height: '55%'}}>
        <Calendar
          onDayPress={handleDateClick}
          monthFormat={'yyyy MMMM'}
          onMonthChange={(month) => console.log('month changed', month)}
          enableSwipeMonths={true}
          // renderArrow={(direction) => <CustomArrow direction={direction} />}
          // renderHeader={test}
          markedDates={{...markedDates, [selectedDate]: {selected: true}}}
          theme={{
            backgroundColor: 'rgba(0,0,0,1)',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: 'white',
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
