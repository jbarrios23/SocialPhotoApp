// firebaseConfig.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAiYKx5ruHz5d9FSJRUNSBhpu_Z12ZYmXQ",
    authDomain: "socialphotoapp-fb895.firebaseapp.com",
    projectId: "socialphotoapp-fb895",
    storageBucket: "socialphotoapp-fb895.appspot.com",
    messagingSenderId: "878000632894",
    appId: "1:878000632894:web:b54bcc46199b18a1fa0d6f",
    measurementId: "G-LGZKHPVNCH"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa la autenticación
//const auth = getAuth(app);

const auth=initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };
