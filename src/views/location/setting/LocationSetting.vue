<script setup lang="ts">
import { ref, onMounted } from "vue";
import { router } from "@/router/router";
import axios from "axios";
import { urlConfig } from "@/../urlConfig.js";
import { locations } from "@/assets/city/city";
import { usePersonalStore } from "@/stores/personal";
import { storeToRefs } from "pinia";
import { entireRegion } from "@/constant/constant";

//localStorage와 pinia 사용으로 전체 로직 변경필요
// 준혁이가 디자인 끝내면 다시시작

const pinia = usePersonalStore();
const { getSelectedLocation, getLastSearchedAddress, getSearchedList } =
  storeToRefs(pinia);
const { setSelectedLocation, setLastSearchedAddress, addSearchedList } = pinia;

const latLong = ref({ latitude: 0, longitude: 0 });

const btnRunning = ref(false);
const tempSelectedLocation = ref("");

onMounted(() => {});

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
      const sortedCity = sortCity(result.data);
      if (sortedCity != "") {
        setData(sortedCity);
      }
      btnRunning.value = false;
      router.push("/");
    },
    (error) => {
      setTimeout(() => (btnRunning.value = false), 5000);
    }
  );
}

function setData(sortedCity: string) {
  setSelectedLocation(sortedCity);
  setLastSearchedAddress(sortedCity);
  addSearchedList(sortedCity);
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
    return result;
  }
  return "";
}

function onClickLocationSearchBtn() {
  setTimeout(() => {
    document
      .getElementById("searchInput")
      ?.setAttribute("autofocus", "autofocus");
    document.getElementById("searchInput")?.focus();
  }, 301);
}

function onClickBackword() {
  router.push("/");
}

function onClickLocationLabel(newValue: string) {
  if (newValue === getSelectedLocation.value) return;
  setSelectedLocation(newValue);
  router.push("/");
}

function onClickHistory(location: string) {
  setSelectedLocation(location);
  setLastSearchedAddress(location);
  addSearchedList(location);
  router.push("/");
}
</script>

<template>
  <div class="w-full absolute z-0">
    <div class="x-basic-padding flex relative py-4">
      <img
        src="@/assets/img/icon/backword.svg"
        class="absolute w-6 h-6 hover:cursor-pointer mt-0.5"
        @click="onClickBackword()"
      />

      <p class="font-semibold text-xl m-auto py">위치</p>
    </div>
    <div class="x-basic-padding mb-6 mt-4">
      <div class="">
        <button
          class="my-3 flex w-full"
          @click="onClickLocationLabel(entireRegion)"
        >
          <img src="@/assets/img/icon/earth.svg" class="w-5 ml-0.5 my-auto" />
          <p class="ml-2.5 text-base">{{ entireRegion }}</p>

          <input
            type="radio"
            v-model="getSelectedLocation"
            class="radioBtn ml-auto w-5 h-5 my-auto"
            :value="entireRegion"
            @click.prevent
          />
        </button>
        <button
          class="mt-6 flex w-full"
          v-if="getLastSearchedAddress != ''"
          @click="onClickLocationLabel(getLastSearchedAddress)"
        >
          <img
            src="@/assets/img/icon/location.svg"
            style="width: 18px"
            class="ml-0.5 my-auto"
          />
          <p class="ml-2.5 text-base">{{ getLastSearchedAddress }}</p>
          <input
            type="radio"
            v-model="getSelectedLocation"
            class="radioBtn ml-auto w-5 h-5 my-auto"
            :value="getLastSearchedAddress"
            @click.prevent
          />
        </button>

        <router-link to="/location/search" @click="onClickLocationSearchBtn()">
          <div
            class="py-3 px-2.5 flex bg-light-gray w-full h-12 align-middle rounded-md mt-6"
          >
            <img
              src="@/assets/img/icon/search_text_gray.svg"
              class="w-6 h-6 ml"
            />
            <span class="text-base ml-2.5 text-text-gray font-normal"
              >시, 도, 군/구 를 검색해주세요.</span
            >
          </div>
        </router-link>
        <button class="mt-6 ml-2.5 flex relative" @click="onClickSetLocation()">
          <img src="@/assets/img/icon/target.svg" class="w-5 h-5 my-auto" />
          <span class="underline text-base ml-2.5 text-text-gray my-auto"
            >현재 위치</span
          >
          <img
            src="@/assets/gif/loadingIcon_croped.gif"
            class="w-10 absolute -top-3 -left-3"
            v-if="btnRunning"
          />
        </button>
      </div>
    </div>
    <div class="w-full bg-light-gray h-2.5"></div>
    <div class="x-basic-padding text-left mt-8">
      <div class="text-text-gray">검색 기록</div>
      <div class="mt-3">
        <button
          v-for="searched in getSearchedList"
          :key="searched"
          class="w-full text-left text-base"
          @click="onClickHistory(searched)"
        >
          <p class="py-3">{{ searched }}</p>
          <hr class="bg-mid-gray" />
        </button>
      </div>
    </div>
    <div class="h-28"></div>
  </div>
</template>

<style>
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
