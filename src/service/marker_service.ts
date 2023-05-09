import {
  IMarkersWithUpdateTime,
  IMarker,
  MarkerArticleModel,
  MarkerModel,
  MarkersWithUpdateTimeModel,
} from "@/model/marker_model";
import { firestore } from "@/plugins/firebase";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import {
  MARKERS_FETCH_TIME_LS_KEY,
  MARKERS_WITH_UPDATE_TIME_LS_KEY,
} from "@/constant/localstorage_constant";
import { getDateTimeByDate } from "@/utils/moment";
import { NET } from "@/constant/constant";

export class MarkerService {
  private static PATH = `/chuuka2/${NET}`;

  static async fetchMarkersWithUpdateTimeFromDB(): Promise<MarkersWithUpdateTimeModel | null> {
    const docRef = doc(firestore, this.PATH);

    const singleDoc = await getDoc(docRef);
    if (!singleDoc.exists()) return null;

    const markerWithUpdateTime = singleDoc.data() as IMarkersWithUpdateTime;

    let result = new MarkersWithUpdateTimeModel({
      markers: markerWithUpdateTime.markers.map((ele) =>
        MarkerModel.fromJson(ele)
      ),
      modDTime: markerWithUpdateTime.modDTime,
      articleMarkers: markerWithUpdateTime.articleMarkers.map((ele) =>
        MarkerArticleModel.fromJson(ele)
      ),
    });

    return result;
  }

  // static getMarkersWithUpdateTimeFromLS(): MarkersWithUpdateTimeModel | null {
  //   const markers_localStorage = window.localStorage.getItem(
  //     MARKERS_WITH_UPDATE_TIME_LS_KEY
  //   );
  //   if (markers_localStorage === null) return null;

  //   const markerWithUpdateTime = JSON.parse(
  //     markers_localStorage
  //   ) as IMarkersWithUpdateTime;
  //   let result = new MarkersWithUpdateTimeModel({
  //     markers: markerWithUpdateTime.markers.map((ele) =>
  //       MarkerModel.fromJson(ele)
  //     ),
  //     modDTime: markerWithUpdateTime.modDTime,
  //     articleMarkers: markerWithUpdateTime.articleMarkers.map((ele) =>
  //       MarkerArticleModel.fromJson(ele)
  //     ),
  //   });
  //   return result;
  // }

  // static setMarkersWithUpdateTimeToLS(markers: MarkersWithUpdateTimeModel) {
  //   window.localStorage.setItem(
  //     MARKERS_WITH_UPDATE_TIME_LS_KEY,
  //     JSON.stringify(markers)
  //   );
  // }

  // static setMarkersFetchDateToLS(date: Date): void {
  //   window.localStorage.setItem(
  //     MARKERS_FETCH_TIME_LS_KEY,
  //     getDateTimeByDate(date)
  //   );
  // }

  // static getMarkersFetchDateFromLS(): Date | null {
  //   const markersFetchDate_localStoreage = window.localStorage.getItem(
  //     MARKERS_FETCH_TIME_LS_KEY
  //   );
  //   if (markersFetchDate_localStoreage === null) return null;
  //   return new Date(markersFetchDate_localStoreage);
  // }
}
