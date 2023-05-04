import {
  CAKE_PLACE_LS_KEY_PREFIX,
  CAKE_PLACE_FETCH_DATE_LS_KEY,
} from "@/constant/localstorage_constant";
import { IPlaceWithFetchDate } from "@/model/place_local_storage_model";
import {
  PlaceBaseModel,
  IPlaceBase,
  PlaceArticleModel,
  IPlaceArticle,
  IPlaceCake,
  PlaceCakeModel,
} from "@/model/place_model";
import { firestore } from "@/plugins/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getDateTimeByDate } from "@/utils/moment";
import { NET, PLACE_CATEGORY } from "@/constant/constant";

export class PlaceService {
  private static PATH = `/chuuka2/${NET}/place`;

  static async fetchSinglePlaceFromDB(
    docId: string
  ): Promise<PlaceBaseModel | null> {
    const query = doc(firestore, this.PATH, docId);
    const snapShot = await getDoc(query);
    if (snapShot.exists()) {
      //1 check isArticle => PlaceArticleModel

      var data = PlaceService.checkCategoryAndParse(
        snapShot.data() as IPlaceBase
      );
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
    let result = placeWithFetchDate.place.toJson();

    window.localStorage.setItem(
      CAKE_PLACE_LS_KEY_PREFIX + placeWithFetchDate.place.id,
      JSON.stringify({
        place: result,
        fetchDate: placeWithFetchDate.fetchDate,
      } as IPlaceWithFetchDate)
    );
  }
  static checkCategoryAndParse(placeBase: IPlaceBase): PlaceBaseModel {
    // 1. check isArticle => PlaceArticleModel
    if (placeBase.isArticle) {
      return PlaceArticleModel.fromJson(placeBase as IPlaceArticle);
    } else {
      // 2. check category => PlaceCakeModel
      if (placeBase.category === PLACE_CATEGORY.CAKE) {
        return PlaceCakeModel.fromJson(placeBase as IPlaceCake);
      }
      // 3. PlaceBaseModel
      else {
        return PlaceBaseModel.fromJson(placeBase as PlaceBaseModel);
      }
    }
  }
}
