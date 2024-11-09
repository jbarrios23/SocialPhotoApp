// AuthService.js
import { firebase } from './firebaseConfig';
import { GoogleAuthProvider, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import * as Google from 'expo-auth-session/providers/google';
import { auth } from './firebaseConfig';

export const signInWithGoogle = async () => {
  try {
    const { idToken } = await Google.logInAsync(
      {
        androidClientId: '<YOUR_ANDROID_CLIENT_ID>',
        iosClientId: '<YOUR_IOS_CLIENT_ID>',
        scopes: ['profile', 'email']
      });
    if (idToken) {
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      return true;
    } return false;
  } catch (error) {
    console.error("Error in Google sign in:", error); return false;
  }
};


export const signInWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    return false;
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error en registro:", error);
    return false;
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
