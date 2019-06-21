import app from 'firebase/app'
import { KeyTable } from '../components/KeySheet/SheetData';

const firebaseConfig = {
  apiKey: "AIzaSyCcVhJ72zFfHBG9dIUeo4O_RYg8wH7zHwI",
  authDomain: "key-hints.firebaseapp.com",
  databaseURL: "https://key-hints.firebaseio.com",
  projectId: "key-hints",
  storageBucket: "key-hints.appspot.com",
  messagingSenderId: "879535977309",
  appId: "1:879535977309:web:5e5035b25f4ca605"
};

app.initializeApp(firebaseConfig);


let db = app.firestore();


let docRef = db.collection('KeyTables').doc('VS_Code');

let setTables = docRef.set({...KeyTable});