import { GeoPoint, Timestamp } from "firebase/firestore";
import { OpenCloseHoursModel } from "@/model/place/open_close_hours_model";
import { LocationUrlModel } from "@/model/place/location_url_model";
import { SnsModel } from "@/model/place/sns_model";

export class PlaceModel implements IPlace {
  public id: string;
  public name: string;
  public sns: SnsModel;
  public telephone: string;
  public address: string;
  public locationUrl: LocationUrlModel;
  public geoCoord: GeoPoint;
  public openCloseHours: OpenCloseHoursModel;
  public category: string;

  public modUser?: string;
  public regDTime?: Timestamp;
  public modDTime?: Timestamp;

  constructor({
    id,
    name,
    sns,
    telephone,
    address,
    locationUrl,
    geoCoord,
    openCloseHours,
    modUser,
    category,
    regDTime,
    modDTime,
  }: IPlace) {
    this.id = id;
    this.name = name;
    this.sns = sns;
    this.telephone = telephone;
    this.address = address;
    this.locationUrl = locationUrl;
    this.geoCoord = geoCoord;
    this.openCloseHours = openCloseHours;
    this.category = category;
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
      openCloseHours: OpenCloseHoursModel.fromJson(json.openCloseHours),
      category: json.category,
      modUser: json.modUser,
      regDTime: json.regDTime,
      modDTime: json.modDTime,
    });
  }
  toFirebaseJson() {
    // Firebase에 직접 저장할 경우에는 Json으로 변환해야되는데
    // 이때 Timestamp나 GeoPoint또한 map으로 변환되어 버림
    // 그래서 직접 변환해줘야함
    let result = {
      name: this.name,
      sns: this.sns.toJson(),
      telephone: this.telephone,
      address: this.address,
      locationUrl: this.locationUrl.toJson(),
      geoCoord: this.geoCoord,
      openCloseHours: this.openCloseHours.toJson(),
      category: this.category,
      modUser: this.modUser,
      regDTime: this.regDTime,
      modDTime: this.modDTime,
    } as IPlace;

    return result;
  }
}

export interface IPlace {
  id: string;
  name: string;
  sns: SnsModel;
  telephone: string;
  address: string;
  locationUrl: LocationUrlModel;
  geoCoord: GeoPoint;
  openCloseHours: OpenCloseHoursModel;
  category: string;
  modUser?: string;
  regDTime?: Timestamp;
  modDTime?: Timestamp;
}
