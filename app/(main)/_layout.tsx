import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'


const MainLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: true, headerTitle: 'Dreams' }} />
        <Stack.Screen name="record_dream" options={{ headerShown: true, headerTitle: 'Record Your Dream' }} />
        <Stack.Screen name="calendar" options={{ headerShown: true, headerTitle: 'Calendar' }} />
        <Stack.Screen name="search_dream" options={{ headerShown: true, headerTitle: 'Find your dream' }} />
        <Stack.Screen name="dream_details" options={{ headerShown: true, headerTitle: 'Dream Details' }} />
      </Stack>
  )
}

export default MainLayout