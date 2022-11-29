import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usePersonalStore = defineStore("personal", () => {
  const selectedLocation = ref("" as string);
  const lastSearchedAddress = ref("" as string);
  const searchedList = ref([] as string[]);
  const isInitialized = ref(false);

  const getSelectedLocation = computed(() => {
    return selectedLocation.value;
  });
  function setSelectedLocation(newValue: string) {
    selectedLocation.value = newValue;
  }
  const getLastSearchedAddress = computed(() => {
    return lastSearchedAddress.value;
  });

  function setLastSearchedAddress(newValue: string) {
    lastSearchedAddress.value = newValue;
  }

  const getSearchedList = computed(() => {
    return searchedList.value;
  });

  function setSearchedList(newValue: string[]) {
    searchedList.value = newValue;
  }

  const getIsInitialized = computed(() => {
    return isInitialized.value;
  });

  function setIsInitialized(newValue: boolean) {
    isInitialized.value = newValue;
  }

  return {
    getSelectedLocation,
    setSelectedLocation,
    getLastSearchedAddress,
    setLastSearchedAddress,
    getSearchedList,
    setSearchedList,
    getIsInitialized,
    setIsInitialized,
  };
});
