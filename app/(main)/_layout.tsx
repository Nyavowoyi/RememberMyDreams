import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { ThemedView } from '@/components/ThemedView'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useColorScheme } from '@/hooks/useColorScheme.web'
import { Colors } from '@/constants/Colors'
import { TextInput } from 'react-native-paper'


const MainLayout = () => {

  const colorScheme = useColorScheme();

  return (
    <Stack initialRouteName='index' screenOptions={{
      headerBackground: () => (<ThemedView style={{ flex: 1, }}></ThemedView>),
      headerTintColor: (colorScheme === 'dark' ? Colors.dark.tint : Colors.light.tint),
    }}>
      <Stack.Screen name="index" options={{ headerShown: true, headerTitle: 'Dreams' }} />
      <Stack.Screen name="record_dream" options={{ headerShown: true, headerTitle: 'Record Your Dream' }} />
      <Stack.Screen name="calendar" options={{ headerShown: true, headerTitle: 'Calendar' }} />
      <Stack.Screen name="search_dream" options={{ headerShown: true, headerTitle: 'Search' }} />
      <Stack.Screen name="dream_details" options={{ headerShown: true, headerTitle: 'Dream Details' }} />
      <Stack.Screen name="authentication" options={{ headerTitle: 'Welcome', headerShown: false, }} />
    </Stack>
  )
}

export default MainLayout