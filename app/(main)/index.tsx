import { View, Text, Alert, useColorScheme } from 'react-native'
import React, { useContext } from 'react'
import { Link, router } from 'expo-router';
import ListCardItem from '@/components/ui/DreamCardItem';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { DreamsContext } from '@/store/dreams-context';
import DreamsList from '@/components/ui/DreamsList';

const Home = () => {

  const theme = useColorScheme() ?? 'light';
  const iconColor = theme === 'light' ? Colors.light.icon : Colors.dark.icon

  const dreamsCtx = useContext(DreamsContext);
  console.log('THE DREAMS CONTEXT', dreamsCtx.dreams[0]);

  return (

    <ThemedView style={{ flex: 1, }}>

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

      </ThemedView>

      <DreamsList dreamsList={dreamsCtx.dreams} />

    </ThemedView>
  )
}

export default Home;