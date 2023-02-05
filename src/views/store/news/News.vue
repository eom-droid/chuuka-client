<script setup lang="ts">
import { getAllNews, INews } from "@/api/m1/news";
import { useNewsStore } from "@/stores/news";
import { useStoreInfoStore } from "@/stores/storeInfo";
import { storeToRefs } from "pinia";
import { ref, onMounted, onUnmounted, onUpdated } from "vue";
import { throttle } from "lodash";
import { router } from "@/router/router";
import NewsCard from "@/components/news/NewsCard.vue";

const pinia = useStoreInfoStore();
const piniaNews = useNewsStore();
const { getNews, getInitStoreId, getSavedTop } = storeToRefs(piniaNews);
const { getStoreInfo } = storeToRefs(pinia);
const { setInitStoreId, setNews, setSelectedNews, setSavedTop } = piniaNews;
const isLoading = ref(true);
const listnerFunc = throttle(scrollFunc, 300);
const newsArray = ref([] as INews[]);

onMounted(async () => {
  document
    .getElementById("mainWrapper")
    ?.addEventListener("scroll", listnerFunc);
  window.addEventListener("scroll", listnerFunc);
  init();
  newsArray.value = await getAllNews(getStoreInfo.value.id);
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

<template>
  <div class="text-left my-3 whitespace-pre-line grid gap-3 text-sm">
    <img
      src="@/assets/gif/loadingIcon.gif"
      v-if="isLoading"
      class="w-40 mx-auto"
    />

    <div v-for="ele in newsArray" class="cursor-pointer">
      <div class="border-t border-mid-gray w-full bg-light-gray h-1.5"></div>
      <div class="mt-4">
        <span class="ml-4">{{ ele.modDtime.toDate().toLocaleString() }}</span>
        <NewsCard
          :title="ele.title"
          :content="ele.content"
          :og-image="ele.openGraph.ogImage"
          :og-title="ele.openGraph.ogTitle"
          :ogDescription="ele.openGraph.ogDescription"
        />
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
