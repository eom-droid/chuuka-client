import { GeoPoint } from "firebase/firestore";
import { OpenCloseHoursModel } from "@/model/place/open_close_hours_model";

export class MarkerModel implements IMarker {
  public placeId: string;
  public geoCoord: GeoPoint;
  public openCloseHours: OpenCloseHoursModel;

  constructor({ placeId: placeId, geoCoord, openCloseHours }: IMarker) {
    this.placeId = placeId;
    this.geoCoord = geoCoord;
    this.openCloseHours = openCloseHours;
  }
}

export interface IMarker {
  placeId: string;
  geoCoord: GeoPoint;
  openCloseHours: OpenCloseHoursModel;
}
