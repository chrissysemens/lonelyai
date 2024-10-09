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
}: UseFirebaseProps): { data: Array<T>; add: (data: T) => void, loading: boolean } => {
  const [data, setData] = useState<Array<T>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const add = async (item: T) => {
    const ref = doc(collection(db, `${collectionName}`));
    await setDoc(ref, item as WithFieldValue<DocumentData>);
  };

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, `${collectionName}`));

    onSnapshot(q, (querySnapshot) => {
      let items = new Array<T>();
      querySnapshot.forEach((doc) => {
        const item = doc.data() as T;
        items.push(item);
      });
      setData(items);
      setLoading(false);
    });
  }, [collectionName]);
  return { data, loading, add };
};