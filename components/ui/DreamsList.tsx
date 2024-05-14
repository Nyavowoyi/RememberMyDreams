
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { router } from 'expo-router'
import { Dream, IDream } from '@/models/dream'
import DreamCardItem from './DreamCardItem'


function renderDreamItem({ item }: { item: Dream }) {

  let dream = JSON.stringify(item);
  return (
    <ThemedView style={style.cardItem}>
      <DreamCardItem key={item} dream={item.dream} 
      onPress={() => router.navigate({ pathname: 'dream_details', params: { id: item.dream.id, title: item.dream.title, dream: dream} })} />
    </ThemedView>
  )
}

const DreamsList = ({ dreamsList }: { dreamsList: Dream[] }) => {
  return (
    <ThemedView>
      <FlatList data={dreamsList} renderItem={renderDreamItem} keyExtractor={(item, index) => item.dream.id.toString()} />
    </ThemedView>
  )
}

export default DreamsList

const style = StyleSheet.create({
  cardItem: {
    marginVertical: 8,
  }
})