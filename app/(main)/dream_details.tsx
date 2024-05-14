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


// The Form's validation schema
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Dream title is required').max(50).min(2),
  description: Yup.string().required('Dream description is required').max(300).min(2),
  date: Yup.date().required('Provide the date of the dream').max(dayjs().add(1, 'day'), `Your selected ${dayjs().add(1, 'day').format('ddd, MMM D YYYY h:mm a')} is considered a future!`).default(dayjs().toDate()),
});


const DreamDetails = () => {

  const { id, title, dream } = useLocalSearchParams();
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
          <ThemedView><Ionicons name='pencil' size={22} /></ThemedView>
        </Pressable>
      ),
    })
  }, [navigation])





  return (
    <ThemedView style={{ flex: 1, padding: 16, borderRadius: 16, borderWidth: 2, }}>
      <KeyboardAvoidingView behavior='position'>
        <ScrollView keyboardDismissMode='interactive'>
          <ThemedText>Dream ID: {id}</ThemedText>


          <ThemedView style={[styles.container,]}>
            <ThemedText>Title:</ThemedText>
            <ThemedText>{dreamObj.title}</ThemedText>

          </ThemedView>

          <ThemedView style={{ display: `${showUpdateScreen ? 'flex' : 'none'}`, }}>

                {/* Form */}
                <Formik
                  initialValues={{ id: dreamObj.id, title: title?.toString(), description: dreamObj.description?.toString(), date: dayjs(dreamObj.date || new Date()).toDate() }}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) => {
                    console.log('Submitted values:', values);
                    console.info(dreamObj.id);
                    dreamsCtx.updateDream(dreamObj.id, values);
                    // resetForm(); // Clear form after submission
                    router.back();
                    // Alert.alert('Submitting')
                  }}
                >
                  {({ setFieldValue, handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <ThemedView>

                      {/* Dream Title */}

                      <ThemedText>Dream Title:</ThemedText>
                      <TextInput
                        accessibilityLabel='Dream Title'
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                        style={{ padding: 8, marginBottom: 10 }}
                      />
                      {errors.title && <ThemedText style={{ color: 'red' }}>{errors.title}</ThemedText>}

                      {/* Dream Description */}
                      <ThemedText>My Dream's full description:</ThemedText>
                      <TextInput
                        accessibilityLabel='Dream Description'
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        style={{ padding: 8, marginBottom: 10 }}
                        multiline={true}
                        numberOfLines={3}
                      />
                      {errors.description && <ThemedText style={{ color: 'red' }}>{errors.description}</ThemedText>}


                      {/* Date of dream */}
                      <ThemedText>Date:</ThemedText>

                      <ThemedView style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', }}>
                        <ThemedView style={{ alignItems: 'flex-start', width: '75%', }}>
                          <ThemedText>{dayjs(values.date.toString()).format('ddd, MMM D YYYY h:mm a')}</ThemedText>
                          {errors && errors?.date && <ThemedText style={{ color: 'red' }}>{errors.date?.toString()}</ThemedText>}
                        </ThemedView>
                        <ThemedView>
                          <Pressable onPress={showDatePicker} style={{ width: 50, justifyContent: 'center', alignItems: 'center', }}>
                            <Ionicons name={"pencil-outline"} size={28} />
                          </Pressable>
                        </ThemedView>
                      </ThemedView>


                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode={"datetime"}
                        onConfirm={(date: Date) => {
                          console.info("A date has been picked: ", date);
                          setFieldValue('date', date);
                          hideDatePicker();
                        }}
                        onCancel={hideDatePicker}
                      />



                      {/* Submit button */}
                      <ThemedView style={{ marginVertical: 80, minHeight: 50, alignItems: 'center', }}>
                        <Pressable onPress={handleSubmit} style={styles.button}>
                          <ThemedText style={{ fontSize: 24, textAlign: 'center', color: 'white', }}>Submit</ThemedText>
                        </Pressable>
                      </ThemedView>
                    </ThemedView>

                  )}
                </Formik>

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