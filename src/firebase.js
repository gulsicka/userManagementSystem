import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBPA_WMaWcEOr9zENYQzuI5TCyN8JjUKLQ",
    authDomain: "userms-22484.firebaseapp.com",
    projectId: "userms-22484",
    storageBucket: "userms-22484.appspot.com",
    messagingSenderId: "743726031555",
    appId: "1:743726031555:web:d61dc9fcc350849d97b876",
    measurementId: "G-ZPB46G5KCV"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

  // // Use these for db & auth
  // const db = firebaseApp.firestore();
  
export default firebaseApp;
