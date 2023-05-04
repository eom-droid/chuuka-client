import { MarkerBaseModel, MarkerModel } from "@/model/marker_model";
import { PlaceBaseModel, PlaceModel } from "@/model/place_model";

export interface IMapDrawMarker {
  place: PlaceBaseModel | null;
  naverMarker: naver.maps.Marker;
  marker: MarkerBaseModel;
  // undefined : 정보 없음
  // true : 영업중
  // false : 영업종료
  isOpen?: boolean;
}
