import React, { useContext } from "react";
import app from "firebase/app";
import { KeyTable } from "../KeySheet/SheetData";
import firebase from "firebase";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { useGlobalState, setGlobalState } from "../../state";

export const FirebaseContext = React.createContext(null);

export const FirebaseProvider = ({ children }) => {
  if (!app.apps.length) {
    app.initializeApp({
      apiKey: "AIzaSyCcVhJ72zFfHBG9dIUeo4O_RYg8wH7zHwI",
      authDomain: "key-hints.firebaseapp.com",
      databaseURL: "https://key-hints.firebaseio.com",
      projectId: "key-hints",
      storageBucket: "key-hints.appspot.com",
      messagingSenderId: "879535977309",
      appId: "1:879535977309:web:5e5035b25f4ca605"
    });
  }
  const db = app.firestore();
  const userAuthState = useAuthState(firebase.auth());
  const storage = firebase.storage();

  const logout = () => {
    firebase.auth().signOut();
  };

  const fbContext = {
    firebase,
    storage,
    db,
    userAuthState,
    logout
  };

  return (
    <FirebaseContext.Provider value={fbContext}>
      {children}
    </FirebaseContext.Provider>
  );
};

// app.initializeApp(firebaseConfig);

// let db = app.firestore();

// let docRef = db.collection('KeyTables').doc('VS_Code');

// let setTables = docRef.set({...KeyTable});
