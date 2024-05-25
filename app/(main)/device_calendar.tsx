import { View, Text, Alert, FlatList, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import * as Calendar from 'expo-calendar';
import DropdownComponent from '@/components/ui/DropdownComponent';
import dayjs from 'dayjs';


const AddToCalendar = ({ title, details }: { title: string }) => {

  const [deviceCalendars, setDeviceCalendars] = useState(Array<{ id: string; value: number | string | null | undefined; }>);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);

  useEffect(() => {
    (async () => {
      if(Calendar.PermissionStatus.DENIED || Calendar.PermissionStatus.UNDETERMINED) {
        requestCalendarPermission();
      }
    })();
  }, []);


  async function requestCalendarPermission () {
    // Request for Calendar Permission
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status === 'granted') {
      
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

      const deviceCals = calendars.map((calendar) => {
        let val = '';
        if (!calendar.name) {
          val = calendar.title.trim();
        } else {
          val = calendar.title.trim();
        }
        return { value: calendar.id, label: val };

      })
      setDeviceCalendars(deviceCals);

      console.log('Here are all your calendars:');
      // console.log(calendars[5].title);

      // Search through the calendars and see if there is any calendar with the title for this app
      // const foundRMDCalendarId = calendars.filter((calendar) => {
      //   console.log('WORKING WITH Cal ID => ', calendar.id, 'Name =>', calendar.name, 'TITLED => ', calendar.title);
      //   return calendar.name == 'Remember My Dreams App' && calendar.title === 'Remember My Dreams App';
      // });

      // console.log('FOUND CALENDAR', foundRMDCalendarId);

      // if (foundRMDCalendarId && foundRMDCalendarId?.id) {
      //   console.log('THE REMEMBER MY DREAMS APP WAS FOUND!');
      //   console.info(foundRMDCalendarId);
      // } else {
      //   // Then, we create the calendar :)
      //   console.log('WE DID NOT FIND THE CALENDAR FOR THE APP SO WE WILL CREATE IT!');
      // }

    } else {
      Alert.alert('No Calendar Access', 'Oooh... Oh! You need this feature to really add dreams to your device\'s calendar.');
    }
  }

  const handleCalendarSelection = (itemId: number) => {
    setSelectedCalendarId(itemId);
  };

  // Handles creating an event on the selected calendar.
  const handleCreateEvent = async () => {
    if (!selectedCalendarId) {
      alert('Please select a calendar for the event.');
      return;
    } else {
      try {
        const newEventId = await Calendar.createEventAsync(selectedCalendarId, {
          title: 'My Dream Event', // Set your event title
          startDate: dayjs().subtract(3, 'days').toDate(), // Adjust date and time
          endDate: dayjs().subtract(3, 'days').toDate(),
          notes: 'The calendar note goes here. I think I will put the dream\'s full info here. But the user can feel free to also modify it!'
        });
        console.log('Event created successfully:', newEventId);
      } catch (error) {
        alert('There was an error adding to the calendar.');
        console.log('THERE WAS AN ERROR CREATING THE CALENDAR EVENT!');
        console.warn(error);

      }
    }
    // Use selectedCalendarId with Calendar.createEventAsync(...)
  };


  return (
    <View>

      <ThemedView>
        <ThemedText>Add event to this calendar: </ThemedText>
        <DropdownComponent
          data={deviceCalendars}
          dropdownLabel='Calendar'
          onChangeHandler={(val) => {
            console.info('SELECTED =>', val.value);
            setSelectedCalendarId(val.value);
          }}
          // onChangeHandler={handleCalendarSelection}
          value={selectedCalendarId}
        />

        <Pressable onPress={() => handleCreateEvent()} style={{ padding: 16, borderRadius: 8, borderWidth: 1, borderColor: 'grey', backgroundColor: 'blue', width: '50%', marginRight: 'auto', marginLeft: 'auto', display: 'flex', marginVertical: 20, }}>
          <Text style={{ color: 'white' }}>Create Event</Text>
        </Pressable>

        {/* <FlatList data={deviceCalendars} renderItem={({ item }) => {
        return (
          <ThemedView>
            <ThemedText style={{ fontSize: 18, padding: 8, }}>{item.value} | {item.label}</ThemedText>
          </ThemedView>
        )
      }} keyExtractor={(item, index) => item?.value.toString()} /> */}

      </ThemedView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default AddToCalendar;