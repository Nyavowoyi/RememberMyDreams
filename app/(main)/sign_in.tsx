import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'

import { GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin";

import * as Google from 'expo-auth-session/providers/google';

// import * as WebBrowser from 'expo-web-browser';

import AsyncStorage from '@react-native-async-storage/async-storage';


// WebBrowser.maybeCompleteAuthSession({skipRedirectCheck : true});


const SignIn = () => {

  const [error, setError] = useState();
  const [userInfo, setUserInfo] = useState();

  return (
    <ScrollView>
      <ThemedView style={{ padding: 24, }}>
        <ThemedText>Welcome. Please Sign in</ThemedText>
        {error && <ThemedText style={{ borderWidth: 1, borderColor: 'red', }}>{JSON.stringify(error)}</ThemedText>}
        {userInfo && <ThemedText style={{ borderWidth: 1, borderColor: 'lightgreen', }}>{JSON.stringify(userInfo)}</ThemedText>}

        {
          userInfo ?
            (
              <TouchableOpacity onPress={()=> {}}>
                <ThemedText>Logout</ThemedText>
              </TouchableOpacity>
            ) :
            (
              <ThemedText style={{ padding: 20, }}>
                <GoogleSigninButton size={GoogleSigninButton.Size.Standard} onPress={() => {}} />
              </ThemedText>
            )
          }

          <ThemedText>This is fine!</ThemedText>
      </ThemedView>
    </ScrollView>
  )
}

export default SignIn