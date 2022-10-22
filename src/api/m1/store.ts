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

export interface IOpenAndCloseHour {
  open: string;
  close: string;
  selectedDay: string;
  weekNumber: string;
}
export interface IStoreInfo {
  id: string;
  managersDocId: Array<string>;
  openAndCloseHour: Array<IOpenAndCloseHour>;
  profileImage: string;
  scheduleNotice: string;
  introduction: string;
  location: string;
  name: string;
  notice: string;
  sns: Map<string, string>;
  accountNum: string;
  bankAccount: string;
  kakaoChatUrl: string;
}

export interface IStoreLanding {
  id: string;
  depositor: string;
  phoneNum: string;
  profileImage: IPhoto;
  introduction: string;
  location: string;
  name: string;
  sns: ISns;
  hashTags: Array<string>;
  goUrl: Array<IUrl>;
  locationUrl: {
    kakao: string;
    naver: string;
  };
}
export interface IUrl {
  name: string;
  url: string;
}
export interface ISns {
  instagram: string;
  kakaoTalk: string;
}

export interface IPhoto {
  link: string;
  gs: string;
}

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

export async function getStoreInfo(storeId: string): Promise<IStoreInfo> {
  const q = doc(firestore, firebaseDevPath + "store", storeId);
  const tempInfo = await getDoc(q);
  let resultString = tempInfo.data();
  return resultString as IStoreInfo;
}

export async function getAllStoreInfo(): Promise<Array<IStoreInfo>> {
  let result = [] as Array<IStoreInfo>;
  const q = collection(firestore, firebaseDevPath + "store");
  const tempInfos = await getDocs(q);
  tempInfos.docs.map((ele) => {
    let data = ele.data() as IStoreInfo;
    data.id = ele.id;
    result.push(data);
  });
  return result;
}

export async function getAllStoreLandingInfo(
  document: QueryDocumentSnapshot<DocumentData> | null,
  location: string
): Promise<QuerySnapshot<DocumentData>> {
  let q;

  if (document != null) {
    q = query(
      collection(firestore, firebaseDevPath + "store-landing"),
      startAfter(document),
      limit(30)
    );
  } else {
    q = query(
      collection(firestore, firebaseDevPath + "store-landing"),
      limit(30)
    );
  }

  const tempInfos = await getDocs(q);

  return tempInfos;
}

export async function getStoreLandingInfoByField(
  document: QueryDocumentSnapshot<DocumentData> | null,
  key: string,
  value: string
): Promise<QuerySnapshot<DocumentData>> {
  let q;

  if (document != null) {
    q = query(
      collection(firestore, firebaseDevPath + "store-landing"),
      orderBy(key),
      startAfter(document),
      limit(30),
      endAt(value + "\uf8ff")
    );
  } else {
    q = query(
      collection(firestore, firebaseDevPath + "store-landing"),
      orderBy(key),
      startAt(value),
      limit(30),
      endAt(value + "\uf8ff")
    );
  }

  const tempInfos = await getDocs(q);

  return tempInfos;
}
export async function searchStoreLandingInfo(
  key: string,
  value: string
): Promise<IStoreLanding[]> {
  let q;
  let result = [] as IStoreLanding[];
  q = query(
    collection(firestore, firebaseDevPath + "store-landing"),
    orderBy(key),
    startAt(value),
    endAt(value + "\uf8ff")
  );

  const tempInfos = await getDocs(q);
  tempInfos.docs.map((ele) => {
    let data = ele.data();
    let temp = data as IStoreLanding;
    temp.id = ele.id;
    result.push(temp);
  });

  return result;
}

export async function getStoreLandingInfo(
  storeId: string
): Promise<IStoreLanding | null> {
  const q = doc(firestore, firebaseDevPath + "store-landing", storeId);
  const tempInfo = await getDoc(q);
  let resultString = tempInfo.data() as IStoreLanding;
  if (resultString === undefined) return null;
  resultString.id = tempInfo.id;
  return resultString;
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
//     limit(30),
//     endAt(location + "\uf8ff")
//   );
//   const tempInfos = await getDocs(q);

//   return tempInfos;
// }
