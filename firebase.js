// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyDpwBkY_bWiSa-FEoU_dma2112aWTUjZQ8",
    authDomain: "splitmo-master.firebaseapp.com",
    projectId: "splitmo-master",
    storageBucket: "splitmo-master.appspot.com",
    messagingSenderId: "693803101370",
    appId: "1:693803101370:web:6f94787776dc06521e6683",
    measurementId: "G-HBSTVWNBLL"
   };

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
 persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
