<script setup lang="ts">
import { ref, onActivated } from "vue";
import { router } from "@/router/router";
import axios from "axios";
import { urlConfig } from "@/../urlConfig.js";
import { locations } from "@/assets/city/city";

const selectedLoaction = ref("지역 전체");
const location = ref("");
const latLong = ref({ latitude: 0, longitude: 0 });

const btnRunning = ref(false);
const tempSearchedList = ref(["서울 종로구", "서울 중구"] as string[]);

onActivated(() => {
  btnRunning.value = false;
  init();
});
function init() {
  initLoc();
}

function onClickBack() {
  router.push("/");
}
function initLoc() {
  let tempLoc = window.localStorage.getItem("location");
  if (tempLoc != null && tempLoc != "지역 전체") {
    location.value = tempLoc;
    selectedLoaction.value = location.value;
  }
}
function onClickSubmit(location: string) {
  window.localStorage.setItem("location", location);
  onClickBack();
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
    location.value = result;
    selectedLoaction.value = result;
  }
}
</script>

<template>
  <main class="w-full font-medium">
    <div class="x-basic-padding mb-6">
      <div class="flex relative my-4">
        <!-- 라우터 무한루프 문제 해결 필요 -->

        <img
          src="@/assets/img/icon/backword.svg"
          class="absolute w-6 h-6 hover:cursor-pointer mt-0.5"
          @click="onClickBack()"
        />

        <p class="font-semibold text-xl m-auto">위치</p>
      </div>

      <div class="">
        <label class="py-5 flex">
          <img src="@/assets/img/icon/earth.svg" class="w-5" />
          <p class="ml-3 text-base">지역 전체</p>
          <input
            type="radio"
            v-model="selectedLoaction"
            class="radioBtn ml-auto w-5"
            value="지역 전체"
          />
        </label>
        <button
          class="bg-light-gray w-full h-12 align-middle rounded-md"
          @click="router.push({ name: 'location-search' })"
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
        <button class="mt-6 ml-2.5 flex">
          <img src="@/assets/img/icon/target.svg" class="w-5 h-5 my-auto" />
          <span class="underline text-base ml-2.5">현재 위치</span>
        </button>
        <!-- <label class="mt-5 ml-2 flex" v-show="location != ''">
          <img src="@/assets/img/icon/location.svg" class="w-5" />
          <p class="ml-3 text-base">{{ location }}</p>
          <input
            type="radio"
            v-model="selectedLoaction"
            class="radioBtn ml-auto w-5"
            :value="location"
          />
        </label>
        <div class="text-left" @click="onClickSetLocation()">
          <button class="text-xs ml-3 text-blue-500">현재 위치로 설정</button>
        </div>

        <div class="mt-5 bg-neutral-300 rounded-md">
          <router-link to="/location/search" class="">
            <button class="text-neutral-700 w-full h-12 text-base">
              위치 변경하기
            </button>
          </router-link>
        </div> -->
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
  </main>
</template>

<style></style>
