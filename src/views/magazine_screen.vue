<template>
  <main
    class="w-full h-full"
    :style="
      getSafeAreaInsets.top !== 0
        ? `padding-top:${getSafeAreaInsets.top}px;`
        : ''
    "
  >
    <div class="flex flex-col h-full">
      <top_menu_bar class="mt-4"></top_menu_bar>
      <div v-if="isLoading" class="m-auto">
        <img src="@/assets/gif/loadingIcon_croped.gif" class="w-1/12 m-auto" />
      </div>

      <div class="mx-4 h-full" v-else>
        <div>
          <div v-for="(article, index) in articles">
            <router-link :to="'/magazine/' + article.id">
              <magazine_card
                :thumnail="article.details[0].images[0].link"
                :title="article.title"
                :hash-tag="article.hashTags"
                :content="article.details[0].content"
                :key="index"
                class="pt-4"
              ></magazine_card>
            </router-link>
          </div>
          <div class="m-auto py-10" v-if="articles.length !== 0">
            <img src="@/assets/img/icon/calendar_x.svg" class="m-auto" />
            <p class="text-base font-medium text-mid-gray">
              더 이상 내용이 없습니다
            </p>
          </div>
        </div>
        <div v-if="articles.length === 0" class="h-full w-full flex">
          <div class="m-auto">
            <img src="@/assets/img/icon/calendar_x.svg" class="m-auto" />
            <p class="text-base font-medium text-mid-gray">
              더 이상 내용이 없습니다
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import magazine_card from "@/components/magazine/magazine_card.vue";
import top_menu_bar from "@/components/common/top_menu_bar.vue";
import { ArticleModel } from "@/model/article_model";
import { useArticleStore } from "@/store/article_store";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useDefault } from "@/store/default";

//pinia part
const articlesStore = useArticleStore();
const { getArticles } = storeToRefs(articlesStore);
const { initialize } = articlesStore;
const isLoading = ref(true);
const articles = ref([] as ArticleModel[]);

const defaultStore = useDefault();
const { getSafeAreaInsets } = defaultStore;

onMounted(() => {
  init();
});

async function init() {
  await initialize();
  articles.value = await getArticles.value;
  isLoading.value = false;
}
</script>
