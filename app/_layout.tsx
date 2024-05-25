import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import DreamsContextProvider from '@/store/dreams-context';
import { LocalDb } from '@/database/database';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    try {
      const db = new LocalDb();
      db.initDb();
      console.info('😁😁😘DATABASE HAS BEEN INITIALIZED 🥰');
    } catch(e) {
      console.info('🥹😤😤 There was an error initializing the local database.');
      console.debug(e);
    }

  }, [loaded]);

  if (!loaded) {
    return null;
  }


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <DreamsContextProvider>
        <Stack>
          <Stack.Screen name='(main)' options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </DreamsContextProvider>
    </ThemeProvider>
  );
}
