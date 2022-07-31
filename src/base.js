import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

export const app= firebase.initializeApp({
    "projectId": "roommatch-17440",
    "appId": "1:1029573441392:web:9dc36d61ad0258a60081b5",
    "databaseURL": "https://roommatch-17440-default-rtdb.firebaseio.com",
    "storageBucket": "roommatch-17440.appspot.com",
    "locationId": "us-central",
    "apiKey": "AIzaSyC4yw-xLMHUgonbV2537z17Ee48LXyQcY8",
    "authDomain": "roommatch-17440.firebaseapp.com",
    "messagingSenderId": "1029573441392",
    "measurementId": "G-3YHWHMGDTN"
});
