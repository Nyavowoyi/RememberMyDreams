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


const Home = () => {

  const theme = useColorScheme() ?? 'light';
  const iconColor = theme === 'light' ? Colors.light.icon : Colors.dark.icon

  const dreamsCtx = useDreamsContext();

  // useEffect(() => {
  //   (async () => {
      
  //       console.log('(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)HI THERE!');
  //       // let dreamsList = (await (new LocalDb()).fetchDreams());
  //       // dreamsCtx.setDreams(dreamsList);
  //   })();
  // }, []);

  return (

    <ThemedView style={{ flex: 1, paddingBottom: 20, }}>

      <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, }}>
        <ThemedText>Hi there! Welcome to the app!</ThemedText>
      </ThemedView>

      <DreamsList dreamsList={dreamsCtx.dreams} />

    </ThemedView>
  )
}

export default Home;