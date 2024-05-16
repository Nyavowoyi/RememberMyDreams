import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import DreamForm from '@/components/ui/DreamForm'
import dayjs from 'dayjs'



const RecordDream = () => {

  const now = dayjs().subtract(8, 'hours').format('ddd, D MMM YYYY @ h:mm a');
  return (
    <ThemedView style={{ flex: 1,  }}>
      <DreamForm mode='create' dreamProps={{ id: null, title: `New dream on ${now}`, description: 'I had a dream which goes like ...',  date: dayjs().subtract(5, 'hours').toDate().toString(),}} />
    </ThemedView>
  )
}

export default RecordDream


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