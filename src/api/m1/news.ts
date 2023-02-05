import { firebaseApp, firestore } from "@/plugins/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firebaseDevPath } from "../tempdev";
import { IOpenGraph } from "./openGraph";
import { IPhoto } from "./photo";

// export interface INews {
//   id: string;
//   title: string;
//   content: string;
//   photos: Array<IPhoto>;
//   regWriter: string;
//   modWriter: string;
//   isHidden: boolean;
//   regDtime: Timestamp;
//   modDtime: Timestamp;
// }

export interface INews {
  id: string;
  title: string;
  content: string;
  regWriter: string;
  modWriter: string;
  regDtime: Timestamp;
  modDtime: Timestamp;
  openGraph: IOpenGraph;
}

export async function getAllNews(storeId: string): Promise<INews[]> {
  let result = [] as INews[];
  const q = query(
    collection(firestore, firebaseDevPath + "store/" + storeId + "/news"),
    orderBy("modDtime", "desc")
  );

  const snapShots = await getDocs(q);
  snapShots.docs.map((ele) => {
    const data = ele.data() as INews;
    data.id = ele.id;
    result.push(data);
  });

  return result;
}
