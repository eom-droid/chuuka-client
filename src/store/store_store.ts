import { MarkerModel } from "@/model/marker_model";
import { StoreModel } from "@/model/store_model";
import { MarkerService } from "@/service/marker_service";
import { StoreService } from "@/service/store_service";
import { defineStore } from "pinia";
import { IStoreWithFetchDate } from "@/model/store_local_storage_model";
import { daysBetween } from "@/utils/moment";
import { CAKE_STORE_FETCH_DATE_LIMIT_DAYS } from "@/constant/localstorage_constant";
import { getDateTimeByDate } from "@/utils/moment";
import { IMapDrawMarker } from "@/model/map_draw_marker_model";
import { ref } from "vue";

//차피 한번에 많이 불러오는 경우는 적을게 아니라 거의 없음
// 따라서 하루 한번정도 업데이트 하는 형식으로 가고
// recent Enter 값을 localStorage를 통해 저장해두자
// 그리고 그 값이 하루가 지났는지 확인하고 지났으면 업데이트를 하자

export const useStoreStore = defineStore({
  id: "store",
  state: () => ({
    // null 상태를 분류해둔 이유는 사용자가 /list로 바로 접근했을때를 대비함
    // 추후 null일때는 랜덤으로 store를 불러와서 전시할 예정
    _innerMapStore: null as Array<IMapDrawMarker> | null,
    _store: new Map<string, StoreModel>(),
  }),
  getters: {
    getInnerMapStore: (state): Array<IMapDrawMarker> | null => {
      return state._innerMapStore;
    },
  },
  actions: {
    setInnerMapStore(store: Array<IMapDrawMarker>) {
      console.log(store);
      this._innerMapStore = store;
    },
    async getStoreByDocId(docId: string): Promise<StoreModel | null> {
      var today = new Date();
      // 메모리 캐싱 확인
      var piniaStoreValue = this._store.get(docId);
      if (piniaStoreValue) {
        return piniaStoreValue;
      }
      // localStorage에서 캐싱 확인

      var localStorageValue = StoreService.getSingleStoreFromLS(docId);
      if (
        localStorageValue != null &&
        daysBetween(today, new Date(localStorageValue.fetchDate)) <=
          CAKE_STORE_FETCH_DATE_LIMIT_DAYS
      ) {
        this._store.set(docId, localStorageValue.store);
        return localStorageValue.store;
      }
      // firebase에서 가져오기
      var firebaseValue = await StoreService.fetchSingleStoreFromDB(docId);
      if (firebaseValue) {
        StoreService.setStoreWithFetchDateToLS({
          store: firebaseValue,
          fetchDate: getDateTimeByDate(today),
        } as IStoreWithFetchDate);

        this._store.set(docId, firebaseValue);
        return firebaseValue;
      }

      return null;
    },
  },
});

// async function _initialize(): Promise<Array<MarkerModel>> {
//   const today = new Date();
//   let result = [] as MarkerModel[];
//   // localStorage에 저장된 markersFetchDate 값이 있는지 확인합니다.
//   // 추가적으로 markersFetchDate 값이 하루이상 차이가 나는지 확인합니다.

//   const markersFetchDate = MarkerService.getMarkersFetchDateFromLS();
//   // markersFetchDate 값이 없다면
//   if (markersFetchDate === null) {
//     result = await getMarkersFromFireBaseAndFetchToLocalStorage();
//   } else {
//     // markersFetchDate 값이 expired 된다면
//     if (daysBetween(today, markersFetchDate) >= 1) {
//       result = await getMarkersFromFireBaseAndFetchToLocalStorage();
//     } else {
//       var markerFromLS = await MarkerService.getMarkersFromLS();
//       if (markerFromLS === null) {
//         result = await getMarkersFromFireBaseAndFetchToLocalStorage();
//       } else {
//         result = markerFromLS;
//       }
//     }
//   }
//   return result;
// }

// // async function getMarkersFromFireBaseAndFetchToLocalStorage(): Promise<
// //   Array<MarkerModel>
// // > {
// //   // firebase에서 불러와서
// //   const result = await MarkerService.fetchDataFromFirebase();
// //   // localStorage에 저장합니다.
// //   MarkerService.saveDataToLocalStorage(result);
// //   MarkerService.saveMarkersFetchDateToLocalStorage();
// //   return result;
// // }
