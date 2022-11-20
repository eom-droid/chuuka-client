<template>
  <main class="overflow-auto overflow-x-hidden w-full noScroll font-medium">
    <div class="text-left m-3 whitespace-pre-line grid gap-3 text-sm">
      <img src="@/assets/gif/loadingIcon.gif" v-if="isLoading" class="w-40" />
      <div v-else>
        <div v-if="getSelectedNews.id != undefined" class="h-90v relative">
          <div class="relative flex mt-3">
            <img
              src="@/assets/img/icon/backword.svg"
              class="fixed w-6 hover:cursor-pointer"
              @click="onClickBack()"
            />
            <span class="text-xl mx-auto">일정/소식</span>
          </div>
          <div class="mt-8 flex flex-col noScroll overflow-auto customHeight">
            <p class="text-xl">{{ getSelectedNews.title }}</p>
            <p class="text-sm text-text-gray mt-2.5">
              {{ getKoreanDateTime(getSelectedNews.modDtime.toDate()) }}
            </p>
            <div
              v-if="
                getSelectedNews.photos != undefined &&
                getSelectedNews.photos.length >= 1 &&
                getSelectedNews.photos[0].link != ''
              "
              class="mt-5 border border-mid-gray"
            >
              <div v-if="getSelectedNews.photos.length === 1">
                <img
                  :src="getSelectedNews.photos[0].link"
                  class="w-full h-25v object-contain"
                />
              </div>
              <div v-else>
                <vueper-slides class="no-shadow" fixed-height="25vh">
                  <vueper-slide
                    v-for="(slide, i) in getSelectedNews.photos"
                    :key="i"
                  >
                    <template #content>
                      <img
                        :src="slide.link"
                        class="object-contain h-25v mx-auto"
                      />
                    </template>
                  </vueper-slide>
                </vueper-slides>
                <!-- <div
                  v-for="(eachImg, index) in getSelectedNews.photos"
                  :key="index"
                >
                  <img
                    :src="eachImg.link"
                    class="w-full h-25v object-contain"
                  />
                </div> -->
              </div>
            </div>
            <div class="whitespace-pre-line text-sm mt-5">
              {{ getSelectedNews.content }}
            </div>
          </div>
          <button
            class="w-full bg-main rounded text-white font-bold py-3 text-xl absolute -bottom-10"
          >
            카카오 채널 상담하기
          </button>
        </div>
        <div v-else>
          <span class="mt-4 text-lg font-bold logo">CHUUKA</span>
          <div class="mt-20">해당 게시물이 없습니다.</div>
          <button
            class="instagram inline-block align-bottom"
            @click="onClickHome()"
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { getAllNews, INews, getNewsById } from "@/api/m1/news";
import { useNewsStore } from "@/stores/news";
import { useStoreInfoStore } from "@/stores/storeInfo";
import { getKoreanDateTime } from "@/utils/moment";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { router } from "@/router/router";
import { getStoreInfoById } from "@/api/m1/store";
//@ts-ignore
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

const pinia = useStoreInfoStore();
const piniaNews = useNewsStore();
const { getSelectedNews } = storeToRefs(piniaNews);
const { getStoreInfo } = storeToRefs(pinia);
const { setStoreInfo } = pinia;
const { getInitStoreId, setInitStoreId, setNews, setSelectedNews } = piniaNews;
const isLoading = ref(true);

onMounted(() => {
  init();
});
async function init() {
  if (getInitStoreId === getStoreInfo.value.id) {
    isLoading.value = false;
    return;
  }
  isLoading.value = true;
  let tempPath = document.location.pathname.split("/");
  if (tempPath.length >= 5) {
    let storeId = tempPath[2];
    let newsId = tempPath[4];
    let tempStore = await getStoreInfoById(storeId);
    if (tempStore != null) {
      setStoreInfo(tempStore);
      let tempNews = await getNewsById(storeId, newsId);
      setSelectedNews(tempNews);
    }
  }
  isLoading.value = false;
}

function onClickHome() {
  if (getStoreInfo.value.id != undefined) {
    router.push("/store/" + getStoreInfo.value.id + "/news");
  } else {
    router.push("/");
  }
}

function onClickBack() {
  router.push("/store/" + getStoreInfo.value.id + "/news");
}
</script>
<style>
.noScroll::-webkit-scrollbar {
  display: none;
}
.noscroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 448px) {
  .custom-width {
    width: 100vw;
  }
}
@media (min-width: 448px) {
  .custom-width {
    width: 448px;
  }
}

.customHeight {
  height: 79vh;
}

.tempSit {
  background-size: contain;
}
</style>
