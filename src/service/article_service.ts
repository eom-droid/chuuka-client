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
}
