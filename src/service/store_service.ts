import {
  CAKE_STORE_LS_KEY_PREFIX,
  CAKE_STORE_FETCH_DATE_LS_KEY,
} from "@/constant/localstorage_constant";
import { IStoreWithFetchDate } from "@/model/store_local_storage_model";
import { StoreModel, IStore } from "@/model/store_model";
import { firestore } from "@/plugins/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDateTimeByDate } from "@/utils/moment";

export class StoreService {
  private static PATH = "/chuuka2/production/store";

  //한번에 불러오는 경우는 없어서 주석처리
  // static async fetchData(): Promise<Array<StoreModel>> {
  //   let result = [] as Array<StoreModel>;
  //   const docRef = collection(firestore, this.PATH);

  //   const docs = await getDocs(docRef);
  //   docs.docs.map((ele) => {
  //     const data = StoreModel.fromJson(ele.data() as IStore);
  //     data.id = ele.id;
  //     result.push(data);
  //   });
  //   return result;
  // }

  static async checkIdExist(docId: string): Promise<boolean> {
    const query = doc(firestore, this.PATH, docId);
    const snapShot = await getDoc(query);
    if (snapShot.exists()) {
      return true;
    }
    return false;
  }

  static async fetchSingleStoreFromDB(
    docId: string
  ): Promise<StoreModel | null> {
    const query = doc(firestore, this.PATH, docId);
    const snapShot = await getDoc(query);
    if (snapShot.exists()) {
      const data = StoreModel.fromJson(snapShot.data() as IStore);
      data.id = snapShot.id;
      return data;
    }
    return null;
  }

  static getSingleStoreFromLS(docId: string): IStoreWithFetchDate | null {
    const localStorage = window.localStorage.getItem(
      CAKE_STORE_LS_KEY_PREFIX + docId
    );
    if (localStorage !== null) {
      var parsedLS = JSON.parse(localStorage) as IStoreWithFetchDate;
      return {
        store: StoreModel.fromJson(parsedLS.store),
        fetchDate: parsedLS.fetchDate,
      } as IStoreWithFetchDate;
    }
    return null;
  }

  static setStoreWithFetchDateToLS(storeWithFetchDate: IStoreWithFetchDate) {
    let result = storeWithFetchDate.store.toFirebaseJson();
    window.localStorage.setItem(
      CAKE_STORE_LS_KEY_PREFIX + storeWithFetchDate.store.id,
      JSON.stringify({
        store: result,
        fetchDate: storeWithFetchDate.fetchDate,
      } as IStoreWithFetchDate)
    );
  }

  // static async setStore(store: StoreModel) {
  //   const id = store.id;
  //   const docRef = doc(firestore, this.PATH, id);
  //   const now = new Date();
  //   store.regDTime = Timestamp.fromDate(now);
  //   store.modDTime = Timestamp.fromDate(now);
  //   store.modUser = "admin";
  //   try {
  //     const result = await setDoc(docRef, store.toFirebaseJson());
  //     return true;
  //   } catch (error) {
  //     console.log(error);

  //     return false;
  //   }
  // }
  // static removeId(store: StoreModel): any {
  //   let { id, ...storeInfoRmId } = store;
  //   return storeInfoRmId;
  // }
}
