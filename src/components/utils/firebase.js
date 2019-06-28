import React, { useContext } from 'react';
import app from 'firebase/app';
import { KeyTable } from '../KeySheet/SheetData';
import firebase from 'firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import {useGlobalState, setGlobalState} from '../../state'
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
  const db = app.firestore();
  const userAuthState = useAuthState(firebase.auth());


  const vsCodeDocument = firebase
  .firestore()
  .collection('KeyTables')
  .doc('VS_Code');

  // const addSheet = (userId, sheetName) =>
  //   db.collection('KeyTables').add({
  //     keyDoc: sheetName,
  //     user: userId
  //   });

  const mySheet = async (userId) =>
    db.collection('favs')
      .where('user', '==', userId)
      .get();

  const logout = () => {
    firebase.auth().signOut();
  };
  
 

  function CurrentCollection() {
    
    React.useEffect(() => {
      
    }, [])
  }
  
  const [a, b] = useCollection(vsCodeDocument)
  
  function GetCollections(uid) {
    

    const collectionRef =
    firebase
    .firestore()
    .collection('UserKeyTables')
    // .doc(uid)
    // .collection("A New Key Table")
    
    
    
    return a
     
      
   
  
    // const userKeyTableCollection = useCollection(collectionRef)
     
      

    
    
  }

 

  // const [globalKeyTable] = useGlobalState('keyTable')
  
  // const [fbKeyTable, loading, error] = useDocument(vsCodeDocument);
  
 
  
  
  // // console.log("⭐: FirebaseProvider -> fbKeyTable", fb)


  // React.useEffect(() => {
  //   vsCodeDocument
  //     .get()
  //     .then(snapshot => {
  //       console.log("⭐: FirebaseProvider -> data", snapshot.data())
  //       setGlobalState('keyTable', snapshot.data())
  //       // console.log("⭐: FirebaseProvider -> globalKeyTable", globalKeyTable)
        
        

        
  //     })

  //   console.log("❗ TEST");
  // }, [])
  const fbContext = {
    firebase,
    db,
    userAuthState,
    logout,
    GetCollections



  }

  return <FirebaseContext.Provider value={fbContext}>{children}</FirebaseContext.Provider>;
};

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
