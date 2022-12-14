import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { IMustRead, IStore } from "@/api/m1/store";

export const useStoreInfoStore = defineStore("storeInfo", () => {
  const storeInfo = ref({} as IStore);
  //   const doubleCount = computed(() => count.value * 2);
  const getStoreInfo = computed(() => {
    return storeInfo.value;
  });
  function setStoreInfo(newValue: IStore) {
    storeInfo.value = newValue;
  }
  function updateMustRead(newValue: IMustRead) {
    storeInfo.value.mustRead = newValue;
  }

  return { getStoreInfo, setStoreInfo, updateMustRead };
});
