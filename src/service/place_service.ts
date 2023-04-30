import {
  CAKE_PLACE_LS_KEY_PREFIX,
  CAKE_PLACE_FETCH_DATE_LS_KEY,
} from "@/constant/localstorage_constant";
import { IPlaceWithFetchDate } from "@/model/place_local_storage_model";
import { PlaceModel, IPlace } from "@/model/place_model";
import { firestore } from "@/plugins/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDateTimeByDate } from "@/utils/moment";
import { PLACE_CATEGORY } from "@/constant/constant";
import {
  IPlaceCake,
  PlaceCakeModel,
} from "@/model/place/cake/place_cake_model";

export class PlaceService {
  private static PATH = "/chuuka2/production/place";

  //한번에 불러오는 경우는 없어서 주석처리
  // static async fetchData(): Promise<Array<PlaceModel>> {
  //   let result = [] as Array<PlaceModel>;
  //   const docRef = collection(firestore, this.PATH);

  //   const docs = await getDocs(docRef);
  //   docs.docs.map((ele) => {
  //     const data = PlaceModel.fromJson(ele.data() as IPlace);
  //     data.id = ele.id;
  //     result.push(data);
  //   });
  //   return result;
  // }

  // static async checkIdExist(docId: string): Promise<boolean> {
  //   const query = doc(firestore, this.PATH, docId);
  //   const snapShot = await getDoc(query);
  //   if (snapShot.exists()) {
  //     return true;
  //   }
  //   return false;
  // }

  static async fetchSinglePlaceFromDB(
    docId: string
  ): Promise<PlaceModel | null> {
    const query = doc(firestore, this.PATH, docId);
    const snapShot = await getDoc(query);
    if (snapShot.exists()) {
      var data = PlaceService.checkCategoryAndParse(snapShot.data() as IPlace);
      data.id = snapShot.id;
      return data;
    }
    return null;
  }

  static getSinglePlaceFromLS(docId: string): IPlaceWithFetchDate | null {
    const localStorage = window.localStorage.getItem(
      CAKE_PLACE_LS_KEY_PREFIX + docId
    );
    if (localStorage !== null) {
      var parsedLS = JSON.parse(localStorage) as IPlaceWithFetchDate;
      var place = PlaceService.checkCategoryAndParse(parsedLS.place);
      return {
        place: place,
        fetchDate: parsedLS.fetchDate,
      } as IPlaceWithFetchDate;
    }
    return null;
  }

  static setPlaceWithFetchDateToLS(placeWithFetchDate: IPlaceWithFetchDate) {
    let result = placeWithFetchDate.place.toFirebaseJson();

    window.localStorage.setItem(
      CAKE_PLACE_LS_KEY_PREFIX + placeWithFetchDate.place.id,
      JSON.stringify({
        place: result,
        fetchDate: placeWithFetchDate.fetchDate,
      } as IPlaceWithFetchDate)
    );
  }
  static checkCategoryAndParse(place: IPlace): PlaceModel {
    var result;
    if (place.category === PLACE_CATEGORY.CAKE) {
      result = PlaceCakeModel.fromJson(place);
    } else {
      result = PlaceModel.fromJson(place);
    }
    return result;
  }

  // static async setPlace(place: PlaceModel) {
  //   const id = place.id;
  //   const docRef = doc(fireplace, this.PATH, id);
  //   const now = new Date();
  //   place.regDTime = Timestamp.fromDate(now);
  //   place.modDTime = Timestamp.fromDate(now);
  //   place.modUser = "admin";
  //   try {
  //     const result = await setDoc(docRef, place.toFirebaseJson());
  //     return true;
  //   } catch (error) {
  //     console.log(error);

  //     return false;
  //   }
  // }
  // static removeId(place: PlaceModel): any {
  //   let { id, ...placeInfoRmId } = place;
  //   return placeInfoRmId;
  // }
}
