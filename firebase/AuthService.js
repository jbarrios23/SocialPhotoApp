// AuthService.js
import { firebase } from './firebaseConfig';

export const signInWithEmail = async (email, password) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    return false;
  }
};

export const signUpWithEmail = async (email, password) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.error("Error en registro:", error);
    return false;
  }
};

export const signOut = async () => {
  try {
    await firebase.auth().signOut();
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
