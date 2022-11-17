<template>
  <div class="text-left m-3 whitespace-pre-line grid gap-3 text-sm">
    <img src="@/assets/gif/loadingIcon.gif" v-if="isLoading" class="w-40" />
    <div
      v-for="(news, index) in getNews"
      :key="index"
      class="border border-mid-gray shadow-sm rounded-md px-3 pb-3 pt-2"
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
          {{ news.content }}
          <br />
          <button class="text-text-gray">...더보기</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getAllNews, INews } from "@/api/m1/news";
import { useNewsStore } from "@/stores/news";
import { useStoreInfoStore } from "@/stores/storeInfo";
import { getKoreanDateTime } from "@/utils/moment";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

const pinia = useStoreInfoStore();
const piniaNews = useNewsStore();
const { getNews } = storeToRefs(piniaNews);
const { getStoreInfo } = pinia;
const { getInitStoreId, setInitStoreId, setNews } = piniaNews;
const isLoading = ref(true);

const sections = {
  orderForm: "주문양식",
  orderMethod: "주문방법",
  sizeAndSheet: "크기/맛",
  notice: "유의사항",
};

onMounted(() => {
  init();
});
async function init() {
  if (getInitStoreId === getStoreInfo.id) {
    isLoading.value = false;
    return;
  }
  let tempNewList = await getAllNews(getStoreInfo.id);
  setInitStoreId(getStoreInfo.id);
  setNews(tempNewList);
  isLoading.value = false;
}
</script>
