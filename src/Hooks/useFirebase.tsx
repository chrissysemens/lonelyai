import {
  collection,
  onSnapshot,
  query,
  doc,
  setDoc,
  WithFieldValue,
  DocumentData,
} from "@firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../firebase/config";


type UseFirebaseProps = {
  collectionName: string;
};

export const useFirebase = <T, >({
  collectionName,
}: UseFirebaseProps): { data: Array<T>; add: (data: T) => void } => {
  const [data, setData] = useState<Array<T>>([]);

  const add = async (item: T) => {
    const ref = doc(collection(db, `${collectionName}`));
    await setDoc(ref, item as WithFieldValue<DocumentData>);
  };

  useEffect(() => {
    const q = query(collection(db, `${collectionName}`));

    onSnapshot(q, (querySnapshot) => {
      let items = new Array<T>();
      querySnapshot.forEach((doc) => {
        const item = doc.data() as T;
        items.push(item);
      });
      setData(items);
    });
  }, [collectionName]);
  return { data, add };
};