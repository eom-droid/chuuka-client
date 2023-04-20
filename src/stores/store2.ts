import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { IMustRead, IStore2 } from "@/api/m1/store";

// localstorage key만 저장하는것이 필요함
export const MARKERS_EXPIRE_DTIME = "markersExpireDTime";
export const MARKERS = "markers";
export const STORES = "stores";

export interface IMarker {}

export const useStoreInfoStore = defineStore("store2", () => {
  const storeInfo = ref({} as IStore2);
  const isInit = ref(false);
  //   const doubleCount = computed(() => count.value * 2);
  const getStoreInfo = computed(() => {
    if (!isInit) {
      const markersExpireDTime =
        window.localStorage.getItem(MARKERS_EXPIRE_DTIME);
      const markers = window.localStorage.getItem(MARKERS);
      const stores = window.localStorage.getItem(STORES);
    }
    return storeInfo.value;
  });
  function setStoreInfo(newValue: IStore2) {
    storeInfo.value = newValue;
  }

  return { getStoreInfo, setStoreInfo };
});
