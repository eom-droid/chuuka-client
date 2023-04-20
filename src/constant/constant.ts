import { IMapDrawMarker } from "@/model/map_draw_marker_model";
import { MarkerModel } from "@/model/marker_model";
import { LocationUrlModel } from "@/model/store/location_url_model";
import { OpenCloseHourModel } from "@/model/store/open_close_hour_model";
import { OpenCloseHoursModel } from "@/model/store/open_close_hours_model";
import { SnsModel } from "@/model/store/sns_model";
import { StoreModel } from "@/model/store_model";
import { GeoPoint } from "firebase/firestore";

export const entireRegion = "지역 전체";

export const LINKEDLIST_HEAD = "head";

export const newsCardStatus = {
  EDIT: "edit",
  DISPLAY: "display",
};

export const MARKER_Z_INDEX = 20;
export const MARKER_SELECTED_Z_INDEX = 30;
export const CONTENT_Z_INDEX_OVER_MARKER = 101;

export const INSTAGRAM_URL_PREFIX = "https://www.instagram.com/";
export const KAKAO_URL_PREFIEX = "https://pf.kakao.com/";
export const TELEPHONE_PREFIEX = "tel:";

export const LIMIT_PER_PAGE = 8;

export const GUM_BUNG_UH = {
  store: new StoreModel({
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
    geoCoord: new GeoPoint(37.5617357, 126.9975048),
    openCloseHours: new OpenCloseHoursModel({
      sun: new OpenCloseHourModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      mon: new OpenCloseHourModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      tue: new OpenCloseHourModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      wed: new OpenCloseHourModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      thu: new OpenCloseHourModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      fri: new OpenCloseHourModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      sat: new OpenCloseHourModel({
        closeHour: "19:00",
        isClosed: false,
        openHour: "12:00",
      }),
      description: "🖤당일케이크 pm1:00~",
    }),
    theDayOrderAble: true,
  }),
} as IMapDrawMarker;
