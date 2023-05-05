import {
  MarkerBaseModel,
  MarkersWithUpdateTimeModel,
} from "@/model/marker_model";
import { MarkerService } from "@/service/marker_service";
import { defineStore } from "pinia";
import { daysBetween } from "@/utils/moment";
import { MARKERS_FETCH_DATE_LIMIT_DAYS } from "@/constant/localstorage_constant";
import { ArticleModel } from "@/model/article_model";
import { ArticleService } from "@/service/article_service";

// 이 부분도 엄청 고민이 길었음

export const useArticleStore = defineStore({
  id: "article",
  state: () => ({
    _articles: [] as Array<ArticleModel>,
    isInitialized: false,
  }),

  actions: {
    async initialize(): Promise<void> {
      if (!this.isInitialized) {
        this._articles = await _initialize();
        this.isInitialized = true;
      }
    },
    async getArticleByDocId(docId: string): Promise<ArticleModel | undefined> {
      // return this._articles.find((ele) => ele.id === docId) as ArticleModel;
      var findData = this._articles.find((ele) => ele.id === docId);
      if (findData !== undefined) {
        return findData;
      }
      var fetchedData = await ArticleService.fetchSingleArticleFromDB(docId);
      if (fetchedData !== null) {
        return fetchedData;
      } else {
        return undefined;
      }
    },
  },
  getters: {
    getArticles: async (state) => {
      if (state.isInitialized === false) {
        state.isInitialized = true;
        state._articles = await _initialize();
      }
      return state._articles;
    },
  },
});

async function _initialize(): Promise<Array<ArticleModel>> {
  var result = await ArticleService.fetchArticlesFromDB();
  if (result !== null) {
    return result;
  } else {
    return [];
  }
}
