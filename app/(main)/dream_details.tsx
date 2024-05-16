import { Alert, StyleSheet, Pressable, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useDreamsContext } from '@/store/dreams-context';
import { Dream } from '@/models/dream';
import { Formik } from 'formik';
import * as Yup from 'yup';
import dayjs from 'dayjs';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import DreamForm from '@/components/ui/DreamForm';


// The Form's validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Dream title is required').max(50).min(2),
  description: Yup.string().required('Dream description is required').max(300).min(2),
  date: Yup.date().required('Provide the date of the dream').max(dayjs().add(1, 'day'), `Your selected ${dayjs().add(1, 'day').format('ddd, MMM D YYYY h:mm a')} is considered a future!`).default(dayjs().toDate()),
});


const DreamDetails = () => {

  const { id, dream } = useLocalSearchParams();
  console.log('RECEIVED IN DREAM DETAILS..., dream => and below ', dream);
  console.debug(dream);
  const dreamObj = JSON.parse(dream?.toString())?.dream;
  console.debug(dreamObj)

  const dreamsCtx = useDreamsContext();

  const navigation = useNavigation();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [showUpdateScreen, toggleShowUpdateScreen] = useState(false);
  const [stateDreamId] = useState(id);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // The updating functionality
  function updateDream() {
    toggleShowUpdateScreen((curr) => {
      console.debug(curr);
      return !curr;
    });
    // updateTitle("New dream addedTitle!");
    // dreamsCtx.addDream(new Dream({ date: '2024-05-12', description: 'New Dream', id: (Math.floor(Math.random() * 100)), title: 'New Dream Title' }))
    // Alert.alert('Done', 'Dream was added...');
    // router.back();
  }


  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={updateDream} style={styles.icon}>
          <ThemedView><ThemedText><Ionicons name='pencil' size={22} /></ThemedText></ThemedView>
        </Pressable>
      ),
    })
  }, [navigation])





  return (
    <ThemedView style={{ flex: 1, padding: 16, borderRadius: 16, borderWidth: 2, }}>
      <KeyboardAvoidingView behavior='position'>
        <ScrollView keyboardDismissMode='interactive'>
          <ThemedText>Dream ID: {id}</ThemedText>


          <ThemedView style={[]}>
            <ThemedText>Title:</ThemedText>
            <ThemedText>{dreamObj.title}</ThemedText>

          </ThemedView>

          <ThemedView style={{ display: `${showUpdateScreen ? 'flex' : 'none'}`, }}>
            <DreamForm mode='update' dreamProps={{ id: dreamObj.id, title: dreamObj.title, description: dreamObj.description, date: dreamObj.date, }} />
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
  }
})