import { IMapDrawMarker } from "@/model/map_draw_marker_model";
import { LocationUrlModel } from "@/model/place/location_url_model";

import {
  OpenCloseHourDetailModel,
  OpenCloseHourModel,
} from "@/model/place/open_close_hour_model";
import { SnsModel } from "@/model/place/sns_model";
import { PlaceCakeModel } from "@/model/place_model";
import { GeoPoint } from "firebase/firestore";

export const NET = "development";

export const PLACE_CATEGORY = {
  RESTAURANT: "restaurant",
  CAKE: "cake",
  CAFE: "cafe",
  ACCOMMODATION: "accommodation",
};

export const MARKER_Z_INDEX = 20;
export const MARKER_SELECTED_Z_INDEX = 30;
export const CONTENT_Z_INDEX_OVER_MARKER = 101;

export const INSTAGRAM_URL_PREFIX = "https://www.instagram.com/";
export const KAKAO_URL_PREFIEX = "https://pf.kakao.com/";
export const TELEPHONE_PREFIEX = "tel:";

export const LIMIT_PER_PAGE = 8;

export const GUM_BUNG_UH = {
  place: new PlaceCakeModel({
    id: "1910093167",
    name: "Gumbunguh",
    sns: new SnsModel({
      instagram: "gumbunguh_cake",
      kakaoTalk: "_xhxaxoQs",
    }),
    telephone: "0507-1471-2848",
    address: "서울 중구 퇴계로44길 1 4층",

    locationUrl: new LocationUrlModel({
      naver: "1910093167",
    }),
    category: "cake",
    geoCoord: new GeoPoint(37.5617357, 126.9975048),
    openCloseHours: new OpenCloseHourModel({
      sun: new OpenCloseHourDetailModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      mon: new OpenCloseHourDetailModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      tue: new OpenCloseHourDetailModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      wed: new OpenCloseHourDetailModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      thu: new OpenCloseHourDetailModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      fri: new OpenCloseHourDetailModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      sat: new OpenCloseHourDetailModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      description: "🖤당일케이크 pm1:00~",
    }),
    theDayOrderAble: true,
  }),
} as IMapDrawMarker;
