<script setup lang="ts">
import { throttle } from "lodash";
import {
  getStoreInfoWithLimit,
  IStore,
  getStoreInfoByField,
} from "@/api/m1/store";
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from "vue";
import defaultImg from "@/assets/img/logo/chuuka.png";
import { router } from "@/router/router";
import { useStoreInfoStore } from "@/stores/storeInfo";
import { getEventListeners } from "events";

const pinia = useStoreInfoStore();
const { getStoreInfo, setStoreInfo } = pinia;

const tempAllStore = ref([] as Array<IStore>);
const location = ref("");
const lastVisible = ref(null as any);
const isEnd = ref(false);
const isRunning = ref(false);
const savedScrollHeight = ref(0);
const listeningFunc = throttle(calcScrollAndGetDocs, 100);

onMounted(() => {
  init();

  document
    .getElementById("mainWrapper")
    ?.addEventListener("scroll", listeningFunc);
  window.addEventListener("scroll", listeningFunc);
});

async function calcScrollAndGetDocs() {
  if (document.getElementById("homeScrollEle") === null) {
    removeListners();

    return;
  }
  var scrollTop = document
    .getElementById("homeScrollEle")
    ?.getBoundingClientRect().top;
  var wholeHeight = document
    .getElementById("homeScrollEle")
    ?.getBoundingClientRect().height;

  console.log(scrollTop);
  if (scrollTop === undefined || wholeHeight === undefined) return;

  let tempShit = -scrollTop;
  savedScrollHeight.value = tempShit;
  if (!isRunning.value && wholeHeight - tempShit < 2000) {
    isRunning.value = true;
    await initAllStore();
    isRunning.value = false;
  }
}
onActivated(() => {
  let tempLoc = window.localStorage.getItem("location");

  // mobile에서는 mainWrapper가 없음
  if (document.getElementById("mainWrapper") != null) {
    //@ts-ignore
    document.getElementById("mainWrapper").scrollTop = savedScrollHeight.value;
  }
  // mobile scroll
  window.scrollTo(0, savedScrollHeight.value);
  // event listner 다시 달기
  document
    .getElementById("mainWrapper")
    ?.addEventListener("scroll", listeningFunc);
  window.addEventListener("scroll", listeningFunc);

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
  removeListners();
});
onDeactivated(() => {
  removeListners();
});

function removeListners() {
  document.getElementById("mainWrapper")?.scrollTo(0, 0);
  window.scrollTo(0, 0);
  document
    .getElementById("mainWrapper")
    ?.removeEventListener("scroll", listeningFunc);
  window.removeEventListener("scroll", listeningFunc);
}

function init() {
  initLocation();
  initAllStore();
}
const a = ref(0);

async function initAllStore() {
  if (isEnd.value) return;
  let tempResult;
  let mixedResult = [] as Array<IStore>;
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
    mixedResult.push(data);
  });
  // 마지막 doc 저장
  lastVisible.value = tempResult.docs[tempResult.docs.length - 1];
  // 임시에서 sort하고
  mixedResult.sort(() => Math.random() - 0.5);
  // 이어붙이기
  tempAllStore.value = tempAllStore.value.concat(mixedResult);
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

function onClickStore(store: IStore) {
  setStoreInfo(store);
  // window.localStorage.setItem("tempStoreInfo", JSON.stringify(store));
  router.push("/store/" + store.id);
}

function locationBlur(tempLoc: string) {
  if (tempLoc.length > 20) {
    return [tempLoc.substring(0, 16), tempLoc.substring(16, tempLoc.length)];
  }
  return [tempLoc];
}
</script>

<template>
  <main class="x-basic-padding" id="homeScrollEle">
    <div>
      <!-- {{ lastVisible }} -->
      <p class="logo text-lg font-bold py-4">CHUUKA!</p>
      <a
        href="https://www.instagram.com/chuuka.official/"
        target="_blank"
        class="h-14"
        ><img
          src="@/assets/img/banner/banner.png"
          class="rounded-md h-14 w-full object-cover"
      /></a>
      <button
        @click="onlickLocation(location)"
        class="flex text-base w-full border border-neutral-400 rounded-md px-2 py-1 mt-3 h-10"
      >
        <img src="@/assets/img/icon/location.svg" class="w-3 my-auto" />
        <div class="ml-3 my-auto">{{ location }}</div>
      </button>
    </div>

    <div class="mt-3">
      <div
        v-for="(store, index) in tempAllStore"
        :key="index"
        class="border-b border-neutral-200 mb-2 flex pb-2"
        @click="onClickStore(store)"
      >
        <div class="imgContainer" v-if="store.profileImage != undefined">
          <img
            :src="store.profileImage.link"
            class="rounded-lg border object-cover"
            @error="getImgUrl"
          />
        </div>
        <div class="imgContainer" v-else>
          <img
            src="@/assets/img/default/chuuka.png"
            class="rounded-lg border object-cover"
            @error="getImgUrl"
          />
        </div>
        <div class="text-left">
          <div class="py-1.5 px-3">
            <div class="flex text-base font-semibold">
              <img src="@/assets/img/icon/storeIcon.svg" class="w-5" /><span
                class="ml-1.5 text-base"
                >{{ store.name }}</span
              >
            </div>
            <div class="text-neutral-600 text-xs mt-2">
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
                class="custom_textsize border border-main px-1.5 py-0.5 rounded-md mr-1.5"
              >
                #{{ hashTag }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-neutral-400 text-base" v-show="isEnd">
      더 이상의 업체가 없습니다.
    </div>
    <div class="h-28"></div>
  </main>
</template>

<style scoped>
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

.imgContainer {
  position: relative;
  width: 28%; /* The size you want */
  padding: 0;
  margin: 0;
}
.imgContainer::after {
  content: "";
  display: block;
  padding-bottom: 100%; /* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
}

.imgContainer img {
  position: absolute; /* Take your picture out of the flow */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; /* Make the picture taking the size of it's parent */
  width: 100%; /* This if for the object-fit */
  height: 100%; /* This if for the object-fit */
  object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
  object-position: center;
}

main {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  @apply overflow-y-auto
  /* height: 100vh; */;
}
</style>
