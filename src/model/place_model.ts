import { GeoPoint, Timestamp } from "firebase/firestore";
import { OpenCloseHourModel } from "@/model/place/open_close_hour_model";
import { LocationUrlModel } from "@/model/place/location_url_model";
import { SnsModel } from "@/model/place/sns_model";

export interface IPlaceBase {
  id: string;
  name: string;
  address: string;
  geoCoord: GeoPoint;
  category: string;
  isArticle?: boolean;

  modDTime?: Timestamp;
  regDTime?: Timestamp;
  modUser?: string;
}
export class PlaceBaseModel implements IPlaceBase {
  id: string;
  name: string;
  address: string;
  geoCoord: GeoPoint;
  category: string;
  isArticle?: boolean;

  modUser?: string;
  regDTime?: Timestamp;
  modDTime?: Timestamp;

  constructor({
    id,
    name,
    address,
    geoCoord,
    category,
    isArticle,

    modDTime,
    regDTime,
    modUser,
  }: IPlaceBase) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.geoCoord = geoCoord;
    this.category = category;
    this.isArticle = isArticle;

    this.modUser = modUser;
    this.regDTime = regDTime;
    this.modDTime = modDTime;
  }

  static fromJson(json: IPlaceBase): PlaceBaseModel {
    return new PlaceBaseModel({
      id: json.id,
      name: json.name,
      address: json.address,
      geoCoord: json.geoCoord,
      category: json.category,
      isArticle: json.isArticle,

      modUser: json.modUser,
      regDTime: json.regDTime,
      modDTime: json.modDTime,
    });
  }

  toJson(): Object {
    return {
      name: this.name,
      address: this.address,
      geoCoord: this.geoCoord,
      category: this.category,
      isArticle: this.isArticle,

      modUser: this.modUser,
      regDTime: this.regDTime,
      modDTime: this.modDTime,
    };
  }
}

export interface IPlaceArticle extends IPlaceBase {
  articleId: string;
}

export class PlaceArticleModel extends PlaceBaseModel implements IPlaceArticle {
  public articleId: string;

  constructor({
    id,
    name,
    address,
    geoCoord,
    category,
    articleId,

    modUser,
    regDTime,
    modDTime,
  }: IPlaceArticle) {
    super({
      id,
      name,
      address,
      geoCoord,
      category,
      isArticle: true,

      modUser,
      regDTime,
      modDTime,
    });
    this.articleId = articleId;
  }

  static fromJson(json: IPlaceArticle): PlaceArticleModel {
    return new PlaceArticleModel({
      id: json.id,
      name: json.name,
      address: json.address,
      geoCoord: json.geoCoord,
      category: json.category,
      articleId: json.articleId,

      modUser: json.modUser,
      regDTime: json.regDTime,
      modDTime: json.modDTime,
    });
  }

  toJson(): Object {
    const obj = super.toJson() as any;
    obj.articleId = this.articleId;
    return obj;
  }
}

interface IPlace extends IPlaceBase {
  sns: SnsModel;
  telephone: string;
  locationUrl: LocationUrlModel;
  openCloseHours: OpenCloseHourModel;
}

export class PlaceModel extends PlaceBaseModel implements IPlace {
  public sns: SnsModel;
  public telephone: string;
  public locationUrl: LocationUrlModel;
  public openCloseHours: OpenCloseHourModel;

  constructor({
    id,
    name,
    sns,
    telephone,
    address,
    locationUrl,
    geoCoord,
    openCloseHours,
    category,
    modUser,
    regDTime,
    modDTime,
  }: IPlace) {
    super({
      id,
      name,
      address,
      geoCoord,
      category,
    });
    this.sns = sns;
    this.telephone = telephone;
    this.locationUrl = locationUrl;
    this.openCloseHours = openCloseHours;
    this.modUser = modUser;
    this.regDTime = regDTime;
    this.modDTime = modDTime;
  }

  static fromJson(json: IPlace): PlaceModel {
    return new PlaceModel({
      id: json.id,
      name: json.name,
      sns: SnsModel.fromJson(json.sns),
      telephone: json.telephone,
      address: json.address,
      locationUrl: LocationUrlModel.fromJson(json.locationUrl),
      geoCoord: json.geoCoord,
      openCloseHours: OpenCloseHourModel.fromJson(json.openCloseHours),
      category: json.category,
      modUser: json.modUser,
      regDTime: json.regDTime,
      modDTime: json.modDTime,
    });
  }

  // Firebase에 직접 저장할 경우에는 Json으로 변환해야되는데
  // 이때 Timestamp나 GeoPoint또한 map으로 변환되어 버림
  // 그래서 직접 변환해줘야함
  toJson(): Object {
    const obj = super.toJson() as any;
    obj.sns = this.sns.toJson();
    obj.telephone = this.telephone;
    obj.locationUrl = this.locationUrl.toJson();
    obj.openCloseHours = this.openCloseHours.toJson();
    return obj;
  }
}

export interface IPlaceCake extends IPlace {
  theDayOrderAble?: boolean;
}

export class PlaceCakeModel extends PlaceModel implements IPlaceCake {
  theDayOrderAble?: boolean;

  constructor({
    id,
    name,
    sns,
    telephone,
    address,
    locationUrl,
    geoCoord,
    openCloseHours,
    category,
    modUser,
    regDTime,
    modDTime,

    theDayOrderAble,
  }: IPlaceCake) {
    super({
      id,
      name,
      sns,
      telephone,
      address,
      locationUrl,
      geoCoord,
      openCloseHours,
      category,
      modUser,
      regDTime,
      modDTime,
    });
    this.theDayOrderAble = theDayOrderAble;
  }

  static fromJson(json: IPlaceCake): PlaceCakeModel {
    return new PlaceCakeModel({
      id: json.id,
      name: json.name,

      address: json.address,
      geoCoord: json.geoCoord,

      category: json.category,
      modUser: json.modUser,
      regDTime: json.regDTime,
      modDTime: json.modDTime,

      sns: SnsModel.fromJson(json.sns),
      telephone: json.telephone,
      locationUrl: LocationUrlModel.fromJson(json.locationUrl),
      openCloseHours: OpenCloseHourModel.fromJson(json.openCloseHours),

      theDayOrderAble: json.theDayOrderAble,
    });
  }

  // Firebase에 직접 저장할 경우에는 Json으로 변환해야되는데
  // 이때 Timestamp나 GeoPoint또한 map으로 변환되어 버림
  // 그래서 직접 변환해줘야함
  toJson(): Object {
    const obj = super.toJson() as any;
    obj.theDayOrderAble = this.theDayOrderAble;
    return obj;
  }
}
