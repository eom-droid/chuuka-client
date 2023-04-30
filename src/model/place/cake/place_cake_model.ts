import { GeoPoint, Timestamp } from "firebase/firestore";
import { OpenCloseHoursModel } from "@/model/place/open_close_hours_model";
import { LocationUrlModel } from "@/model/place/location_url_model";
import { SnsModel } from "@/model/place/sns_model";
import { IPlace, PlaceModel } from "@/model/place_model";

export interface IPlaceCake extends IPlace {
  theDayOrderAble?: boolean;
}
export class PlaceCakeModel extends PlaceModel {
  public theDayOrderAble?: boolean;

  constructor({
    id,
    name,
    sns,
    telephone,
    address,
    locationUrl,
    geoCoord,
    openCloseHours,
    theDayOrderAble,
    modUser,
    category,
    regDTime,
    modDTime,
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
    var result = new PlaceCakeModel({
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
      theDayOrderAble: json.theDayOrderAble ?? undefined,
    });

    return result;
  }

  toFirebaseJson() {
    // Firebase에 직접 저장할 경우에는 Json으로 변환해야되는데
    // 이때 Timestamp나 GeoPoint또한 map으로 변환되어 버림
    // 그래서 직접 변환해줘야함
    let result = super.toFirebaseJson() as IPlaceCake;
    if (this.theDayOrderAble !== undefined) {
      result.theDayOrderAble = this.theDayOrderAble;
    }
    return result;
  }
}
