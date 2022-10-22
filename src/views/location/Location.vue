<script setup lang="ts">
import { getAllStoreLandingInfo, IStoreLanding } from "@/api/m1/store";
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  getCurrentInstance,
  onUnmounted,
  watch,
  onActivated,
} from "vue";
import defaultImg from "@/assets/chuuka.png";
import { router } from "@/router/router";
import axios from "axios";
import { urlConfig } from "@/../urlConfig.js";
import { locations } from "@/assets/city/city";

const selectedLoaction = ref("지역 전체");
const location = ref("");
const latLong = ref({ latitude: 0, longitude: 0 });
//@ts-ignore
const { proxy } = getCurrentInstance();
const emitter = proxy.$emitter;
const btnRunning = ref(false);

onActivated(() => {
  btnRunning.value = false;
  init();
});
function init() {
  initLoc();
}

function onClickBack() {
  router.go(-1);
}
function initLoc() {
  if (history.state.location != undefined) {
    location.value = history.state.location;
    selectedLoaction.value = location.value;
  }
}
function onClickSubmit(location: string) {
  router.push({ path: "/storeList", state: { location } });
}

function onClickSetLocation() {
  // console.log(btnRunning.value);
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
      // console.log(error.message);
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
  <main class="customWidth px-2">
    <div class="mt-7 relative customHeight">
      <div class="">
        <div class="flex">
          <!-- 라우터 무한루프 문제 해결 필요 -->

          <img
            src="@/assets/img/icon/backword.svg"
            class="fixed w-6 hover:cursor-pointer"
            @click="onClickBack()"
          />

          <p class="font-semibold text-xl m-auto">위치</p>
        </div>

        <div class="">
          <label class="mt-5 ml-2 flex">
            <img src="@/assets/img/icon/earth.svg" class="w-5" />
            <p class="ml-3 text-base">지역 전체</p>
            <input
              type="radio"
              v-model="selectedLoaction"
              class="radioBtn ml-auto w-5"
              value="지역 전체"
            />
          </label>
          <label class="mt-5 ml-2 flex" v-show="location != ''">
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

          <div class="mt-5 bg-tgray-300 rounded-md">
            <router-link to="/location/search" class="">
              <button class="text-tgray-700 w-full h-12 text-base">
                위치 변경하기
              </button>
            </router-link>
          </div>
        </div>

        <div class="absolute bottom-0 z-10 w-full">
          <button
            class="bg-color-main text-white h-12 rounded-md text-lg w-full"
            @click="onClickSubmit(selectedLoaction)"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
.customHeight {
  height: 94vh;
}
@media (max-width: 448px) {
  .customWidth {
    width: 100vw;
  }
}
@media (min-width: 448px) {
  .customWidth {
    width: 448px;
  }
}
</style>
