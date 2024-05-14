import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { Formik } from 'formik'
import * as Yup from 'yup';
import dayjs from 'dayjs'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TextInput } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import { Dream, IDream } from '@/models/dream'
import { useDreamsContext } from '@/store/dreams-context'

// The Form's validation schema
const validationSchema = Yup.object().shape({
    id: Yup.number().optional(),
    title: Yup.string().required('Dream title is required').max(50).min(2),
    description: Yup.string().required('Dream description is required').max(300).min(2),
    date: Yup.date().required('Provide the date of the dream').max(dayjs().add(1, 'day'), `Ooppss... Dreams are supposed to be had in the past. Your chosen date exceeds "${dayjs().add(1, 'day').format('ddd, MMM D YYYY h:mm a')}" as the date on which you dreamed!`).default(dayjs().toDate()),
});



export interface DreamPropsInterface {
    id: number | null | undefined,
    title: string | null | undefined,
    description: string | null | undefined,
    date: string | null | undefined,
}
const DreamForm = ({mode, dreamProps} : {mode: 'create' | 'update', dreamProps : DreamPropsInterface}) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [showUpdateScreen, toggleShowUpdateScreen] = useState(false);
    const dreamsCtx = useDreamsContext();

    let dreamObj : DreamPropsInterface = { id: null, title: `New dream on ${'ddd, MMM D YYYY h:mm a'}`, description: 'I had a dream which goes like ...',  date: dayjs(dreamProps?.date).subtract(5, 'hours').toDate().toString(),};

    if(mode === 'update') {
        dreamObj = {
            id: dreamProps?.id,
            title: dreamProps?.title,
            date: dayjs(dreamProps?.date).toDate()?.toString(),
            description: dreamProps?.description?.toString()
            }
    } 


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    return (
        <ThemedView>
            <ThemedText>DreamForm</ThemedText>
            {/* Form */}
            <Formik
                initialValues={{ id: dreamProps.id, title: 'New Dream Title', description: 'Dream Description', date: dayjs().toDate().toString(), }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    
                    if(values.id) {
                        // It means we are updating
                        console.log('Submitted values:', values);
                        console.info(dreamObj.id);
                        dreamsCtx.updateDream(dreamObj.id, values);
                    } else {
                        // It means we are creating a new dream
                        Alert.alert('New Dream', "You are creating a new dream!");
                        const newDream = new Dream({id: Math.floor(Math.random() * 200), date: values.date.toString(), description: values.description, title: values.title});
                        dreamsCtx.addDream(newDream);

                    }
                    // return;
                    // resetForm(); // Clear form after submission
                    // router.back();
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
                                {errors && errors?.date && <ThemedText style={{ color: 'red' }}>{errors.date.toString()}</ThemedText>}
                            </ThemedView>
                            <ThemedView>
                                <Pressable onPress={showDatePicker} style={{ width: 50, justifyContent: 'center', alignItems: 'center', }}>
                                    <ThemedText><Ionicons name={"pencil-outline"} size={28} /></ThemedText>
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
                            <Pressable onPress={() => {
                                handleSubmit();
                            }} style={styles.button}>
                                <ThemedText style={{ fontSize: 24, textAlign: 'center', color: 'white', }}>Submit</ThemedText>
                            </Pressable>
                        </ThemedView>
                    </ThemedView>

                )}
            </Formik>

        </ThemedView>
    )
}

export default DreamForm


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