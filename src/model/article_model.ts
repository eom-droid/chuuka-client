import { GeoPoint, Timestamp } from "firebase/firestore";
import { OpenCloseHourModel } from "@/model/place/open_close_hour_model";
import { LocationUrlModel } from "@/model/place/location_url_model";
import { SnsModel } from "@/model/place/sns_model";
import { PlaceArticleModel, PlaceBaseModel, PlaceModel } from "./place_model";
import { ImageModel } from "./place/image_model";

/**
 * 노트
 * ArticleDetail을 PlaceArticle에 포함시키지 않은 이유 : 동일 가게에 대해서 여러개의 Article을 작성할 수 있기 때문
 */
export class ArticleModel implements IArticle {
  id: string;
  title: string;
  hashTags: Array<string>;
  mapCenter: GeoPoint;
  details: Array<ArticleDetailModel>;

  modUser?: string;
  regDTime?: Timestamp;
  modDTime?: Timestamp;

  constructor({
    id,
    title,
    hashTags,
    mapCenter,
    details,
    modUser,
    regDTime,
    modDTime,
  }: IArticle) {
    this.id = id;
    this.title = title;
    this.hashTags = hashTags;
    this.mapCenter = mapCenter;
    this.details = details;

    this.modUser = modUser;
    this.regDTime = regDTime;
    this.modDTime = modDTime;
  }

  static fromJson(json: IArticle): ArticleModel {
    return new ArticleModel({
      id: json.id,
      title: json.title,
      hashTags: json.hashTags,
      mapCenter: json.mapCenter,
      details:
        json.details != undefined
          ? json.details.map((detail: ArticleDetailModel) =>
              ArticleDetailModel.fromJson(detail)
            )
          : [],

      modUser: json.modUser,
      regDTime: json.regDTime,
      modDTime: json.modDTime,
    });
  }

  toJson(): Object {
    return {
      title: this.title,
      hashTags: this.hashTags,
      mapCenter: this.mapCenter,
      details: this.details.map((detail: ArticleDetailModel) =>
        detail.toJson()
      ),

      modUser: this.modUser,
      regDTime: this.regDTime,
      modDTime: this.modDTime,
    };
  }
}

export interface IArticle {
  id: string;
  title: string;
  hashTags: Array<string>;
  details: Array<ArticleDetailModel>;
  mapCenter: GeoPoint;
  modUser?: string;
  regDTime?: Timestamp;
  modDTime?: Timestamp;
}

export class ArticleDetailModel implements IArticleDetail {
  public header: string;
  public content: string;
  public images: Array<ImageModel>;
  public place: PlaceArticleModel | string; // maybe place_article_model

  constructor({ header, content, images, place }: IArticleDetail) {
    this.header = header;
    this.content = content;
    this.images = images;
    this.place = place;
  }

  static fromJson(json: IArticleDetail): ArticleDetailModel {
    return new ArticleDetailModel({
      header: json.header,
      content: json.content,
      images:
        json.images != undefined
          ? json.images.map((image: ImageModel) => ImageModel.fromJson(image))
          : [],
      place:
        typeof json.place === "string"
          ? json.place
          : PlaceArticleModel.fromJson(json.place),
    });
  }

  toJson(): Object {
    var result = {
      header: this.header,
      content: this.content,
      images: this.images.map((image: ImageModel) => image.toJson()),
      place: "",
    };
    if (typeof this.place === "string") {
      result.place = this.place;
    } else {
      result.place = this.place.id;
    }

    return result;
  }
  copyWith(): ArticleDetailModel {
    return new ArticleDetailModel({
      header: this.header,
      content: this.content,
      images: this.images,
      place: this.place,
    });
  }
}

export interface IArticleDetail {
  header: string;
  content: string;
  images: Array<ImageModel>;
  place: PlaceArticleModel | string; // maybe place_article_model
}
