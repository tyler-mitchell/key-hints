import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../components/utils/firebase';

const KeyTableContext = React.createContext(null);

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

  const userKeyTablesRef = user && userDocumentRef.collection('KeyTables');

  const [userKTC, loadingUKTC, errUKTC] = useCollection(userKeyTablesRef);

  

  const ctx = {
    // currentUser,
    userKTC,
    loadingUKTC,
    errUKTC
  };

  return <KeyTableContext.Provider value={ctx}>{children}</KeyTableContext.Provider>;
}
