<script setup lang="ts">
import { throttle } from "lodash";
import {
  getStoreInfoWithLimit,
  IStore,
  getStoreInfoByField,
} from "@/api/m1/store";
import {
  ref,
  onMounted,
  getCurrentInstance,
  onUnmounted,
  onActivated,
} from "vue";
import defaultImg from "@/assets/img/logo/chuuka.png";
import { router } from "@/router/router";

const tempAllStore = ref([] as Array<IStore>);
const location = ref("");
const lastVisible = ref(null as any);
const isEnd = ref(false);
const isRunning = ref(false);
const savedScrollHeight = ref(0);

//@ts-ignore
const { proxy } = getCurrentInstance();
const emitter = proxy.$emitter;

onMounted(() => {
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
  let tempLoc = window.localStorage.getItem("location");

  if (document.getElementById("scrollEle") != null) {
    //@ts-ignore
    document.getElementById("scrollEle").scrollTop = savedScrollHeight.value;
  }
  if (tempLoc != null && location.value != tempLoc) {
    // 적용하기로 나온경우 && 다른 선택을 했을 시
    location.value = tempLoc;
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
    tempResult = await getStoreInfoWithLimit(lastVisible.value);
  } else {
    tempResult = await getStoreInfoByField(
      lastVisible.value,
      "location",
      location.value
    );
  }
  tempResult.docs.map((ele) => {
    let data = ele.data() as IStore;
    data.id = ele.id;
    tempAllStore.value.push(data);
  });
  lastVisible.value = tempResult.docs[tempResult.docs.length - 1];
  tempAllStore.value.sort(() => Math.random() - 0.5);
  if (tempResult.docs.length != 20) {
    isEnd.value = true;
  }
}

function getImgUrl(e: any) {
  e.target.src = defaultImg;
}

function initLocation() {
  let tempLoc = window.localStorage.getItem("location");
  if (tempLoc != null) {
    location.value = tempLoc;
  } else {
    location.value = "지역 전체";
  }
}

function onlickLocation(location: string) {
  if (location === "지역 전체") {
    router.push({ name: "location" });
  } else {
    router.push({ name: "location" });
  }
}

function onClickEachStore(store: IStore) {
  window.localStorage.setItem("tempStoreInfo", JSON.stringify(store));
  router.push("/store/" + store.id);
}
async function getNextDoc() {
  if (!isEnd.value) {
    let tempResult = await getStoreInfoByField(
      lastVisible.value,
      "location",
      location.value
    );
    tempResult.docs.map((ele, index) => {
      const data = ele.data() as IStore;
      data.id = ele.id;
      tempAllStore.value.push(data);
    });
    lastVisible.value = tempResult.docs[tempResult.docs.length - 1];
    if (tempResult.docs.length != 20) {
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
      <div class="mt-4 text-lg font-bold logo">CHUUKA!</div>
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
        class="flex text-base w-full border border-tgray-400 rounded-md px-2 py-1 mt-3 h-8"
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
          class="imgWidth rounded-lg border object-cover thumnail"
          @error="getImgUrl"
        />
        <img
          v-else
          src="@/assets/img/default/chuuka.png"
          class="imgWidth rounded-lg border object-cover thumnail"
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
.imgWidth {
  width: 28%;
}
</style>
