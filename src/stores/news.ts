import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { INews } from "@/api/m1/news";

export const useNewsStore = defineStore("news", () => {
  const news = ref([] as INews[]);
  const selectedNews = ref({} as INews);
  const initStoreId = ref("");
  //   const doubleCount = computed(() => count.value * 2);
  const getNews = computed(() => {
    return news.value;
  });
  function setNews(newValue: INews[]) {
    news.value = newValue;
  }
  const getInitStoreId = computed(() => {
    return initStoreId.value;
  });
  function setInitStoreId(newValue: string) {
    initStoreId.value = newValue;
  }
  const getSelectedNews = computed(() => {
    return selectedNews.value;
  });
  function setSelectedNews(newValue: INews) {
    selectedNews.value = newValue;
  }

  return {
    getNews,
    setNews,
    setInitStoreId,
    getInitStoreId,
    getSelectedNews,
    setSelectedNews,
  };
});
