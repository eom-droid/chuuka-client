<script setup lang="ts">
import { ref, onActivated, computed } from "vue";
import { router } from "@/router/router";
import axios from "axios";
import { urlConfig } from "@/../urlConfig.js";
import { locations } from "@/assets/city/city";
import { usePersonalStore } from "@/stores/personal";
import { storeToRefs } from "pinia";

//localStorage와 pinia 사용으로 전체 로직 변경필요
// 준혁이가 디자인 끝내면 다시시작

const pinia = usePersonalStore();
const {
  getIsInitialized,
  getSelectedLocation,
  getLastSearchedAddress,
  getSearchedList,
} = storeToRefs(pinia);
const {
  setIsInitialized,
  setSelectedLocation,
  setLastSearchedAddress,
  setSearchedList,
} = pinia;

const innerRoute = ref(0);
const selectedLocation = ref("");
const address = ref("");
const latLong = ref({ latitude: 0, longitude: 0 });

const btnRunning = ref(false);
const tempSearchedList = ref(["서울 종로구", "서울 중구"] as string[]);

const keyword = ref("");
const searchArray = computed(() => {
  if (keyword.value.trim() === "") return [];
  let result = [] as Array<string>;
  locations.map((ele) => {
    if (ele.includes(keyword.value)) {
      result.push(ele);
    }
  });
  return result;
});

function changeKeyword(e: any) {
  keyword.value = e.target.value;
}

onActivated(() => {
  btnRunning.value = false;
  if (getIsInitialized.value) return;

  init();
});

function init() {
  setIsInitialized(true);
  let tempSelectedLocation = window.localStorage.getItem("selectedLocation");
  let templastSearchedAddress = window.localStorage.getItem(
    "lastSearchedAddress"
  );
  let tempSearchedList = window.localStorage.getItem("searchedList");

  // 추후 작업 필요 null일때 비교하고

  // if (tempLoc != null && tempLoc != "지역 전체") {
  //   address.value = tempLoc;
  //   selectedLoaction.value = address.value;
  // }
}

function onClickSetLocation() {
  if (btnRunning.value) return;
  btnRunning.value = true;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      setTimeout(() => (btnRunning.value = false), 10000);
      latLong.value.latitude = position.coords.latitude;
      latLong.value.longitude = position.coords.longitude;
      let result = await axios.get(urlConfig.getAddressByLonLat, {
        params: {
          coords: latLong.value.longitude + "," + latLong.value.latitude,
        },
      });
      sortCity(result.data);
    },
    (error) => {
      setTimeout(() => (btnRunning.value = false), 10000);
    }
  );
}

function sortCity(argObj: any) {
  let tempMap = argObj.results[0].region;
  let result = "";
  for (let i of Object.keys(tempMap)) {
    if (i === "area1") {
      result = tempMap[i].alias + " ";
      continue;
    }
    let a = tempMap[i].name as string;
    if (a.endsWith("시") || a.endsWith("구") || a.endsWith("군")) {
      result = result + tempMap[i].name + " ";
    }
  }
  result = result.trim();
  if (locations.find((ele) => ele === result) != undefined) {
    address.value = result;
    setSelectedLocation(result);
    selectedLocation.value = result;
    getSelectedLocation.value = result;
  }
}

function onClickLocationSearchBtn() {
  innerRoute.value = 1;
  setTimeout(() => {
    document.getElementById("searchInput")?.focus();
  }, 301);
}

function onClickXBtn() {
  keyword.value = "";
  document.getElementById("searchInput")?.blur();
}
</script>

<template>
  <main class="w-full h-full font-medium">
    <Transition name="slide-location">
      <!-- 위치 -->
      <div class="w-full absolute z-0" v-show="innerRoute === 0">
        <div class="x-basic-padding mb-6">
          <div class="flex relative my-4">
            <img
              src="@/assets/img/icon/backword.svg"
              class="absolute w-6 h-6 hover:cursor-pointer mt-0.5"
              @click="router.push('/')"
            />

            <p class="font-semibold text-xl m-auto">위치</p>
          </div>

          <div class="">
            <label class="py-5 flex">
              <img src="@/assets/img/icon/earth.svg" class="w-5 ml-0.5" />
              <p class="ml-2.5 text-base">지역 전체</p>
              <input
                type="radio"
                v-model="getSelectedLocation"
                class="radioBtn ml-auto w-5"
                value="지역 전체"
              />
            </label>
            <label class="py-5 flex">
              <img src="@/assets/img/icon/earth.svg" class="w-5 ml-0.5" />
              <p class="ml-2.5 text-base">지역 전체</p>
              <input
                type="radio"
                v-model="getSelectedLocation"
                class="radioBtn ml-auto w-5"
                value="지역 전체"
              />
            </label>

            <button
              class="bg-light-gray w-full h-12 align-middle rounded-md"
              @click="onClickLocationSearchBtn()"
            >
              <div class="py-3 px-2.5 flex">
                <img
                  src="@/assets/img/icon/search_text_gray.svg"
                  class="w-6 h-6 ml"
                />
                <span class="text-base ml-2.5 text-text-gray font-normal"
                  >시, 도, 군/구 를 검색해주세요.</span
                >
              </div>
            </button>
            <button class="mt-6 ml-2.5 flex" @click="onClickSetLocation()">
              <img src="@/assets/img/icon/target.svg" class="w-5 h-5 my-auto" />
              <span class="underline text-base ml-2.5">현재 위치</span>
            </button>
          </div>
        </div>
        <div class="w-full bg-light-gray h-2.5"></div>
        <div class="x-basic-padding text-left mt-8">
          <div class="text-text-gray">검색 기록</div>
          <div class="mt-3">
            <button
              v-for="searched in tempSearchedList"
              :key="searched"
              class="w-full text-left text-base"
            >
              <p class="py-3">{{ searched }}</p>
              <hr class="bg-mid-gray" />
            </button>
          </div>
        </div>
        <div class="h-28"></div>
      </div>
    </Transition>
    <Transition name="slide-location-search">
      <!-- 위치 검색 -->
      <div
        class="x-basic-padding mt-14 w-full absolute z-10"
        v-show="innerRoute === 1"
      >
        <div class="flex">
          <div
            class="bg-light-gray w-full h-12 align-middle rounded-md searchBox"
          >
            <div class="py-3 px-2.5 flex">
              <img
                src="@/assets/img/icon/search_text_gray.svg"
                class="w-6 h-6 ml"
              />
              <input
                id="searchInput"
                class="searchInput"
                placeholder="시, 도, 군/구 를 검색해주세요."
                :value="keyword"
                @input="changeKeyword"
              />
              <button>
                <img
                  src="@/assets/img/icon/cancleBtn.svg"
                  v-show="keyword != ''"
                  @click="onClickXBtn()"
                  class="w-6 h-6"
                />
              </button>
            </div>
          </div>
          <button
            class="text-usual-blue text-lg w-10 my-auto ml-3"
            @click="innerRoute = 0"
            v-show="keyword === ''"
          >
            닫기
          </button>
        </div>
        <div class="mt-6 text-left ml-1 text-text-gray">
          "{{ keyword }}" 검색 결과
        </div>
        <div class="mt-5">
          <div v-for="loc in searchArray">
            <button class="text-base py-2 my-1 w-full text-left" @click="">
              {{ loc }}
            </button>
            <hr />
          </div>
        </div>
        <div class="h-28"></div>
      </div>
    </Transition>
  </main>
</template>

<style scoped>
/* .slide-up {
  transition: all 3s;
}
.slide-up-enter-active {
  transition: all 3s ease;
}
.slide-up-leave-active {
  transition: all 3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-up-enter,
.slide-up-leave-active {
  opacity: 0;
  transform: translateY(100%);
} */

/* .slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
} */

.searchInput {
  @apply bg-light-gray text-base ml-2.5 w-full;
}
.searchInput:focus {
  @apply outline-0;
}
.searchBox:focus-within {
  @apply outline outline-black;
}

.slide-location-leave-active,
.slide-location-search-leave-active,
.slide-location-enter-active,
.slide-location-search-enter-active {
  transition: 0.3s;
}
.slide-location-enter-from {
  transform: translate(-100%, 0);
}
.slide-location-search-enter-from {
  transform: translate(100%, 0);
}
.slide-location-leave-to {
  transform: translate(-100%, 0);
}
.slide-location-search-leave-to {
  transform: translate(100%, 0);
}
</style>
