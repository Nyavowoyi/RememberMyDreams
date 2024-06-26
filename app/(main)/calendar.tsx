import {  StyleSheet,  } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import dayjs from 'dayjs';

import CalendarStrip from 'react-native-calendar-strip';
import { useDreamsContext } from '@/store/dreams-context';
import { Dream } from '@/models/dream';
import DreamsList from '@/components/ui/DreamsList';

import * as advancedFormat from 'dayjs/plugin/advancedFormat'
import { useColorScheme } from '@/hooks/useColorScheme.web';
dayjs.extend(advancedFormat.default)

// == OR
// See 👉 https://day.js.org/docs/en/plugin/advanced-format
// var advancedFormat = require('dayjs/plugin/advancedFormat')
// dayjs.extend(advancedFormat)

const CalendarHome = () => {

  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());

  const dreamsCtx = useDreamsContext();

  const [markedDatesArray, setMarkedDatesArray] = useState([]);

  const [whiteListedDates, setWhiteListedDates] = useState([]);

  const colorScheme = useColorScheme();

  const filteredDreams = selectedDate ? dreamsCtx.dreams.filter((dreamItem) => {
    console.info('😤😤😤😤', dreamItem, selectedDate);
    const chosenDate = dayjs(selectedDate).format('YYYY-MM-DD');
    const dreamItemDate = dayjs(dreamItem.dream.date).format('YYYY-MM-DD');
    return chosenDate === dreamItemDate;
  }) : [];



  useEffect(() => {

    // Add a dot to every date on the calendar on which we had a dream

    let availableDates: any = []; // Simply store the list of dates that are unique
    let markedDates: any = []; // Stores the marked dates and their formatting

    dreamsCtx.dreams.forEach((dreamObj: Dream) => {

      const dream = dreamObj.dream;
      console.log('|||||||||||||THE DREAM||||||||||||');
      console.log(dream);
      const dt = dayjs(dream.date).format('YYYY-MM-DD');
      if (!availableDates.includes(dt)) {
        availableDates.push(dt);
        markedDates.push({
          date: `${dt}`,
          dots: [
            {
              color: '#dc073c',
              selectedColor: '#3c07cd',
            },
          ],
        })
      }
    });

    setWhiteListedDates(availableDates);

    // console.log('MARKED DREAMS', [...new Set(markedDreams)]);
    // setMarkedDatesArray([...new Set(markedDreams)]);

    setMarkedDatesArray(markedDates);

  }, [dreamsCtx.dreams])

  // console.log(markedDatesArray);

  return (

    <ThemedView style={[styles.container]}>

      <CalendarStrip
        scrollable={true}
        minDate={dayjs().subtract(120, 'years').toDate()}
        showDate={true}
        daySelectionAnimation={{ type: 'border', duration: 0, borderWidth: 1, borderHighlightColor: `${colorScheme === 'light' ? 'black' : 'gold'}` }}
        selectedDate={dayjs(selectedDate).toDate()}
        highlightDateNumberStyle={{ color: `${colorScheme === 'light' ? 'black' : 'white'}` }}
        highlightDateNameStyle={{ color: `${colorScheme === 'light' ? 'black' : 'white'}`, fontWeight: '900', }}
        datesWhitelist={whiteListedDates}
        markedDates={markedDatesArray}
        markedDatesStyle={{ borderWidth: 1, borderColor: 'white', color: 'white' }}
        showMonth={true}
        style={{ height: 120, paddingTop: 20, paddingBottom: 10 }}
        // calendarColor={`${colorScheme === 'light' ? '#8CACEF' : '#0C0F2B'}`}
        calendarHeaderStyle={{ color: `${colorScheme === 'light' ? 'black' : 'white'}`, fontSize: 18 }}
        dateNumberStyle={{ color: `${colorScheme === 'light' ? 'black' : 'white'}`, fontSize: 18, }}
        dateNameStyle={{ color: `${colorScheme === 'light' ? 'black' : 'white'}` }}
        iconContainer={{ flex: 0.1 }}
        iconLeft={require('@/assets/images/back-arrow.png')}
        iconLeftStyle={[styles.calendarIconStyle, { marginLeft: 5 }]}
        iconRight={require('@/assets/images/right-arrow.png')}
        iconRightStyle={[styles.calendarIconStyle, { marginRight: 10 }]}
        disabledDateOpacity={0.9}
        disabledDateNumberStyle={{ color: 'grey', }}
        disabledDateNameStyle={{ color: '#678933' }}
        onDateSelected={(date) => { console.log('THE SELECTED DATE:', date.format('YYYY-MM-DD')); setSelectedDate(date.toDate()); }}
      />

      {selectedDate && (

        <ThemedView style={{ flex: 1, }}>
          {filteredDreams.length > 0 ? (
            <ThemedView style={{ flex: 1, paddingBottom: 20, marginTop: 30, }}>
              <ThemedText style={{ fontSize: 18, marginVertical: 16, textAlign: 'center', }}>{dayjs(selectedDate).format('dddd, Do MMMM, YYYY')}</ThemedText>
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
    padding: 10,
    borderRadius: 10,
    borderBlockColor: 'white',
    borderWidth: 1,
  },

});

export default CalendarHome;