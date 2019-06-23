import React, { useContext } from 'react';
import app from 'firebase/app';
import { KeyTable } from '../KeySheet/SheetData';
import firebase from 'firebase';
import 'firebase/auth';

export const FirebaseContext = React.createContext(null);

export const FirebaseProvider = ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: 'AIzaSyCcVhJ72zFfHBG9dIUeo4O_RYg8wH7zHwI',
      authDomain: 'key-hints.firebaseapp.com',
      databaseURL: 'https://key-hints.firebaseio.com',
      projectId: 'key-hints',
      storageBucket: 'key-hints.appspot.com',
      messagingSenderId: '879535977309',
      appId: '1:879535977309:web:5e5035b25f4ca605'
    });

    
  }
  return <FirebaseContext.Provider value={app}>{children}</FirebaseContext.Provider>;
};

export class FirebaseLogin {
  constructor() {
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  addQuote(quote) {
    if (!this.auth.currentUser) {
      return alert('Not authorized');
    }

    return this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).set({
      quote
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }

  async getCurrentUserQuote() {
    const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get();
    return quote.get('quote');
  }
}
//   apiKey: "AIzaSyCcVhJ72zFfHBG9dIUeo4O_RYg8wH7zHwI",
//   authDomain: "key-hints.firebaseapp.com",
//   databaseURL: "https://key-hints.firebaseio.com",
//   projectId: "key-hints",
//   storageBucket: "key-hints.appspot.com",
//   messagingSenderId: "879535977309",
//   appId: "1:879535977309:web:5e5035b25f4ca605"
// };

// app.initializeApp(firebaseConfig);

// let db = app.firestore();

// let docRef = db.collection('KeyTables').doc('VS_Code');

// let setTables = docRef.set({...KeyTable});
