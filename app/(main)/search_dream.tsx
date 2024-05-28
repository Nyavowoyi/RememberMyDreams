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
import { TouchableOpacity } from 'react-native';

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
    filterDream(query.toLowerCase());
  }


  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <ThemedView>

          {/* <TextInput placeholder="Find your dream..." autoFocus={true} value={searchTerm} onChangeText={handleSearchQueryChange} /> */}
        </ThemedView>
      ),
      // headerRight: () => (
      //   <ThemedView style={{ flex: 0.85, borderColor: 'lightgreen', borderWidth: 2, width: 200, }}>

      //       </ThemedView>
      // ),
    })
  })

  return (
    <ThemedView style={{ flex: 1, backgroundColor: 'orange', justifyContent: 'flex-start' }}>
      <ThemedView style={{ flex: 0.15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 24, }}>
        <TextInput autoCorrect={false} autoCapitalize='none' autoFocus={true} placeholder='Search for ...' style={{ flex: 1, }} onChangeText={(val) => handleSearchQueryChange(val)} value={searchTerm} />
        <TouchableOpacity onPress={() => { setSearchTerm(''); }} style={{ paddingVertical: 10, }}>
          <ThemedText style={{ paddingHorizontal: 20, paddingVertical: 5, }}>
            <Ionicons name='close-circle' size={30} />
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
      <ThemedView style={{ flex: 0.85, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 4, paddingVertical: 8 }}>
        <DreamsList dreamsList={filteredDreams} />
      </ThemedView>
    </ThemedView>
  )
}

export default SearchDream;