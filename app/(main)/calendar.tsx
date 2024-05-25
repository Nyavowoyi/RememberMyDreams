import { View, Text, Alert, FlatList, Pressable, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import * as Calendar from 'expo-calendar';
import DropdownComponent from '@/components/ui/DropdownComponent';
import dayjs from 'dayjs';

import { Calendar as RNCalendar } from 'react-native-calendars';
import { Markings } from 'react-native-calendars/src/calendar/day/marking';

import CalendarStrip from 'react-native-calendar-strip';
import { useDreamsContext } from '@/store/dreams-context';
import { Dream, IDream } from '@/models/dream';
import DreamsList from '@/components/ui/DreamsList';
import { Ionicons } from '@expo/vector-icons';

const CalendarHome = () => {

  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());

  const dreamsCtx = useDreamsContext();

  const [markedDatesArray, setMarkedDatesArray] = useState([]);

  const filteredDreams = selectedDate ? dreamsCtx.dreams.filter((dreamItem) => {
    console.info('😤😤😤😤', dreamItem, selectedDate);
    const chosenDate = dayjs(selectedDate).format('YYYY-MM-DD');
    const dreamItemDate = dayjs(dreamItem.dream.date).format('YYYY-MM-DD');
    return chosenDate === dreamItemDate;
  }) : [];



  useEffect(() => {

    // Add a dot to every date on the calendar on which we had a dream
    const markedDreams = dreamsCtx.dreams.map((dreamObj: Dream) => {
      const dream = dreamObj.dream;
      return ({
        dream: {
          ...dream,
        },
        // 'id': dream.id,
        // 'date': dayjs(dream.date).format('YYYY-MM-DD'),
        // 'title': `${dream.title}\n${dream.description}`,
        'dots': [
          {
            color: 'white',
            selectedColor: 'yellow',
          },
        ]
      });

    });

    // console.log('MARKED DREAMS', [...new Set(markedDreams)]);
    // setMarkedDatesArray([...new Set(markedDreams)]);

    setMarkedDatesArray(markedDreams);

  }, [])

  // console.log(markedDatesArray);

  return (

    <ThemedView style={[styles.container]}>

      <CalendarStrip
        scrollable={true}
        minDate={dayjs().subtract(120, 'years').toDate()}
        showDate={true}
        // daySelectionAnimation={{ type: 'border', duration: 0, borderWidth: 1, borderHighlightColor: 'white' }}
        selectedDate={dayjs(selectedDate).toDate()}
        highlightDateNumberStyle={{ color: 'yellow' }}
        highlightDateNameStyle={{ color: 'yellow' }}
        markedDates={markedDatesArray}
        markedDatesStyle={{ borderWidth: 1, borderColor: 'white', color: 'white' }}
        showMonth={true}
        style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
        calendarColor={'#3343CE'}
        calendarHeaderStyle={{ color: 'white' }}
        dateNumberStyle={{ color: 'white' }}
        dateNameStyle={{ color: 'white' }}
        iconContainer={{ flex: 0.1 }}
        iconLeft={require('@/assets/images/back-arrow.png')}
        iconLeftStyle={[styles.calendarIconStyle, { marginLeft: 10 }]}
        iconRight={require('@/assets/images/right-arrow.png')}
        iconRightStyle={[styles.calendarIconStyle, { marginRight: 10 }]}
        onDateSelected={(date) => { console.log('THE SELECTED DATE:', date.format('YYYY-MM-DD')); setSelectedDate(date.toDate()); }}
      />

      {selectedDate && (

        <ThemedView style={{ flex: 1, }}>
          {filteredDreams.length > 0 ? (
            <ThemedView style={{ flex: 1, paddingBottom: 20, marginTop: 30, }}>
              <ThemedText style={{ fontSize: 18, marginVertical: 16, textAlign: 'center', }}>{dayjs(selectedDate).format('dddd, MMMM D, YYYY')}</ThemedText>
              <DreamsList dreamsList={filteredDreams} />
            </ThemedView>

          ) : (
            <ThemedView style={{ paddingHorizontal: 24, }}>
              <ThemedText style={{ fontSize: 18, marginVertical: 16, textAlign: 'center', borderWidth: 1, borderColor: '#ccddee', padding: 8, }}>No dreams on {dayjs(selectedDate).format('YYYY-MM-DD')}.</ThemedText>
            </ThemedView>
          )}

          {/* {filteredDreams.map((event, index) => (
            <ThemedView key={index}>
              <ThemedText key={event.date}>{event.dream.title}</ThemedText>
            </ThemedView>
          ))} */}

        </ThemedView>
      )}

    </ThemedView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // alignItems: 'center',
    padding: 10,
  },
  calendarIconStyle: {
    borderColor: 'white',
    padding: 15,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
  },

});

export default CalendarHome;