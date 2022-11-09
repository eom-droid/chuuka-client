// 2022-11-09 chuuka-ceo 에서 복사
import { firestore } from "@/plugins/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { firebaseDevPath } from "../tempdev";
import { IPhoto } from "./photo";

export interface INews {
  id: string;
  title: string;
  content: string;
  photos: Array<IPhoto>;
  regWriter: string;
  modWriter: string;
  isHidden: boolean;
  regDtime: Timestamp;
  modDtime: Timestamp;
}

export async function getAllNewsWithnet(
  storeId: string,
  netDivision: string
): Promise<INews[]> {
  let result = [] as INews[];
  const q = collection(
    firestore,
    "chuuka/" + netDivision + "/store/" + storeId + "/news"
  );

  const snapShots = await getDocs(q);
  snapShots.docs.map((ele) => {
    const data = ele.data() as INews;
    data.id = ele.id;
    result.push(data);
  });

  return result;
}

export async function getAllNews(storeId: string): Promise<INews[]> {
  let result = [] as INews[];
  const q = collection(
    firestore,
    firebaseDevPath + "store/" + storeId + "/news"
  );

  const snapShots = await getDocs(q);
  snapShots.docs.map((ele) => {
    const data = ele.data() as INews;
    data.id = ele.id;
    result.push(data);
  });

  return result;
}

export async function addProductWithNet(
  storeId: string,
  news: INews,
  netDivision: string,
  writer: string
) {
  const nowDTime = Timestamp.fromDate(new Date());
  news.modDtime = nowDTime;
  news.regDtime = nowDTime;
  news.modWriter = writer;
  news.regWriter = writer;
  news = removeId(news);
  let id = "";
  await addDoc(
    collection(
      firestore,
      "chuuka/" + netDivision + "/store/" + storeId + "/news"
    ),
    news
  ).then(function (docRef) {
    id = docRef.id;
  });
  return id;
}

function removeId(news: INews): any {
  let { id, ...newsRmId } = news;
  return newsRmId;
}

export async function deleteNewsWithNet(
  storeId: string,
  newsId: string,
  netDivision: string
): Promise<boolean> {
  await deleteDoc(
    doc(
      firestore,
      "chuuka/" + netDivision + "/store/" + storeId + "/news",
      newsId
    )
  );
  return true;
}

export async function updateNewsWithNet(
  storeId: string,
  news: INews,
  netDivision: string,
  writer: string
) {
  const nowDTime = Timestamp.fromDate(new Date());
  const id = news.id;
  news.modDtime = nowDTime;
  news = removeId(news);
  console.log(news);
  await updateDoc(
    doc(firestore, "chuuka/" + netDivision + "/store/" + storeId + "/news", id),
    {
      title: news.title,
      content: news.content,
      isHidden: news.isHidden,
      modDtime: news.modDtime,
      modWriter: writer,
      photos: news.photos,
    }
  );
}

export async function addNewsWithNet(
  storeId: string,
  news: INews,
  netDivision: string,
  writer: string
) {
  const nowDTime = Timestamp.fromDate(new Date());
  news.modDtime = nowDTime;
  news.regDtime = nowDTime;
  news.regWriter = writer;
  news.modWriter = writer;
  news = removeId(news);
  let id = "";
  await addDoc(
    collection(
      firestore,
      "chuuka/" + netDivision + "/store/" + storeId + "/news"
    ),
    news
  ).then(function (docRef) {
    id = docRef.id;
  });
  return id;
}
