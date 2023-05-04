import { PlaceBaseModel } from "@/model/place_model";

export interface IPlaceWithFetchDate {
  place: PlaceBaseModel;
  fetchDate: string;
}
