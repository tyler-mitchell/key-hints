import React from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../components/utils/firebase';
import { KeyTable } from '../components/KeySheet/SheetData';
import { useGlobalState, setGlobalState, selectNewSheet } from '../state'

export const KeyTableContext = React.createContext(null);

export const useKeyTable = () => React.useContext(KeyTableContext);

export default function KeyTableProvider({ children }) {
  const { firebase, userAuthState } = React.useContext(FirebaseContext);
  const [user, loading, error] = userAuthState;

  const userDocumentRef =
    user &&
    firebase
      .firestore()
      .collection('Users')
      .doc(user.uid);



  const userKTColRef = user && userDocumentRef.collection('KeyTables');




  const [curKeyTable, setCurKeyTable] = React.useState(false);
  const [userKTC, loadingUKTC, errUKTC] = useCollection(userKTColRef);
  const [docIndex, setDocIndex] = React.useState(null);
  const [sheetAdded, setSheetAdded] = React.useState(false)
  const [activeKeysIndex] = useGlobalState('activeKeysIndex')

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


  const addNewKeyToFirebase = (newKey) => {
    curKeyTable.ref.update({ table: firebase.firestore.FieldValue.arrayUnion(newKey) })
   
  }
  const updateKeyToFirebase = ( newKey) => {
    // curKeyTable.ref.update( table.activeKeys )
    
   
  }
  const testcd = (newKey) => {
    
    // curKeyTable.ref.update({ "table[activeKeysIndex]":  firebase.firestore.FieldValue.arrayUnion(newKey) })
   
  }
  const addNewKeySheet = name => {
    const newDocRef = userKTColRef.doc(name);
   
    newDocRef.set(KeyTable);
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
