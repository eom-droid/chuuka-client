import { NET } from "@/constant/constant";
import { ArticleModel, IArticle } from "@/model/article_model";
import { PlaceCakeModel, IPlaceCake } from "@/model/place_model";
import { firestore } from "@/plugins/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

export class ArticleService {
  static PATH = `/chuuka2/${NET}/article`;

  static async fetchSingleArticleFromDB(
    docId: string
  ): Promise<ArticleModel | null> {
    const query = doc(firestore, this.PATH, docId);
    const snapShot = await getDoc(query);
    if (snapShot.exists()) {
      let article = ArticleModel.fromJson(snapShot.data() as IArticle);
      article.id = snapShot.id;
      return article;
    }
    return null;
  }

  // 추후 pagination 필요
  static async fetchArticlesFromDB(): Promise<Array<ArticleModel> | null> {
    const query = collection(firestore, this.PATH);
    const snapShots = await getDocs(query);

    var result = snapShots.docs.map((ele) => {
      var data = ele.data() as IArticle;
      data.id = ele.id;
      return ArticleModel.fromJson(data);
    });
    return result;
  }

  // static async getArticlesFromLS(): Promise<Array<ArticleModel> | null> {
  //   const articles_localStorage = window.localStorage.getItem(
  //     "articles_localStorage"
  //   );
  //   if (articles_localStorage === null) return null;

  //   const articles = JSON.parse(articles_localStorage) as Array<IArticle>;
  //   let result = articles.map((ele) => ArticleModel.fromJson(ele));
  //   return result;
  // }
}
