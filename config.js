
// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
apiKey: "AIzaSyCxn9WbEA5aFMlo-F_xaXuRTi6d1Z08qow",
  authDomain: "gasremote-c7973.firebaseapp.com",
  databaseURL: "https://gasremote-c7973-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "gasremote-c7973",
  storageBucket: "gasremote-c7973.appspot.com",
  messagingSenderId: "135323873680",
  appId: "1:135323873680:web:2af6c66c97e20e191e4315"
};

if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const db = getDatabase()

export { db }


// const app = initializeApp(firebaseConfig);
