import { PLACE_CATEGORY } from "@/constant/constant";
import { MarkerBaseModel } from "@/model/marker_model";
import cakeClosedMarker from "@/assets/img/icon/marker/cake_closed_marker.svg";
import cakeOpenMarker from "@/assets/img/icon/marker/cake_open_marker.svg";
import cakeClosedSelectedMarker from "@/assets/img/icon/marker/cake_closed_selected_marker.svg";
import cakeOpenSelectedMarker from "@/assets/img/icon/marker/cake_open_selected_marker.svg";
import placeArticleMarker from "@/assets/img/icon/marker/place_article_marker.svg";
import placeArticleSelectedMarker from "@/assets/img/icon/marker/place_article_selected_marker.svg";

const cake_open_selected: naver.maps.ImageIcon = {
  url: cakeOpenSelectedMarker,
  anchor: new naver.maps.Point(23, 56),
};

const cake_open_not_selected: naver.maps.ImageIcon = {
  url: cakeOpenMarker,
  anchor: new naver.maps.Point(12, 12),
};

const cake_closed_selected: naver.maps.ImageIcon = {
  url: cakeClosedSelectedMarker,
  anchor: new naver.maps.Point(23, 56),
};

const cake_closed_not_selected: naver.maps.ImageIcon = {
  url: cakeClosedMarker,
  anchor: new naver.maps.Point(12, 12),
};
const place_article_selected: naver.maps.ImageIcon = {
  url: placeArticleSelectedMarker,
  anchor: new naver.maps.Point(23, 56),
};

const place_article_not_selected: naver.maps.ImageIcon = {
  url: placeArticleMarker,
  anchor: new naver.maps.Point(12, 12),
};

export function renderMarker(
  marker: MarkerBaseModel,
  isOpen?: boolean,
  isSelected: boolean = false
): naver.maps.ImageIcon {
  // 1. is cake place
  if (marker.category === PLACE_CATEGORY.CAKE) {
    // 1-1. 만약에 열었다면?
    if (isOpen) {
      if (isSelected) return cake_open_selected;
      else return cake_open_not_selected;
    }

    // 1-2. 만약에 닫았다면?
    else {
      if (isSelected) return cake_closed_selected;
      else return cake_closed_not_selected;
    }
  }
  // 2. is else place
  else {
    if (isSelected) return place_article_selected;
    else return place_article_not_selected;
  }
}
