import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { INews } from "@/api/m1/news";

export const useNewsStore = defineStore("news", () => {
  const news = ref([] as INews[]);
  const initStoreId = ref("");
  //   const doubleCount = computed(() => count.value * 2);
  const getNews = computed(() => {
    return news.value;
  });
  const getInitStoreId = computed(() => {
    return initStoreId.value;
  });
  function setInitStoreId(newValue: string) {
    initStoreId.value = newValue;
  }
  function setNews(newValue: INews[]) {
    news.value = newValue;
  }

  return {
    getNews,
    setNews,
    setInitStoreId,
    getInitStoreId,
  };
});
