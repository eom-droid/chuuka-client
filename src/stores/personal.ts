import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { entireRegion } from "@/constant/constant";

export const usePersonalStore = defineStore("personal", () => {
  const selectedLocation = ref("" as string);
  const lastSearchedAddress = ref("" as string);
  const searchedList = ref([] as string[]);

  function init() {
    let tempSelectedLocation = window.localStorage.getItem("selectedLocation");
    let tempLastSearchedAddress = window.localStorage.getItem(
      "lastSearchedAddress"
    );
    let tempSearchedList = window.localStorage.getItem("searchedList");
    if (tempSelectedLocation != null) {
      setSelectedLocation(tempSelectedLocation);
    } else {
      setSelectedLocation(entireRegion);
    }
    if (tempLastSearchedAddress != null) {
      setLastSearchedAddress(tempLastSearchedAddress);
    }
    if (tempSearchedList != null) {
      setSearchedList(JSON.parse(tempSearchedList));
    }
  }

  const getSelectedLocation = computed(() => {
    return selectedLocation.value;
  });
  function setSelectedLocation(newValue: string) {
    selectedLocation.value = newValue;
    window.localStorage.setItem("selectedLocation", newValue);
  }
  const getLastSearchedAddress = computed(() => {
    return lastSearchedAddress.value;
  });

  function setLastSearchedAddress(newValue: string) {
    lastSearchedAddress.value = newValue;
    window.localStorage.setItem("lastSearchedAddress", newValue);
  }

  const getSearchedList = computed(() => {
    return searchedList.value;
  });

  function setSearchedList(newValue: string[]) {
    searchedList.value = newValue;
  }
  function addSearchedList(newValue: string) {
    const tempIndex = searchedList.value.indexOf(newValue);
    if (tempIndex != -1) {
      searchedList.value.splice(tempIndex, 1);
    }
    searchedList.value.unshift(newValue);
    if (searchedList.value.length > 20) {
      searchedList.value.pop();
    }
    window.localStorage.setItem(
      "searchedList",
      JSON.stringify(searchedList.value)
    );
  }

  return {
    init,
    getSelectedLocation,
    setSelectedLocation,
    getLastSearchedAddress,
    setLastSearchedAddress,
    getSearchedList,
    setSearchedList,
    addSearchedList,
  };
});
