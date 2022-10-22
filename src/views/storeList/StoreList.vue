<script setup lang="ts">
import { throttle, range } from "lodash";
import {
  getAllStoreLandingInfo,
  IStoreLanding,
  getStoreLandingInfoByField,
} from "@/api/m1/store";
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
import { compileScript } from "@vue/compiler-sfc";

const tempAllStore = ref([] as Array<IStoreLanding>);
const location = ref("");
const lastVisible = ref(null as any);
const isEnd = ref(false);
const isRunning = ref(false);
const savedScrollHeight = ref(0);

//@ts-ignore
const { proxy } = getCurrentInstance();
const emitter = proxy.$emitter;

onMounted(() => {
  console.log("onMouted");
  init();

  document
    .getElementById("scrollEle")
    ?.addEventListener("scroll", throttle(calcScrollAndGetDocs, 200));
});

async function calcScrollAndGetDocs() {
  var scrollTop = document.getElementById("scrollEle")?.scrollTop;
  var scrollHeight = document.getElementById("scrollEle")?.scrollHeight; // added
  var offsetHeight = document.getElementById("scrollEle")?.offsetHeight;

  if (
    scrollTop === undefined ||
    scrollHeight === undefined ||
    offsetHeight === undefined
  )
    return;
  savedScrollHeight.value = scrollTop;
  // console.log(scrollHeight - scrollTop - offsetHeight);
  if (!isRunning.value && scrollHeight - scrollTop - offsetHeight < 150) {
    isRunning.value = true;
    await getNextDoc();
    isRunning.value = false;
  }
}
onActivated(() => {
  if (document.getElementById("scrollEle") != null) {
    //@ts-ignore
    document.getElementById("scrollEle").scrollTop = savedScrollHeight.value;
  }
  if (
    history.state.location != undefined &&
    location.value != history.state.location
  ) {
    // 적용하기로 나온경우 && 다른 선택을 했을 시
    location.value = history.state.location;
    initValues();
    initAllStore();
  }
});
function initValues() {
  tempAllStore.value = [];
  isEnd.value = false;
  isRunning.value = false;
  lastVisible.value = null;
}
onUnmounted(() => {
  document
    .getElementById("scrollEle")
    ?.removeEventListener("scroll", (event) => {});
});
function init() {
  initLocation();
  initAllStore();
}

async function initAllStore() {
  let tempResult;
  if (location.value === "지역 전체") {
    tempResult = await getAllStoreLandingInfo(
      lastVisible.value,
      location.value
    );
  } else {
    tempResult = await getStoreLandingInfoByField(
      lastVisible.value,
      "location",
      location.value
    );
  }
  tempResult.docs.map((ele) => {
    let data = ele.data() as IStoreLanding;
    data.id = ele.id;
    tempAllStore.value.push(data);
  });
  lastVisible.value = tempResult.docs[tempResult.docs.length - 1];
  tempAllStore.value.sort(() => Math.random() - 0.5);
  if (tempResult.docs.length != 30) {
    isEnd.value = true;
  }
}

function getImgUrl(e: any) {
  e.target.src = defaultImg;
}

function initLocation() {
  if (history.state.location != undefined) {
    location.value = history.state.location;
  } else {
    location.value = "지역 전체";
  }
}

function onlickLocation(location: string) {
  if (location === "지역 전체") {
    router.push({ name: "location" });
  } else {
    router.push({ name: "location", state: { location } });
  }
}

function onClickEachStore(store: IStoreLanding) {
  router.push({
    path: "/store/" + store.id,
    state: { store: JSON.parse(JSON.stringify(store)) },
  });
}
async function getNextDoc() {
  if (!isEnd.value) {
    let tempResult = await getStoreLandingInfoByField(
      lastVisible.value,
      "location",
      location.value
    );
    tempResult.docs.map((ele, index) => {
      const data = ele.data() as IStoreLanding;
      data.id = ele.id;
      tempAllStore.value.push(data);
    });
    lastVisible.value = tempResult.docs[tempResult.docs.length - 1];
    if (tempResult.docs.length != 30) {
      isEnd.value = true;
    }
  }
}
function locationBlur(tempLoc: string) {
  if (tempLoc.length > 20) {
    return [tempLoc.substring(0, 16), tempLoc.substring(16, tempLoc.length)];
  }
  return [tempLoc];
}
</script>

<template>
  <main class="customWidth px-2 overflow-auto" id="scrollEle">
    <div class="custom_shadow pb-4">
      <div class="flex justify-center relative py-4">
        <div class="flex absolute left-0">
          <router-link to="/">
            <img src="@/assets/img/icon/backword.svg" />
          </router-link>
        </div>

        <span class="text-lg">수제 케이크</span>
        <div class="flex absolute right-0">
          <router-link to="/search" class="mr-2 w-7 my-auto">
            <img src="@/assets/img/icon/search.svg" class="" />
          </router-link>
          <router-link to="/search" class="mr-2 w-7 my-auto">
            <img src="@/assets/img/icon/shoppingCart.svg" class="" />
          </router-link>
        </div>
      </div>

      <a
        href="https://www.instagram.com/chuuka.official/"
        target="_blank"
        class="h-14"
        ><img
          src="@/assets/img/banner/banner.png"
          class="rounded-md mt-3 h-14 w-full object-cover"
      /></a>
      <button
        @click="onlickLocation(location)"
        class="flex text-base w-full border border-tgray-400 rounded-md px-2 py-1 mt-3"
      >
        <img src="@/assets/img/icon/location.svg" class="w-3 my-auto" />
        <div class="ml-3">{{ location }}</div>
      </button>
    </div>
    <div class="mt-5">
      <div
        v-for="(store, index) in tempAllStore"
        :key="index"
        class="border-b border-tgray-200 mb-2 flex pb-2"
        @click="onClickEachStore(store)"
      >
        <img
          v-if="store.profileImage != undefined"
          :src="store.profileImage.link"
          class="w-1/4 rounded-lg border object-cover thumnail"
          @error="getImgUrl"
        />
        <img
          v-else
          src="@/assets/img/default/chuuka.png"
          class="w-1/4 rounded-lg border object-cover thumnail"
          @error="getImgUrl"
        />
        <div class="text-left">
          <div class="py-1.5 px-3">
            <div class="flex text-base font-semibold">
              <img src="@/assets/img/icon/storeIcon.svg" class="w-5" /><span
                class="ml-1.5 text-base"
                >{{ store.name }}</span
              >
            </div>
            <div class="text-tgray-600 text-xs mt-2">
              <span>{{ locationBlur(store.location)[0] }}</span
              ><span
                class="customBlur"
                v-if="locationBlur(store.location).length === 2"
              >
                {{ locationBlur(store.location)[1].substring(0, 4) }}</span
              >
            </div>
            <p class=" "></p>
            <div class="flex mt-2">
              <div
                v-for="(hashTag, index) in store.hashTags"
                :key="index"
                class="custom_textsize border border-color-main px-1.5 py-0.5 rounded-md mr-1.5"
              >
                #{{ hashTag }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-tgray-400 text-base mb-2" v-show="isEnd">
      더 이상의 업체가 없습니다.
    </div>
  </main>
</template>

<style>
.thumnail {
  aspect-ratio: 1 / 1;
}
.custom_shadow {
  box-shadow: 0 4px 2px -1px rgba(0, 0, 0, 0.1);
}
.custom_textsize {
  font-size: 10px;
}
.logo {
  font-style: italic;
  font-family: "Montserrat", sans-serif;
}
.customBlur {
  background: linear-gradient(to right, rgb(82, 82, 82), #b0b0b0);
  color: transparent;
  -webkit-background-clip: text;
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
