import { View, Text, Pressable, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { router, useNavigation } from 'expo-router';
import { TextInput } from 'react-native-paper';
import DreamsList from '@/components/ui/DreamsList';
import { DreamsContext, useDreamsContext } from '@/store/dreams-context';
import { Ionicons } from '@expo/vector-icons';
import { Dream } from '@/models/dream';

const SearchDream = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDreams, setFilteredDreams] = useState(Array<Dream>);

  const navigation = useNavigation();

  const dreamsCtx = useDreamsContext();

  // console.log('THESE ARE YOUR DREAMS:', dreamsCtx.dreams);
  // console.log('AND NOW, you are searching for', searchTerm);

  const filterDream = (query: string) => {
    let foundDreams = dreamsCtx.dreams.filter((dreamObj: Dream, index: number) => {
      let { date, description, title } = dreamObj.dream;
      let combined = `${date} ${title} ${description}`.toLowerCase();
      console.log('APPLYING FILTER TO', combined);
      return combined.includes(query);
    });
    setFilteredDreams(foundDreams);
  }

  const handleSearchQueryChange = (query: string) => {
    setSearchTerm(query);
    filterDream(query);
  }


  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ThemedView>

          {/* <TextInput placeholder="Find your dream..." autoFocus={true} value={searchTerm} onChangeText={handleSearchQueryChange} /> */}
        </ThemedView>
      ),
      headerRight: () => (
        <ThemedView>
          <ScrollView horizontal={true}>
            <ThemedView >
              <TextInput autoFocus={true} style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', paddingHorizontal: 8, paddingVertical: 0, width: 250 }} onChangeText={(val) => handleSearchQueryChange(val)}/>
            </ThemedView>
          </ScrollView>
        </ThemedView>
      ),
    })
  })

  return (
    <ThemedView style={{ flex: 1, }}>
      <DreamsList dreamsList={filteredDreams} />
    </ThemedView>
  )
}

export default SearchDream;