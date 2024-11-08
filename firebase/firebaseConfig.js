// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAiYKx5ruHz5d9FSJRUNSBhpu_Z12ZYmXQ",
    authDomain: "socialphotoapp-fb895.firebaseapp.com",
    projectId: "socialphotoapp-fb895",
    storageBucket: "socialphotoapp-fb895.firebasestorage.app",
    messagingSenderId: "878000632894",
    appId: "1:878000632894:web:b54bcc46199b18a1fa0d6f",
    measurementId: "G-LGZKHPVNCH"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
