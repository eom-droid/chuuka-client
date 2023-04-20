import { CrawlStoreModel, ICrawlStore } from "@/model/crawl_store_model";
import { firestore } from "@/plugins/firebase";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export class CrawlStoreService {
  static async fetchLimitedData(): Promise<Array<CrawlStoreModel>> {
    let result = [] as Array<CrawlStoreModel>;
    const docRef = collection(firestore, "/chuuka2/crawl/store");
    const q = query(
      docRef,
      where("isShown", "==", true),
      where("checked", "==", false),
      limit(10)
    );
    // const q = query(docRef);
    const docs = await getDocs(q);
    docs.docs.map((ele) => {
      const data = CrawlStoreModel.fromJson(ele.data() as ICrawlStore);
      let a = data.schedule.split("\n");
      //앞에 쓸데없는거 3개 자르고
      a = a.slice(3);
      //뒤에 접기 하나 짜르고
      a.pop();
      data.schedule = a.join("\n");
      result.push(data);
    });
    return result;
  }

  static async updateCrawlStore(sid: string, updateObj: any) {
    if (sid === undefined) return;
    const docRef = doc(firestore, "/chuuka2/crawl/store", sid);
    const result = await updateDoc(docRef, updateObj);
    return;
  }
}
