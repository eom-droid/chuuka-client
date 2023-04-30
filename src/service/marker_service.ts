import { IMarker, MarkerModel } from "@/model/marker_model";
import { OpenCloseHoursModel } from "@/model/place/open_close_hours_model";
import { firestore } from "@/plugins/firebase";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import {
  CAKE_MARKERS_FETCH_DATE_LS_KEY,
  CAKE_MARKERS_LS_KEY,
} from "@/constant/localstorage_constant";
import { getDateTimeByDate } from "@/utils/moment";

export class MarkerService {
  private static PATH = "/chuuka2/production";

  static async fetchMarkersFromDB(): Promise<Array<MarkerModel>> {
    const docRef = doc(firestore, this.PATH);

    const singleDoc = await getDoc(docRef);
    if (!singleDoc.exists()) return [];

    const markers = singleDoc.data().cakeMarkers as Array<IMarker>;

    let result = markers.map((marker) => {
      return new MarkerModel({
        placeId: marker.placeId,
        geoCoord: marker.geoCoord,
        openCloseHours: OpenCloseHoursModel.fromJson(marker.openCloseHours),
      });
    });

    return result;
  }

  static getMarkersFromLS(): Array<MarkerModel> | null {
    const markers_localStorage =
      window.localStorage.getItem(CAKE_MARKERS_LS_KEY);
    if (markers_localStorage === null) return null;

    const markers = JSON.parse(markers_localStorage) as Array<IMarker>;
    let result = markers.map((marker) => {
      return new MarkerModel({
        placeId: marker.placeId,
        geoCoord: marker.geoCoord,
        openCloseHours: OpenCloseHoursModel.fromJson(marker.openCloseHours),
      });
    });
    return result;
  }

  static setMarkersToLS(markers: Array<MarkerModel>) {
    let result = markers.map((marker) => {
      return {
        placeId: marker.placeId,
        geoCoord: marker.geoCoord,
        openCloseHours: marker.openCloseHours.toJson(),
      };
    });
    window.localStorage.setItem(CAKE_MARKERS_LS_KEY, JSON.stringify(result));
  }

  static setMarkersFetchDateToLS(date: Date): void {
    window.localStorage.setItem(
      CAKE_MARKERS_FETCH_DATE_LS_KEY,
      getDateTimeByDate(date)
    );
  }

  static getMarkersFetchDateFromLS(): Date | null {
    const markersFetchDate_localStoreage = window.localStorage.getItem(
      CAKE_MARKERS_FETCH_DATE_LS_KEY
    );
    if (markersFetchDate_localStoreage === null) return null;
    return new Date(markersFetchDate_localStoreage);
  }
}
