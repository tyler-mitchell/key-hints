import React from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { FirebaseContext } from "../components/utils/firebase";
import { KeyTable, TableTest } from "../components/KeySheet/SheetData";
import {
  useGlobalState,
  setGlobalState,
  selectNewSheet,
  clearKeySelection
} from "../state";
import {
  initializeKeyMap,
  keyMapColors
} from "../components/Keyboard/KeyMapData";
import _ from "lodash";
export const KeyTableContext = React.createContext(null);

export const useKeyTable = () => React.useContext(KeyTableContext);

export default function KeyTableProvider({ children }) {
  const { firebase, userAuthState, storage } = React.useContext(
    FirebaseContext
  );
  const [user, loading, error] = userAuthState;

  const userKTColRef =
    user &&
    firebase
      .firestore()
      .collection("Users")
      .doc(user.uid)
      .collection("KeyTables");

  const [curKeyTable, setCurKeyTable] = React.useState(false);
  const [userKTC, loadingUKTC, errUKTC] = useCollection(userKTColRef);
  const [docIndex, setDocIndex] = React.useState(null);
  const [sheetAdded, setSheetAdded] = React.useState(false);
  const [curShortcutObjectKey, setCurShortcutObjectKey] = useGlobalState(
    "curShortcutObjectKey"
  );

  React.useEffect(() => {
    if (docIndex !== null && user && userKTC) {
      const curDoc = userKTC.docs[docIndex];
      const docChanges = userKTC.docChanges();
      const len = docChanges.length;

      const newDoc = (() => {
        if (sheetAdded && len && docChanges[len - 1].type === "added") {
          selectNewSheet(docChanges[len - 1].newIndex);
          setSheetAdded(false);
          return docChanges[len - 1].doc;
        } else {
          setSheetAdded(false);
          return null;
        }
      })();

      setCurKeyTable(newDoc ? newDoc : curDoc);
    } else if (!user) {
      setCurKeyTable(null);
    }
  }, [userKTC, docIndex, loadingUKTC]);

  const [tableCategories, setTableCategories] = useGlobalState(
    "tableCategories"
  );

  function initializeTableCategories(table) {
    const categories = new Set([]);
    _.forEach(table, shortcut => {
      for (let category of shortcut.category) {
        categories.add(category);
      }
    });
    let tableCategories = [];
    let index = 0;
    for (let category of categories) {
      tableCategories.push({
        value: category,
        label: "#" + category,
        color: keyMapColors[index % keyMapColors.length]
      });
      index++;
    }

    setTableCategories(tableCategories);
  }
  React.useEffect(() => {
    if (curKeyTable) {
      const table = curKeyTable.data().table;
      initializeKeyMap(table);
      getAllKeys(table);
      initializeTableCategories(table);
      setGlobalState("selectedIndex", null);
    }
  }, [curKeyTable]);

  const getAllKeys = table => {
    const keys = _.keyBy(table, o => {
      return _.values(o.keys.key1);
    });
    setGlobalState("allKeys", keys);
  };

  const addNewKeyToFirebase = async (newKey, image) => {
    console.log("------------------ Adding New Key------------------------");
    console.log(`⭐: addNewKeyToFirebase -> image`, image);

    const keyID = firebase.firestore.Timestamp.now().toMillis();

    const url = image && (await handleUpload(image, keyID));
    if (url) {
    }
    const newShortcut = url ? { ...newKey, url } : newKey;
    console.log(`⭐: addNewKeyToFirebase -> newShortcut`, newShortcut);

    const update = {};
    update[`table.${keyID}`] = newShortcut;

    curKeyTable.ref.update(update);

    setGlobalState("activeKeys", newKey.keys.key1);
    setGlobalState("selectedItem", keyID);
    setGlobalState("newKeys", v => ({ ...v, keys: { key1: {} } }));
    setCurShortcutObjectKey(keyID);
    setGlobalState("addMode", false);
  };
  const updateKeyToFirebase = newKey => {
    const update = {};
    update[`table.${curShortcutObjectKey}`] = newKey;
    curKeyTable.ref.update(update);
    setGlobalState("activeKeys", newKey.keys.key1);
  };

  const addNewKeySheet = name => {
    const newDocRef = userKTColRef.doc(name);
    newDocRef.set({ categories: [], table: {} });
    setSheetAdded(true);
  };

  const handleUpload = (image, fileName) => {
    const uploadTask = storage.ref(`key-sheet-images/${fileName}`).put(image);
    // const downloadURL = await storage
    //   .ref("key-sheet-images")
    //   .child(fileName)
    //   .getDownloadURL();
    const downloadURL = uploadTask
      .then(snapshot => {
        return snapshot.ref.getDownloadURL(); // Will return a promise with the download link
      })
      .then(downloadURL => {
        console.log(
          `Successfully uploaded file and got download link - ${downloadURL}`
        );
        return downloadURL;
      })
      .catch(error => {
        console.log(`Failed to upload file and get link - ${error}`);
        return null;
      });

    return downloadURL;
    //   uploadTask.on(
    //     "state_changed",
    //     snapshot => {
    //       // progress function ...
    //       const uploadProgress = Math.round(
    //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //       );
    //       // this.setState({ uploadProgress });
    //     },
    //     error => {
    //       // Error function ...
    //       console.log(error);
    //     },
    //     async () => {
    //       // complete function ...
    //       url = await storage
    //         .ref("key-sheet-images")
    //         .child(fileName)
    //         .getDownloadURL();
    //       // .then(url => {
    //       //   this.setState({ url });
    //       // });
    //     }
    //   );
    //   return url;
  };
  const deleteKeySheet = index => {
    setGlobalState("sheetNames", {});
    userKTC.docs[index].ref.delete();
  };
  const deleteShortcut = () => {
    setGlobalState("sheetNames", {});
    const update = {};

    update[
      `table.${curShortcutObjectKey}`
    ] = firebase.firestore.FieldValue.delete();
    curKeyTable.ref.update(update);
    clearKeySelection();

    setGlobalState("selectedItem", null);
  };

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
    docIndex,
    deleteShortcut
  };

  return (
    <KeyTableContext.Provider value={ctx}>{children}</KeyTableContext.Provider>
  );
}
