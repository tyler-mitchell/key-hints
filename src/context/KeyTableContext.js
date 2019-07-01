import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
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

  // const [curKeyTableRef, setcurKeyTableRef] = 

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
    addNewKeyToFirebase
  };

  return <KeyTableContext.Provider value={ctx}>{children}</KeyTableContext.Provider>;
}
