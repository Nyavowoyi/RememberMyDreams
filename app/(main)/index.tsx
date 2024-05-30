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

  useEffect(() => {
    (async () => {
      
        console.log('(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)HI THERE!');
        let dreamsList = (await (new LocalDb()).fetchDreams());
        dreamsCtx.setDreams(dreamsList);
    })();
  }, []);

  return (

    <ThemedView style={{ flex: 1, paddingBottom: 20, }}>

      <ThemedView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 24, }}>
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
          <Link href={"sign_in"} asChild>
            <Ionicons name='logo-google' size={24} color={iconColor} />
          </Link>
        </ThemedView>
        
      </ThemedView>

      <DreamsList dreamsList={dreamsCtx.dreams} />

    </ThemedView>
  )
}

export default Home;