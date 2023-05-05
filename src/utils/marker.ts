import { PLACE_CATEGORY } from "@/constant/constant";
import { MarkerBaseModel } from "@/model/marker_model";
import cakeClosedMarker from "@/assets/img/icon/marker/cake_closed_marker.svg";
import cakeOpenMarker from "@/assets/img/icon/marker/cake_open_marker.svg";
import cakeClosedSelectedMarker from "@/assets/img/icon/marker/cake_closed_selected_marker.svg";
import cakeOpenSelectedMarker from "@/assets/img/icon/marker/cake_open_selected_marker.svg";
import placeArticleMarker from "@/assets/img/icon/marker/place_article_marker.svg";
import placeArticleSelectedMarker from "@/assets/img/icon/marker/place_article_selected_marker.svg";

export function renderMarker(
  marker: MarkerBaseModel,
  isOpen?: boolean,
  isSelected: boolean = false
): naver.maps.ImageIcon {
  // 1. is cake place
  if (marker.category === PLACE_CATEGORY.CAKE) {
    // 1-1. 만약에 열었다면?
    if (isOpen) {
      if (isSelected)
        return {
          url: cakeOpenSelectedMarker,
          anchor: new naver.maps.Point(23, 56),
        };
      else
        return {
          url: cakeOpenMarker,
          anchor: new naver.maps.Point(12, 12),
        };
    }

    // 1-2. 만약에 닫았다면?
    else {
      if (isSelected)
        return {
          url: cakeClosedSelectedMarker,
          anchor: new naver.maps.Point(23, 56),
        };
      else
        return {
          url: cakeClosedMarker,
          anchor: new naver.maps.Point(12, 12),
        };
    }
  }
  // 2. is else place
  else {
    if (isSelected)
      return {
        url: placeArticleSelectedMarker,
        anchor: new naver.maps.Point(23, 56),
      };
    else
      return {
        url: placeArticleMarker,
        anchor: new naver.maps.Point(12, 12),
      };
  }
}
