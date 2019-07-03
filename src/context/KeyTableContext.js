import React from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../components/utils/firebase';
import { KeyTable, TableTest } from '../components/KeySheet/SheetData';
import { useGlobalState, setGlobalState, selectNewSheet } from '../state'

export const KeyTableContext = React.createContext(null);

export const useKeyTable = () => React.useContext(KeyTableContext);

export default function KeyTableProvider({ children }) {
  const { firebase, userAuthState } = React.useContext(FirebaseContext);
  const [user, loading, error] = userAuthState;

  const userKTColRef =
    user &&
    firebase
      .firestore()
      .collection('Users')
      .doc(user.uid)
      .collection('KeyTables')






  




  const [curKeyTable, setCurKeyTable] = React.useState(false);
  const [userKTC, loadingUKTC, errUKTC] = useCollection(userKTColRef);
  const [docIndex, setDocIndex] = React.useState(null);
  const [sheetAdded, setSheetAdded] = React.useState(false)
  
  const [curShortcutObjectKey] = useGlobalState('curShortcutObjectKey')

  React.useEffect(()=>{
    // console.log("⭐: KeyTableProvider -> userKTC", docIndex && userKTC.docs[docIndex].data())
  
    // docIndex !== null && setCurKeyTable(userKTC.docs[docIndex])

    if (docIndex !== null  ) {
      
      const curDoc = userKTC.docs[docIndex]
      const docChanges = userKTC.docChanges()
      const len = docChanges.length;


      // const newDoc = (len && docChanges[len-1].type === 'added') ? docChanges[len-1].doc : null


      const newDoc = (() => {
        if (sheetAdded && len && (docChanges[len - 1].type === 'added')) {
         selectNewSheet(docChanges[len-1].newIndex)
          setSheetAdded(false)
          return docChanges[len - 1].doc
          
          
        } else {
          setSheetAdded(false)
          return null;
        }
      })()
      // const newDoc = userKTC.docChanges()[0].type !== "removed" ? userKTC.docChanges()[0].doc : null
      
      console.log("⭐: KeyTableProvider -> userKTC.docChanges()", userKTC.docChanges())
      setCurKeyTable(newDoc ? newDoc : curDoc)
      console.log("🔥🔥: KeyTableProvider -> newDoc", newDoc && newDoc.data())
     
      console.log("⭐: KeyTableProvider -> curKeyTable.ref", docIndex && curKeyTable.ref)
      // newDoc &&  selectNewSheet(newDoc.newIndex)
    }
    
 

  }, [userKTC, docIndex, loadingUKTC])


  const addNewKeyToFirebase = (newKey, index) => {
    

    const keyNum = Object.keys(curKeyTable.data().table).length + 1
    const update = {};
    update[`table.shortcut_${keyNum}`] = newKey
    console.log("⭐: addNewKeyToFirebase -> update", update)
  

    curKeyTable.ref.update(update)
    
    console.log("⭐: addNewKeyToFirebase -> curKeyTable.ref", curKeyTable)
    
   
  }
  const updateKeyToFirebase = (newKey) => {
    console.log("⭐: updateKeyToFirebase -> newKey", newKey)
    // curKeyTable

    const update = {};

    update[`table.${curShortcutObjectKey}`] = newKey
    curKeyTable.ref.update(update)
    
   
  }
  const testcd = (newKey) => {
    
    // curKeyTable.ref.update({ "table[activeKeysIndex]":  firebase.firestore.FieldValue.arrayUnion(newKey) })
   
  }
  const addNewKeySheet = name => {
    const newDocRef = userKTColRef.doc(name);
   
    newDocRef.set({ categories: [], table: {} });
    setSheetAdded(true);
    
 // setCurKeyTable(userKTC.docs.docChanges()[0])
    console.log("⭐: addNewKeyToFirebase -> userKTC.docs.docChanges()[0]", userKTC.docChanges())
    // setCurKeyTable(newDocRef)
    
    // const newDocRef = userDocumentRef.collection('KeyTables').doc(name)
    //   newDocRef.set({ categories: [], table: [] }).then(() => {
    //   console.log('🔥🔥New Document', newDocRef );
    // });
    
   
    // console.log("⭐: KeyTableProvider -> userKTC", userKTC)
    
    // console.log("⭐: KeyTableProvider ->  userDocumentRef.collection('KeyTables').doc(name).set({ categories: [], table: [] })",  userDocumentRef.collection('KeyTables').doc(name).set({ categories: [], table: [] }))
    
  }

  const deleteKeySheet = (index) => {
    setGlobalState('sheetNames', {})
    userKTC.docs[index].ref.delete()

  }
  const deleteShortcut = (index) => {
    setGlobalState('sheetNames', {})
    const update = {};
    
    update[`table.${curShortcutObjectKey}`] = firebase.firestore.FieldValue.delete();
    // curKeyTable.ref

  }
  

  const ctx = {
    // currentUser,
    userKTC,
    curKeyTable,
    loadingUKTC,
    errUKTC,
    setCurKeyTable,
    addNewKeyToFirebase,
    updateKeyToFirebase,
    addNewKeySheet,
    deleteKeySheet,
    setDocIndex,
    docIndex
  };

  return <KeyTableContext.Provider value={ctx}>{children}</KeyTableContext.Provider>;
}
