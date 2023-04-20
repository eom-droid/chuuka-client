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
  QueryConstraint,
  endBefore,
  GeoPoint,
  Timestamp,
} from "firebase/firestore";
import { firebaseApp, firestore } from "@/plugins/firebase.js";
import { firebaseDevPath, firebaseDevPath2 } from "../tempdev";
import { IPhoto } from "./photo";
import { cloneDeep, random } from "lodash";

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
  // joinLevel: number;
  isJoined: boolean;
  isManaged: boolean;
  locationUrl: {
    kakao: string;
    naver: string;
  };
  geoLocation: GeoPoint;
  mustRead: IMustRead;
}

export interface IStore2 {
  id: string; // id : 가게 유일 id => docId

  name: string; // name : 각 업체의 이름
  sns: ISns; // sns : kakaoChanel & instagram
  telephone: string; // storeTel : 가게 전화번호

  address: string; // address : 주소
  locationUrl: ILocationUrl; // locationUrl : kakao map & naver map locationUrl
  geoCoord: GeoPoint; // geoCoord : 가게 latitude longitude

  openCloseHour: IOpenCloseHours; // openCloseHour : 운영시간

  theDayOrderAble: number; // theDayOrderAble : 당일 케이크 가능 여부

  modUser: string; // modWirter : 변경 인원
  regDTime: Timestamp; // regDTime : 최초 입력날짜
  modDTime: Timestamp; // modDTime :  변경 날짜
}

export interface IOpenCloseHours {
  sun: IOpenCloseHour;
  mon: IOpenCloseHour;
  tue: IOpenCloseHour;
  wed: IOpenCloseHour;
  thu: IOpenCloseHour;
  fri: IOpenCloseHour;
  sat: IOpenCloseHour;
  description: string;
}

export interface IOpenCloseHour {
  isClosed: boolean;
  detail: {
    openHour: string;
    closeHour: string;
    startBreakTime: string;
    endBreakTime: string;
    lastOrder: string;
  };
}

export interface ILocationUrl {
  kakao: string;
  naver: string;
}

export interface IMustRead {
  orderForm: string;
  orderMethod: string;
  size: string;
  taste: string;
  notice: string;
  exchangeRefund: string;
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

export async function getAllStore2(): Promise<Array<IStore2>> {
  const q = collection(firestore, firebaseDevPath2 + "store");
  const tempInfo = await getDocs(q);
  let result = [] as IStore2[];
  tempInfo.docs.map((ele) => {
    const data = ele.data() as IStore2;
    data.id = ele.id;
    result.push(data);
  });
  return result;
}

export async function getAllStore(): Promise<Array<IStore>> {
  const q = collection(firestore, firebaseDevPath + "store");
  const tempInfo = await getDocs(q);
  let result = [] as IStore[];
  tempInfo.docs.map((ele) => {
    const data = ele.data() as IStore;
    data.id = ele.id;
    result.push(data);
  });
  return result;
}

// export async function getAllStoreInfo(): Promise<Array<IStore>> {
//   let result = [] as Array<IStore>;
//   const q = collection(firestore, firebaseDevPath + "store");
//   const tempInfos = await getDocs(q);
//   tempInfos.docs.map((ele) => {
//     let data = ele.data() as IStore;
//     data.id = ele.id;
//     result.push(data);
//   });
//   return result;
// }

// 2022-12-15 이후 getStoreInfoWithRandomLimit() 함수로 대체됨
export async function getStoreInfoWithLimit(
  document: QueryDocumentSnapshot<DocumentData> | null,
  filterNotJoining: boolean
): Promise<QuerySnapshot<DocumentData>> {
  let q;
  let constraints = [] as QueryConstraint[];
  // 추카 가입 여부 체크에 따라
  if (!filterNotJoining) {
    constraints.push(where("isJoined", "==", true));
  }
  if (document != null) {
    constraints.push(startAfter(document));
  }

  constraints.push(limit(20));
  q = query(collection(firestore, firebaseDevPath + "store"), ...constraints);
  const tempInfos = await getDocs(q);
  return tempInfos;
}

interface IStoreInfoWithRandomLimit {
  result: QueryDocumentSnapshot<DocumentData>[];
  random: number;
  isReachedEnd: boolean;
  isEnd: boolean;
  isStartedZero: boolean;
}
export async function getStoreInfoWithRandomLimit(
  document: QueryDocumentSnapshot<DocumentData> | null,
  random: number,
  isReachedEnd: boolean,
  isStartedZero: boolean,
  isShownNotJoinedStore: boolean
): Promise<IStoreInfoWithRandomLimit> {
  let q;
  if (random === -1) random = Math.random();
  const NUMBER = 20;
  let isEnd = false;

  let constraints = [] as QueryConstraint[];
  // 추카 가입 여부 체크에 따라

  if (!isShownNotJoinedStore) {
    constraints.push(where("isJoined", "==", true));
  }

  constraints.push(orderBy("random"));

  if (!isReachedEnd) {
    if (document === null || document === undefined) {
      // 처음
      constraints.push(startAt(random));
    } else {
      // 이어서
      constraints.push(startAfter(document));
    }
  } else {
    if (!isStartedZero) {
      // 도달 후 처음
      isStartedZero = true;
      constraints.push(endBefore(random));
    } else {
      // 도달 후 이어서
      constraints.push(startAfter(document));
      constraints.push(endBefore(random));
    }
  }

  constraints.push(limit(NUMBER));
  q = query(collection(firestore, firebaseDevPath + "store"), ...constraints);

  let result = (await getDocs(q)).docs;
  const length = result.length;

  // 테스트
  // console.log(length);
  // await result.docs.map((item) => console.log(item.data().random));
  // console.log("random", random);

  if (length < NUMBER) {
    if (!isReachedEnd) {
      // 전체문서의 마지막 커서에 도달
      isReachedEnd = true;
      const tempResult = await getStoreInfoWithRandomLimit(
        result[result.length - 1],
        random,
        isReachedEnd,
        isStartedZero,
        isShownNotJoinedStore
      );
      result = result.concat(tempResult.result);
      random = tempResult.random;
      isReachedEnd = tempResult.isReachedEnd;
      isEnd = tempResult.isEnd;
      isStartedZero = tempResult.isStartedZero;
    } else isEnd = true;
  }

  return {
    result: result,
    random: random,
    isReachedEnd: isReachedEnd,
    isEnd: isEnd,
    isStartedZero: isStartedZero,
  };
}

export async function getStoreInfoByField(
  document: QueryDocumentSnapshot<DocumentData> | null,
  key: string,
  value: string,
  filterOnlyJoining: boolean
): Promise<QueryDocumentSnapshot<DocumentData>[]> {
  let q;
  let constraints = [] as QueryConstraint[];

  constraints.push(orderBy(key));
  // 이전 항목 존재 여부에 따라
  if (document != null) {
    constraints.push(startAfter(document));
  } else {
    constraints.push(where(key, ">=", value));
  }
  constraints.push(where(key, "<", value + "\uf88f"));
  // constraints.push(endAt(value + "\uf88f"));
  // 추카 가입 여부 체크에 따라
  if (!filterOnlyJoining) {
    constraints.push(where("isJoined", "==", true));
  }
  // constraints.push(limit(20));

  q = query(collection(firestore, firebaseDevPath + "store"), ...constraints);

  const tempInfos = (await getDocs(q)).docs;

  return tempInfos;
}

//UPDATE

// export async function updateStoreInfo(storeId: string, updateObject: object) {
//   await updateDoc(
//     doc(
//       //@ts-ignore
//       firestore,
//       firebaseDevPath + "store",
//       storeId
//     ),
//     updateObject
//   );
// }

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
