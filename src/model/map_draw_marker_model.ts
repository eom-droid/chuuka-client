import { MarkerModel } from "@/model/marker_model";
import { PlaceModel } from "@/model/place_model";

export interface IMapDrawMarker {
  place: PlaceModel | null;
  naverMarker: naver.maps.Marker;
  marker: MarkerModel;
  // undefined : 정보 없음
  // true : 영업중
  // false : 영업종료
  isOpen?: boolean;
}
