<template>
  <main class="font-medium x-basic-padding">
    <div class="text-left whitespace-pre-line grid gap-3 text-sm">
      <img
        src="@/assets/gif/loadingIcon.gif"
        v-if="isLoading"
        class="w-40 mx-auto"
      />
      <div v-else>
        <div v-if="getSelectedNews.id != undefined" class="">
          <div class="relative flex py-4">
            <img
              src="@/assets/img/icon/backword.svg"
              class="absolute w-6 hover:cursor-pointer mt-0.5"
              @click="onClickBack()"
            />
            <span class="text-xl mx-auto">일정/소식</span>
          </div>
          <div class="mt-5">
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
                <vueper-slides class="no-shadow" fixed-height="25vh" fractions>
                  <vueper-slide
                    v-for="(slide, i) in getSelectedNews.photos"
                    :key="i"
                  >
                    <template #content>
                      <div class="w-full">
                        <img
                          :src="slide.link"
                          class="object-contain h-25v mx-auto"
                        />
                      </div>
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
            <div class="whitespace-pre-line text-sm mt-5 font-normal">
              {{ getSelectedNews.content }}
            </div>
          </div>
          <div class="mt-5">
            <a
              class="text-lg justify-center flex btn-main"
              target="_blank"
              :href="
                'https://pf.kakao.com/' + getStoreInfo.sns.kakaoTalk + '/chat'
              "
            >
              <div class="flex my-auto">
                <img src="@/assets/img/icon/kakao.svg" class="w-7 mr-4" />
                <span>카카오 채널 상담하기</span>
              </div>
            </a>
          </div>
        </div>
        <div v-else>
          <span class="mt-4 text-lg font-bold logo">CHUUKA</span>
          <div class="mt-20">해당 게시물이 없습니다</div>
          <button
            class="text-usual-blue inline-block align-bottom"
            @click="onClickHome()"
          >
            돌아가기
          </button>
        </div>
      </div>
    </div>
    <div class="h-28"></div>
  </main>
</template>
<script setup lang="ts">
import { getNewsById } from "@/api/m1/news";
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
const { getInitStoreId, setSelectedNews } = piniaNews;
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

function onClickUrl(url: string | undefined) {
  if (url != undefined) {
    window.open(url, "_blank");
  } else {
  }
}
</script>

<style scoped>
.vueperslides__arrow {
  @apply text-main text-xs;
}
.vueperslides__bullet .default {
  background-color: rgba(0, 0, 0, 0.3);
  border: none;
  box-shadow: none;
  transition: 0.3s;
  width: 8px;
  height: 8px;
}
.vueperslides__bullet {
  margin: 8px 2px;
}

.vueperslides__bullet--active .default {
  @apply bg-main;
}

.vueperslides__bullet span {
  display: block;
  color: #fff;
  font-size: 10px;
  opacity: 0.8;
}

.vueperslides__progress {
  background: rgba(0, 0, 0, 0.25);
  color: #ff5252;
}

.tempSit {
  background-size: contain;
}
</style>
