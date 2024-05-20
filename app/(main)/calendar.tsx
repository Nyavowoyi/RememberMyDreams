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

const CalendarHome = () => {

  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());

  const dreamsCtx = useDreamsContext();

  const [markedDatesArray, setMarkedDatesArray] = useState([]);

  const filteredEvents = selectedDate ? markedDatesArray.filter((eventItem) => {
    const eventDate = dayjs(eventItem.dream.date).format('YYYY-MM-DD');
    return eventDate === dayjs(selectedDate).format('YYYY-MM-DD')
  }) : [];

  useEffect(() => {
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

  console.log(markedDatesArray);

  return (

    <ThemedView style={styles.container}>

      <CalendarStrip
        scrollable={true}
        minDate={dayjs().subtract(120, 'years').toDate()}
        showDate={true}
        daySelectionAnimation={{ type: 'border', duration: 0, borderWidth: 1, borderHighlightColor: 'white' }}
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
        onDateSelected={(date) => { console.log('THE SELECTED DATE:', date.format('YYYY-MM-DD')); setSelectedDate(date.toDate()); }}
      />

      {selectedDate && (
        <ThemedView>
          {filteredEvents.length > 0 ? (
            <ThemedView>
              <ThemedText style={{ fontSize: 18, marginVertical: 16, textAlign: 'center', }}>My Dreams:</ThemedText>
              <DreamsList dreamsList={filteredEvents} emptyDreamsText={"No dreams found!"} />
            </ThemedView>

          ) : (
            <ThemedView style={{ paddingHorizontal: 24, }}>
              <ThemedText style={{ fontSize: 18, marginVertical: 16, textAlign: 'center', borderWidth: 1, borderColor: '#ccddee', padding: 8, }}>No dreams on {dayjs(selectedDate).format('YYYY-MM-DD')}.</ThemedText>
            </ThemedView>
          )}
{/* 
          {filteredEvents.map((event, index) => (
            <ThemedView key={index}>
              <ThemedText key={event.date}>{event}</ThemedText>
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
  },
});


export default CalendarHome;