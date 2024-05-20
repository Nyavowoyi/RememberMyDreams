
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { router } from 'expo-router'
import { Dream, IDream } from '@/models/dream'
import DreamCardItem from './DreamCardItem'


function renderDreamItem({ item }: { item: Dream }) {

  let dream = JSON.stringify(item);
  console.debug(dream);
  return (
    <ThemedView style={style.cardItem}>
      <DreamCardItem key={item} dream={item.dream}
        onPress={() => router.navigate({ pathname: 'dream_details', params: { id: item.dream.id, title: item.dream.title, dream: dream } })}
        />
    </ThemedView>
  )
}

function renderEmptyDreams(emptyListHint : string) {
  return (
    <ThemedView style={{ flex: 1, padding: 24,  }}>
      <ThemedText style={{ fontSize: 16 }}>{emptyListHint || "Add those dreams you had in the past for your own good."}</ThemedText>
    </ThemedView>
  )
}

const DreamsList = ({ dreamsList, emptyDreamsText = "" }: { dreamsList: Dream[], emptyDreamsText?: string | null }) => {
  return (
    <ThemedView>
      <FlatList
        data={dreamsList}
        renderItem={renderDreamItem}
        keyExtractor={(item, index) => item.dream.id.toString()}
        ListEmptyComponent={renderEmptyDreams(emptyDreamsText)}
        />
    </ThemedView>
  )
}

export default DreamsList

const style = StyleSheet.create({
  cardItem: {
    marginVertical: 8,
  }
})