import { Alert, StyleSheet, Pressable, KeyboardAvoidingView, ScrollView, } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useDreamsContext } from '@/store/dreams-context';
import dayjs from 'dayjs';

import DreamForm from '@/components/ui/DreamForm';

import { Calendar } from 'react-native-calendars';
import { Markings } from 'react-native-calendars/src/calendar/day/marking';

const events = [
  { date: '2024-05-15', title: 'Meeting' },
  { date: '2024-05-20', title: 'Birthday' },
  { date: '2024-05-23', title: 'Concert' },
];

const DreamDetails = () => {

  const { id, dream } = useLocalSearchParams();

  const dreamObj = JSON.parse(dream?.toString())?.dream;

  const dreamsCtx = useDreamsContext();

  const navigation = useNavigation();

  const [showUpdateScreen, toggleShowUpdateScreen] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => toggleShowUpdateScreen(isVisible => !isVisible)} style={styles.icon}>
          <ThemedView><ThemedText><Ionicons name='pencil' size={22} /></ThemedText></ThemedView>
        </Pressable>
      ),
    })
  }, [navigation])


  const handleDreamDeletion = () => {
    Alert.alert('Delete', 'This will permanently delete this dream. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel', isPreferred: true, onPress: () => { } },
        {
          text: 'Yes', style: 'destructive', isPreferred: true,
          onPress: () => {
            try {
              dreamsCtx.removeDream(dreamObj.id);
              router.dismissAll();
              router.replace('/');
            } catch (error) {
              // router.dismissAll();
              // router.replace('/');
              Alert.alert('Error', 'An error occured while deleting the dream. Kindly try again.')
            }
          }
        },
      ]
    )
  }


  return (
    <ThemedView style={{ flex: 1, padding: 16, borderRadius: 16, borderWidth: 2, }}>
      <KeyboardAvoidingView behavior='position'>
        <ScrollView keyboardDismissMode='interactive'>
          <ThemedText>Dream ID: {id}</ThemedText>

          <ThemedView style={[]}>
            <ThemedText>Title: {dreamObj.title}</ThemedText>
          </ThemedView>

          <ThemedView style={{ display: `${showUpdateScreen ? 'flex' : 'none'}`, paddingHorizontal: 8, }}>

            <DreamForm mode='update' dreamProps={{ id: dreamObj.id, title: dreamObj.title, description: dreamObj.description, date: dreamObj.date, }} />
          </ThemedView>

          <ThemedView style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'center', paddingVertical: 10, }}>
            <Pressable
              onPress={handleDreamDeletion}
              style={styles.deleteBtn}
            >
              <ThemedText style={{ fontSize: 24, textAlign: 'center', fontWeight: '600', }}>Delete</ThemedText>
            </Pressable>

          </ThemedView>

        </ScrollView>
      </KeyboardAvoidingView>

    </ThemedView>

  )
}

export default DreamDetails

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 16,
    backgroundColor: 'lightblue',
  },
  icon: {
    borderColor: 'black',
    borderBottomWidth: 2,
    width: 35,
  },
  button: {
    borderColor: 'purple',
    borderWidth: 2,
    backgroundColor: 'purple',
    width: '50%',
    padding: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { height: 12, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  deleteBtn: {
    borderColor: 'orangered',
    borderWidth: 2,
    backgroundColor: 'red',
    width: '50%',
    padding: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: { height: 12, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  }
})