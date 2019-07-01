import React from 'react';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../components/utils/firebase';
import { KeyTable } from '../components/KeySheet/SheetData';

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

  const vsCodeDocument = firebase
    .firestore()
    .collection('KeyTables')
    .doc('VS_Code');

  const userKTColRef = user && userDocumentRef.collection('KeyTables');
  



  const [curKeyTable, setCurKeyTable] = React.useState(false);

  const [userKTC, loadingUKTC, errUKTC] = useCollection(userKTColRef);


  const [docIndex, setDocIndex] = React.useState(null);


  React.useEffect(()=>{
    console.log("⭐: KeyTableProvider -> userKTC", docIndex && userKTC.docs[docIndex].data())


    docIndex !== null && setCurKeyTable(userKTC.docs[docIndex])
    
    console.log("⌚⌚⌚: KeyTableProvider -> loadingUKTC", loadingUKTC)

  }, [userKTC, docIndex, loadingUKTC])


  const addNewKeyToFirebase = (curKeyTable, newKey) => {
    curKeyTable.ref.update({table: firebase.firestore.FieldValue.arrayUnion(newKey)})
  }

  const ctx = {
    // currentUser,
    userKTC,
    curKeyTable,
    loadingUKTC,
    errUKTC,
    setCurKeyTable,
    addNewKeyToFirebase,
    setDocIndex
  };

  return <KeyTableContext.Provider value={ctx}>{children}</KeyTableContext.Provider>;
}
