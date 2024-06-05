import { View, Text, Alert, useColorScheme } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Link, router } from 'expo-router';
import ListCardItem from '@/components/ui/DreamCardItem';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { DreamsContext, useDreamsContext } from '@/store/dreams-context';
import DreamsList from '@/components/ui/DreamsList';
import { LocalDb } from '@/database/database';

<<<<<<< HEAD

=======
>>>>>>> 265e61ebbd26c088f40b0a59bb6812604b1bdc97
const Home = () => {

  const theme = useColorScheme() ?? 'light';
  const iconColor = theme === 'light' ? Colors.light.icon : Colors.dark.icon

  const dreamsCtx = useDreamsContext();

<<<<<<< HEAD
  // useEffect(() => {
  //   (async () => {
      
  //       console.log('(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)HI THERE!');
  //       // let dreamsList = (await (new LocalDb()).fetchDreams());
  //       // dreamsCtx.setDreams(dreamsList);
  //   })();
  // }, []);
=======
  useEffect(() => {
    (async () => {
      
        console.log('(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)HI THERE!');
        let dreamsList = (await (new LocalDb()).fetchDreams());
        dreamsCtx.setDreams(dreamsList);
    })();
  }, []);
>>>>>>> 265e61ebbd26c088f40b0a59bb6812604b1bdc97

  return (

    <ThemedView style={{ flex: 1, paddingBottom: 20, }}>

      <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, }}>
<<<<<<< HEAD
        <ThemedText>Hi there! Welcome to the app!</ThemedText>
=======
        <ThemedView>
          <Link href={"calendar"} asChild>
            <Ionicons name='calendar' size={24} color={iconColor} />
          </Link>
        </ThemedView>

          <ThemedView>
          <Link href={"record_dream"} asChild>
            <Ionicons name='add-circle' size={48} color={iconColor} />
          </Link>
          </ThemedView>
        
        <ThemedView>
          <Link href={"search_dream"} asChild>
            <Ionicons name='search' size={24} color={iconColor} />
          </Link>
        </ThemedView>


        <ThemedView>
          <Link href={"authentication"} asChild>
            <Ionicons name='logo-google' size={24} color={iconColor} />
          </Link>
        </ThemedView>
        
>>>>>>> 265e61ebbd26c088f40b0a59bb6812604b1bdc97
      </ThemedView>

      <DreamsList dreamsList={dreamsCtx.dreams} />

    </ThemedView>
  )
}

export default Home;