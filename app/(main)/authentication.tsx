import { View, Text, TouchableOpacity, ScrollView, Alert, Pressable, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import '@/firebaseConfig';

import { ActivityIndicator, TextInput } from 'react-native-paper';


// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import { getAuth } from "firebase/auth";



// WebBrowser.maybeCompleteAuthSession({skipRedirectCheck : true});


const SignIn = () => {

  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authType, setAuthType] = useState('signin')


  const auth = getAuth();

  const createUser = () => {
    setIsAuthenticating(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // onChangeLoggedInUser(user.email);
      })
      .catch((error) => {
        console.log(error, error.code);
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (error.code) {
          case 'auth/email-already-in-use':
            setError('Sorry. This email is already in use. Did you want to login instead?')
            break;
          default:
            setError(error.message);
        }
      }).finally(() => {
        setIsAuthenticating(false);
      })
  };

  const signInUser = () => {
    setIsAuthenticating(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUserInfo(user);
      }).catch((error) => {
        console.log('THERE WAS AN ERROR');
        console.log(error.code);
        let errorMsg = '';
        switch(error.code) {
          case 'auth/invalid-credential': 
            errorMsg = 'Invalid username and password combination.';
            break;
          default:
            errorMsg = 'There was an error signin you in. Kindly try again.';
            break;
        }
        setError(errorMsg);
      }).finally(() => {
        setIsAuthenticating(false);
      })
  };


  const handleAuthentication = () => {
    if (authType === 'signin') {
      signInUser();
    } else {
      createUser();
    }
  }


  return (
    <ScrollView>
      <ThemedView style={{ padding: 24, }}>

        <ThemedText style={{ padding: 10, fontSize: 30, lineHeight: 40, textAlign: 'center', }}>Welcome. {authType === 'signin' ? 'Sign In' : 'Sign Up!'}</ThemedText>

        <ThemedView style={{ paddingVertical: 15, }}>
          <TextInput
            value={email}
            placeholder='myaddress@somewhere.com'
            onChangeText={setEmail}
          />
        </ThemedView>

        <ThemedView style={{ paddingBottom: 15, }}>
          <TextInput value={password} placeholder='password' onChangeText={setPassword} />
        </ThemedView>

        {error && <ThemedText style={{ borderWidth: 1, borderColor: 'red', }}>{JSON.stringify(error)}</ThemedText>}
        {userInfo && <ThemedText style={{ borderWidth: 1, borderColor: 'lightgreen', }}>{JSON.stringify(userInfo)}</ThemedText>}

        {
          isAuthenticating ?
            <ActivityIndicator size={38} /> :
            (
              <>
                <TouchableOpacity onPress={handleAuthentication} style={[styles.p20, { paddingBottom: 20, }]}>
                  <ThemedText>{authType === 'signin' ? 'Sign In' : 'Sign Up!'}</ThemedText>
                </TouchableOpacity>

                {error && (<ThemedText>{error}</ThemedText>)}

                <ThemedView style={{ paddingTop: 50, }}><ThemedText>Already having an account?</ThemedText></ThemedView>
                {
                  authType === 'signin' ?
                    (
                      <TouchableOpacity style={[styles.p20]} onPress={() => { setAuthType('signup') }}><ThemedText>Sign Up!</ThemedText></TouchableOpacity>
                    ) :
                    (
                      <TouchableOpacity style={[styles.p20]} onPress={() => { setAuthType('signin') }}><ThemedText>Sign In!</ThemedText></TouchableOpacity>
                    )
                }

              </>
            )
        }

      </ThemedView>
    </ScrollView >
  )
}

export default SignIn

const styles = StyleSheet.create({
  p20: {
    padding: 20,
    backgroundColor: '#cc9d00',
    // width: 100,
    flexGrow: 0,
  },
})