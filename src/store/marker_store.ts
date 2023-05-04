import {
  MarkerBaseModel,
  MarkersWithUpdateTimeModel,
} from "@/model/marker_model";
import { MarkerService } from "@/service/marker_service";
import { defineStore } from "pinia";
import { daysBetween } from "@/utils/moment";
import { CAKE_MARKERS_FETCH_DATE_LIMIT_DAYS } from "@/constant/localstorage_constant";

// 이 부분도 엄청 고민이 길었음

export const useMarkerStore = defineStore({
  id: "marker",
  state: () => ({
    _markers: [] as Array<MarkerBaseModel>,
    isInitialized: false,
  }),

  actions: {
    async initialize(): Promise<void> {
      if (!this.isInitialized) {
        this._markers = await _initialize();
        this.isInitialized = true;
      }
    },
  },
  getters: {
    getMarkers: async (state) => {
      if (state.isInitialized === false) {
        state.isInitialized = true;
        state._markers = await _initialize();
      }
      return state._markers;
    },
  },
});

async function _initialize(): Promise<Array<MarkerBaseModel>> {
  const today = new Date();
  var result;
  // localStorage에 저장된 markersFetchDate 값이 있는지 확인합니다.
  // 추가적으로 markersFetchDate 값이 하루이상 차이가 나는지 확인합니다.

  const markersFetchDate = MarkerService.getMarkersFetchDateFromLS();
  // markersFetchDate 값이 없다면
  if (markersFetchDate === null) {
    result = await getMarkersFromFireBaseAndFetchToLocalStorage();
  } else {
    // markersFetchDate 값이 expired 된다면
    if (
      daysBetween(today, markersFetchDate) >= CAKE_MARKERS_FETCH_DATE_LIMIT_DAYS
    ) {
      result = await getMarkersFromFireBaseAndFetchToLocalStorage();
    } else {
      var markerFromLS = await MarkerService.getMarkersWithUpdateTimeFromLS();
      if (markerFromLS === null) {
        result = await getMarkersFromFireBaseAndFetchToLocalStorage();
      } else {
        result = markerFromLS;
      }
    }
  }

  if (result != null) {
    result = result as MarkersWithUpdateTimeModel;
    return markersWIthUpdateTimeToMarkers(result);
  } else {
    return [];
  }
}

async function getMarkersFromFireBaseAndFetchToLocalStorage(): Promise<MarkersWithUpdateTimeModel | null> {
  let now = new Date();
  // firebase에서 불러와서
  const result = await MarkerService.fetchMarkersWithUpdateTimeFromDB();
  if (result != null) {
    // localStorage에 저장합니다.
    MarkerService.setMarkersWithUpdateTimeToLS(result);
    MarkerService.setMarkersFetchDateToLS(now);
  }

  return result;
}

function markersWIthUpdateTimeToMarkers(
  markersWithUpdateTime: MarkersWithUpdateTimeModel
): Array<MarkerBaseModel> {
  let result = [] as Array<MarkerBaseModel>;

  result = result.concat(markersWithUpdateTime.markers);
  result = result.concat(markersWithUpdateTime.articleMarkers);

  return result;
}
