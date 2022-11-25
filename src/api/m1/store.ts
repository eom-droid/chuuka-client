import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  startAt,
  orderBy,
  endAt,
  limit,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { firebaseApp, firestore } from "@/plugins/firebase.js";
import { firebaseDevPath } from "../tempdev";
import { IPhoto } from "./photo";

// export interface IOpenAndCloseHour {
//   open: string;
//   close: string;
//   selectedDay: string;
//   weekNumber: string;
// }
// export interface IStoreInfo {
//   id: string;
//   managersDocId: Array<string>;
//   openAndCloseHour: Array<IOpenAndCloseHour>;
//   profileImage: string;
//   scheduleNotice: string;
//   introduction: string;
//   location: string;
//   name: string;
//   notice: string;
//   sns: Map<string, string>;
//   accountNum: string;
//   bankAccount: string;
//   kakaoChatUrl: string;
// }

export interface IStore {
  id: string;
  depositor: string;
  phoneNum: string;
  profileImage: IPhoto;
  introduction: string;
  location: string;
  name: string;
  sns: ISns;
  hashTags: Array<string>;
  // goUrl: Array<IUrl>;
  storeButtons: Array<IStoreButton>;
  locationUrl: {
    kakao: string;
    naver: string;
  };
  mustRead: IMustRead;
}

export interface IMustRead {
  orderForm: string;
  orderMethod: string;
  sizeAndSheet: string;
  notice: string;
}

export interface IStoreButton {
  name: string;
  url: string;
}
// export interface IUrl {
//   name: string;
//   url: string;
// }
export interface ISns {
  instagram: string;
  kakaoTalk: string;
}

//Read
export async function getStoreInfoById(id: string): Promise<IStore | null> {
  const q = doc(firestore, firebaseDevPath + "store", id);
  const tempInfo = await getDoc(q);
  let resultStore = tempInfo.data() as IStore;
  if (resultStore === undefined) return null;
  resultStore.id = tempInfo.id;
  return resultStore;
}

export async function getAllStoreInfo(): Promise<Array<IStore>> {
  let result = [] as Array<IStore>;
  const q = collection(firestore, firebaseDevPath + "store");
  const tempInfos = await getDocs(q);
  tempInfos.docs.map((ele) => {
    let data = ele.data() as IStore;
    data.id = ele.id;
    result.push(data);
  });
  return result;
}

export async function getStoreInfoWithLimit(
  document: QueryDocumentSnapshot<DocumentData> | null
): Promise<QuerySnapshot<DocumentData>> {
  let q;

  if (document != null) {
    q = query(
      collection(firestore, firebaseDevPath + "store"),
      startAfter(document),
      limit(20)
    );
  } else {
    q = query(collection(firestore, firebaseDevPath + "store"), limit(20));
  }

  const tempInfos = await getDocs(q);

  return tempInfos;
}

export async function getStoreInfoByField(
  document: QueryDocumentSnapshot<DocumentData> | null,
  key: string,
  value: string
): Promise<QuerySnapshot<DocumentData>> {
  let q;

  if (document != null) {
    q = query(
      collection(firestore, firebaseDevPath + "store"),
      orderBy(key),
      startAfter(document),
      limit(20),
      endAt(value + "\uf8ff")
    );
  } else {
    q = query(
      collection(firestore, firebaseDevPath + "store"),
      orderBy(key),
      startAt(value),
      limit(20),
      endAt(value + "\uf8ff")
    );
  }

  const tempInfos = await getDocs(q);

  return tempInfos;
}

//UPDATE

export async function updateStoreInfo(storeId: string, updateObject: object) {
  await updateDoc(
    doc(
      //@ts-ignore
      firestore,
      firebaseDevPath + "store",
      storeId
    ),
    updateObject
  );
}

// export async function getStoreLandingInfoByLoc(
//   document: QueryDocumentSnapshot<DocumentData>,
//   location: string
// ): Promise<QuerySnapshot<DocumentData>> {
//   let result = [] as Array<IStoreLanding>;
//   const q = query(
//     collection(firestore, firebaseDevPath + "store-landing"),
//     orderBy("location"),
//     orderBy("name"),
//     startAt(location, document),
//     limit(20),
//     endAt(location + "\uf8ff")
//   );
//   const tempInfos = await getDocs(q);

//   return tempInfos;
// }

// export async function searchStoreLandingInfo(
//   key: string,
//   value: string
// ): Promise<IStoreLanding[]> {
//   let q;
//   let result = [] as IStoreLanding[];
//   q = query(
//     collection(firestore, firebaseDevPath + "store-landing"),
//     orderBy(key),
//     startAt(value),
//     endAt(value + "\uf8ff")
//   );

//   const tempInfos = await getDocs(q);
//   tempInfos.docs.map((ele) => {
//     let data = ele.data();
//     let temp = data as IStoreLanding;
//     temp.id = ele.id;
//     result.push(temp);
//   });

//   return result;
// }
