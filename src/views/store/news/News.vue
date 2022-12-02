<template>
  <div class="text-left my-3 whitespace-pre-line grid gap-3 text-sm">
    <img
      src="@/assets/gif/loadingIcon.gif"
      v-if="isLoading"
      class="w-40 mx-auto"
    />

    <div
      v-for="(news, index) in getNews"
      :key="news.id"
      class="border border-mid-gray shadow-sm rounded-md px-3 pb-3 pt-2"
      @click="onClickNews(news)"
      v-else
    >
      <div class="text-xs">
        {{ getKoreanDateTime(news.modDtime.toDate()) }}
      </div>
      <div class="mt-1 my-3"><hr /></div>
      <div>
        <div class="text-base font-semibold">{{ news.title }}</div>
        <div
          v-if="
            news.photos != undefined &&
            news.photos.length === 1 &&
            news.photos[0].link != ''
          "
        >
          <div class="w-full border border-mid-gray mt-3">
            <img
              :src="news.photos[0].link"
              class="w-full h-20v object-contain"
            />
          </div>
        </div>
        <div v-if="news.photos != undefined && news.photos.length > 1">
          <div class="flex w-full mt-3 h-20v">
            <div class="w-2/3 border border-mid-gray h-full">
              <img
                :src="news.photos[0].link"
                class="object-contain h-full w-full"
              />
            </div>

            <div class="w-1/3 ml-1 flex flex-col justify-between">
              <div class="mb-1 w-full border border-mid-gray h-1/2">
                <img
                  :src="news.photos[1].link"
                  class="object-contain w-full h-full"
                />
              </div>

              <div
                class="w-full font-medium h-1/2 bg-usual-black opacity-50 text-white text-2xl flex"
              >
                <span class="m-auto"> +{{ news.photos.length - 2 }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="text-sm mt-3 tracking-tighter leading-tight">
          {{ cutLine(news.content) }}
          <br />
          <button class="text-text-gray" v-show="countLine(news.content) >= 2">
            ...더보기
          </button>
        </div>
      </div>
    </div>

    <div
      class="mt-5 text-neutral-500 text-center text-base"
      v-if="getNews.length <= 0"
    >
      일정/소식이 없습니다.
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAllNews, INews } from "@/api/m1/news";
import { useNewsStore } from "@/stores/news";
import { useStoreInfoStore } from "@/stores/storeInfo";
import { getKoreanDateTime } from "@/utils/moment";
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted, onUpdated } from "vue";
import { throttle } from "lodash";
import { router } from "@/router/router";
import { connectStorageEmulator } from "@firebase/storage";

const pinia = useStoreInfoStore();
const piniaNews = useNewsStore();
const { getNews, getInitStoreId, getSavedTop } = storeToRefs(piniaNews);
const { getStoreInfo } = storeToRefs(pinia);
const { setInitStoreId, setNews, setSelectedNews, setSavedTop } = piniaNews;
const isLoading = ref(true);
const listnerFunc = throttle(scrollFunc, 300);

onMounted(() => {
  document
    .getElementById("mainWrapper")
    ?.addEventListener("scroll", listnerFunc);
  window.addEventListener("scroll", listnerFunc);
  init();
});

onUpdated(() => {
  if (getInitStoreId.value === getStoreInfo.value.id) {
    setScroll();
  }
});
onUnmounted(() => {
  document.getElementById("mainWrapper")?.scrollTo(0, 0);
  window.scrollTo(0, 0);
  document
    .getElementById("mainWrapper")
    ?.removeEventListener("scroll", listnerFunc);
  window.removeEventListener("scroll", listnerFunc);
});

function scrollFunc() {
  let scrollTop = document
    .getElementById("storeScrollEle")
    ?.getBoundingClientRect().y;
  if (scrollTop != undefined) {
    setSavedTop(-scrollTop);
  } else {
  }
}

async function init() {
  if (getInitStoreId.value === getStoreInfo.value.id) {
    isLoading.value = false;
    return;
  }
  setSavedTop(0);
  setInitStoreId(getStoreInfo.value.id);
  setNews(await getAllNews(getStoreInfo.value.id));
  isLoading.value = false;
}

function setScroll() {
  // mobile에서는 mainWrapper가 없음
  if (document.getElementById("mainWrapper") != null) {
    //@ts-ignore
    document.getElementById("mainWrapper").scrollTop = getSavedTop.value;
  }
  // mobile scroll
  window.scrollTo(0, getSavedTop.value);
  // event listner 다시 달기
  document
    .getElementById("mainWrapper")
    ?.addEventListener("scroll", listnerFunc);
  window.addEventListener("scroll", listnerFunc);
}

function onClickNews(selectedNews: INews) {
  setSelectedNews(selectedNews);
  router.push("/store/" + getStoreInfo.value.id + "/news/" + selectedNews.id);
}

function countLine(newLine: string) {
  return newLine.split(/\r\n|\r|\n/).length;
}
function cutLine(newLine: string) {
  const cutedLine = newLine.split(/\r\n|\r|\n/);
  if (cutedLine.length === 1) {
    return cutedLine[0];
  } else {
    return cutedLine[0] + cutedLine[1];
  }
}
</script>
