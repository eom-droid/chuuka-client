import { GeoPoint, Timestamp } from "firebase/firestore";
import { PlaceArticleModel } from "./place_model";
import { ImageModel } from "./place/image_model";

/**
 * 노트
 * ArticleDetail을 PlaceArticle에 포함시키지 않은 이유 : 동일 가게에 대해서 여러개의 Article을 작성할 수 있기 때문
 */
export class ArticleModel implements IArticle {
  id: string;
  title: string;
  content: string;
  preface: string;
  hashTags: Array<string>;
  mapCenter: GeoPoint;
  zoomLevel: number;
  details: Array<ArticleDetailModel>;

  modUser?: string;
  regDTime?: Timestamp;
  modDTime?: Timestamp;

  constructor({
    id,
    title,
    content,
    preface,
    hashTags,
    mapCenter,
    zoomLevel,
    details,
    modUser,
    regDTime,
    modDTime,
  }: IArticle) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.preface = preface;
    this.hashTags = hashTags;
    this.mapCenter = mapCenter;
    this.details = details;
    this.zoomLevel = zoomLevel;

    this.modUser = modUser;
    this.regDTime = regDTime;
    this.modDTime = modDTime;
  }

  static fromJson(json: IArticle): ArticleModel {
    return new ArticleModel({
      id: json.id,
      title: json.title,
      content: json.content,
      preface: json.preface,
      hashTags: json.hashTags,
      mapCenter: json.mapCenter,
      details:
        json.details != undefined
          ? json.details.map((detail: ArticleDetailModel) =>
              ArticleDetailModel.fromJson(detail)
            )
          : [],

      zoomLevel: json.zoomLevel,

      modUser: json.modUser,
      regDTime: json.regDTime,
      modDTime: json.modDTime,
    });
  }

  toJson(): Object {
    return {
      title: this.title,
      content: this.content,
      preface: this.preface,
      hashTags: this.hashTags,
      mapCenter: this.mapCenter,
      zoomLevel: this.zoomLevel,
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
  content: string;
  preface: string;
  hashTags: Array<string>;
  details: Array<ArticleDetailModel>;
  mapCenter: GeoPoint;
  zoomLevel: number;
  modUser?: string;
  regDTime?: Timestamp;
  modDTime?: Timestamp;
}

export class ArticleDetailModel implements IArticleDetail {
  public header: string;
  public content: string;
  public images: Array<ImageModel>;
  public placeId: string;

  constructor({ header, content, images, placeId }: IArticleDetail) {
    this.header = header;
    this.content = content;
    this.images = images;
    this.placeId = placeId;
  }

  static fromJson(json: IArticleDetail): ArticleDetailModel {
    return new ArticleDetailModel({
      header: json.header,
      content: json.content,
      images:
        json.images != undefined
          ? json.images.map((image: ImageModel) => ImageModel.fromJson(image))
          : [],
      placeId: json.placeId,
    });
  }

  toJson(): Object {
    var result = {
      header: this.header,
      content: this.content,
      images: this.images.map((image: ImageModel) => image.toJson()),
      place: "",
      placeId: this.placeId,
    };

    return result;
  }
  // copyWith(): ArticleDetailModel {
  //   return new ArticleDetailModel({
  //     header: this.header,
  //     content: this.content,
  //     images: this.images,
  //     place: this.place,
  //   });
  // }
}

export interface IArticleDetail {
  header: string;
  content: string;
  images: Array<ImageModel>;
  placeId: string; // maybe place_article_model
}
