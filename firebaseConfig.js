// import * as firebase from 'firebase';
// import { firebaseConfig } from './your-path-to-firebase-config';

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }


// Import the functions you need from the SDKs you need
import { initializeApp, getApp } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALMwrFDhViQomapIlRV4hbU-EqLuXZcmE",
  authDomain: "remember-my-dreams.firebaseapp.com",
  projectId: "remember-my-dreams",
  storageBucket: "remember-my-dreams.appspot.com",
  messagingSenderId: "319129091206",
  appId: "1:319129091206:web:aae7585ae48c5d5c14e507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

// export { app, auth };
export { app, getApp, getAuth };
