import { GeoPoint } from "firebase/firestore";
import { OpenCloseHoursModel } from "@/model/store/open_close_hours_model";

export class MarkerModel implements IMarker {
  public storeId: string;
  public geoCoord: GeoPoint;
  public openCloseHours: OpenCloseHoursModel;

  constructor({ storeId, geoCoord, openCloseHours }: IMarker) {
    this.storeId = storeId;
    this.geoCoord = geoCoord;
    this.openCloseHours = openCloseHours;
  }
}

export interface IMarker {
  storeId: string;
  geoCoord: GeoPoint;
  openCloseHours: OpenCloseHoursModel;
}
