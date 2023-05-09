<script setup lang="ts">
import { onActivated, onMounted, ref } from "vue";
import { GPS_STATUS, GPS_STATUS_TYPE } from "@/constant/gps_state_constant";
import {
  MARKER_Z_INDEX,
  CONTENT_Z_INDEX_OVER_MARKER,
  MARKER_SELECTED_Z_INDEX,
  INSTAGRAM_URL_PREFIX,
  KAKAO_URL_PREFIEX,
  TELEPHONE_PREFIEX,
  PLACE_CATEGORY,
} from "@/constant/constant";
import { IMapDrawMarker } from "@/model/map_draw_marker_model";
//pinia
import { storeToRefs } from "pinia";
import { useMarkerStore } from "@/store/marker_store";
import { usePlaceStore } from "@/store/place_store";
import { useDefault } from "@/store/default";
import { useArticleStore } from "@/store/article_store";
// Components import
import top_menu_bar from "@/components/common/top_menu_bar.vue";
import list_btn from "@/components/common/list_btn.vue";
import home_map_gps_btn from "@/components/home_map_gps_btn.vue";
import place_detail_info_card from "@/components/common/place_detail_info_card.vue";
import rounded_sns_btn from "@/components/common/rounded_sns_btn.vue";

// icon
// 이이콘에 shadow다 넣어줘야됨 ㅜㅠㅠ 해야될거 많구만
// import cakeClosedMarker from "@/assets/img/icon/marker/cake_closed_marker.svg";
// import cakeOpenMarker from "@/assets/img/icon/marker/cake_open_marker.svg";
// import cakeClosedSelectedMarker from "@/assets/img/icon/marker/cake_closed_selected_marker.svg";
// import cakeOpenSelectedMarker from "@/assets/img/icon/marker/cake_open_selected_marker.svg";
// import placeArticleMarker from "@/assets/img/icon/marker/place_article_marker.svg";
// import placeArticleSelectedMarker from "@/assets/img/icon/marker/place_article_selected_marker.svg";
import currentLocIcon from "@/assets/img/icon/current_position.svg";
import kakaoAvailable from "@/assets/img/icon/kakao.svg";
import kakaoDisAble from "@/assets/img/icon/kakao_disable.svg";
import instaAvailable from "@/assets/img/icon/instagram.svg";
import instaDisAble from "@/assets/img/icon/instagram_disable.svg";
import {
  OpenCloseHourDetailModel,
  OpenCloseHourModel,
} from "@/model/place/open_close_hour_model";
import { toastCustom } from "@/utils/toast";
import { router } from "@/router/router";
import { PlaceCakeModel } from "@/model/place_model";
import { MarkerArticleModel, MarkerModel } from "@/model/marker_model";
import { renderMarker } from "@/utils/marker";
import { ArticleService } from "@/service/article_service";

const gpsState = ref<GPS_STATUS_TYPE>(GPS_STATUS.STOP);

//pinia part
const markersStore = useMarkerStore();
const articlesStore = useArticleStore();
const { getMarkers } = storeToRefs(markersStore);
const placeStore = usePlaceStore();
const { getPlaceByDocId, setInnerMapPlace } = placeStore;
const defaultStore = useDefault();
const { getSafeAreaInsets } = defaultStore;

// local variable
const mapDrawMarker = ref([] as IMapDrawMarker[]);
const selectedPlace = ref<IMapDrawMarker | null>(null);
const currentLocMarker = ref<naver.maps.Marker | null>(null);
const gpsWatchId = ref<number | null>(null);

const nowTime = ref("");
const now = ref(new Date());
const screenHeight = window.innerHeight;

// map variable
const map = ref<naver.maps.Map>();

onMounted(() => {
  map.value = new naver.maps.Map("map", {
    zoom: 15,
    scaleControl: false,
    mapDataControl: false,
    logoControl: false,
  });
  setCenterByQuery();

  init();

  initTime();
});

onActivated(() => {
  window.scrollTo(0, 0);
  setCenterByQuery();
});

function setCenterByQuery() {
  var latitude = router.currentRoute.value.query.latitude;
  var longitude = router.currentRoute.value.query.longitude;
  var zoomLevel = router.currentRoute.value.query.zoom;

  if (latitude && longitude) {
    if (
      typeof latitude === "string" &&
      typeof longitude === "string" &&
      typeof zoomLevel === "string"
    ) {
      var tempLatitude = parseFloat(latitude);
      var tempLongitude = parseFloat(longitude);
      //@ts-ignore
      if (tempLatitude !== NaN && tempLongitude !== NaN) {
        map.value!.setCenter(
          new naver.maps.LatLng(tempLatitude, tempLongitude)
        );
        //@ts-ignore
        if (parseInt(zoomLevel) !== NaN) {
          map.value?.setZoom(parseInt(zoomLevel));
        }
      }
    }
  }
}
async function init() {
  await initializeMapDrawMarker();
  addNaverMapListener();
}

async function initializeMapDrawMarker() {
  const mapBounds = map.value!.getBounds();
  // marker init
  await markersStore.initialize();

  // 각 marker 별 naverMarker 생성
  // 각 marker 별 store: null 생성
  // 각 marker 그려줄지 말지 설정
  (await getMarkers.value).map((ele, index) => {
    var tempIsPlaceOpenNow = null;
    if (ele instanceof MarkerModel) {
      tempIsPlaceOpenNow = isPlaceOpenNow(ele.openCloseHours);
    } else {
      tempIsPlaceOpenNow = undefined;
    }

    // 그릴 mapDrawMarker Array에 그릴 마커를 넣어줌
    mapDrawMarker.value.push({
      marker: ele,
      naverMarker: new naver.maps.Marker({
        position: new naver.maps.LatLng(
          ele.geoCoord.latitude,
          ele.geoCoord.longitude
        ),
        zIndex: 20,
        map: mapBounds.hasPoint(
          new naver.maps.LatLng(ele.geoCoord.latitude, ele.geoCoord.longitude)
        )
          ? map.value
          : undefined,
        icon: renderMarker(ele, tempIsPlaceOpenNow),
      }),
      place: null,
      isOpen: ele instanceof MarkerModel ? tempIsPlaceOpenNow : undefined,
    });

    addEachMarkerListener(mapDrawMarker.value[index]);
  });
}

function initTime() {
  const nowHour = now.value.getHours();
  const nowMin = now.value.getMinutes();

  nowTime.value =
    (nowHour > 9 ? nowHour : "0" + nowHour) +
    ":" +
    (nowMin > 9 ? nowMin : "0" + nowMin);
}

// 정보 없음에 대해서도 표현해줘야하기 때문에 일단 보류
function isWorkingNow(
  openCloseHour: OpenCloseHourDetailModel
): boolean | undefined {
  // isCLosed 상태값 확인
  if (openCloseHour.isClosed === undefined) return undefined;
  // isClosded true 면 닫혀있다는 거니까 정기휴무임
  if (openCloseHour.isClosed === true) return false;
  // isClosded flase

  if (openCloseHour.openHour && openCloseHour.closeHour) {
    if (
      openCloseHour.openHour < nowTime.value &&
      openCloseHour.closeHour > nowTime.value
    ) {
      // breakTime이 있으면서 && breakTime 사이에 있다면
      if (
        openCloseHour.startBreakTime &&
        openCloseHour.endBreakTime &&
        openCloseHour.startBreakTime < nowTime.value &&
        openCloseHour.endBreakTime > nowTime.value
      ) {
        return false;
      } else {
        // 라스트 오더 존재 && 라스트오더가 현재시간보다 전이라면
        if (
          openCloseHour.lastOrderTime &&
          openCloseHour.lastOrderTime < nowTime.value
        ) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      return false;
    }
  } else {
    //no info
    return false;
  }
}

function isPlaceOpenNow(
  openCloseHours: OpenCloseHourModel
): boolean | undefined {
  switch (now.value.getDay()) {
    case 0:
      if (openCloseHours.sun === undefined) return undefined;
      else return isWorkingNow(openCloseHours.sun);

    case 1:
      if (openCloseHours.mon === undefined) return undefined;
      else return isWorkingNow(openCloseHours.mon);

    case 2:
      if (openCloseHours.tue === undefined) return undefined;
      else return isWorkingNow(openCloseHours.tue);

    case 3:
      if (openCloseHours.wed === undefined) return undefined;
      else return isWorkingNow(openCloseHours.wed);

    case 4:
      if (openCloseHours.thu === undefined) return undefined;
      else return isWorkingNow(openCloseHours.thu);

    case 5:
      if (openCloseHours.fri === undefined) return undefined;
      else return isWorkingNow(openCloseHours.fri);

    case 6:
      if (openCloseHours.sat === undefined) return undefined;
      else return isWorkingNow(openCloseHours.sat);
  }

  return undefined;
}

async function addEachMarkerListener(mapDrawMarker: IMapDrawMarker) {
  mapDrawMarker.naverMarker.addListener("click", async function () {
    // 해당 function에서 각 mapDrawMarker의 store가 null 일때 체크 해서 store를 가져옴
    // 기존 선택되어 있는 Marker의 zindex와 icon을 기존 상태로 되돌림

    // 선택된 marker의 store를 fetch해오고 store를 selectedStore에 넣어줌

    if (selectedPlace.value !== null) {
      setMarkerNonSelected(selectedPlace.value);
    }

    // pointer초기화
    selectedPlace.value = null;
    selectedPlace.value = mapDrawMarker;
    selectedPlace.value.naverMarker.setZIndex(MARKER_SELECTED_Z_INDEX);
    selectedPlace.value.naverMarker.setIcon(
      renderMarker(mapDrawMarker.marker, mapDrawMarker.isOpen, true)
    );

    if (mapDrawMarker.place === null) {
      mapDrawMarker.place = await getPlaceByDocId(mapDrawMarker.marker.placeId);
    }
    if (
      mapDrawMarker.article === undefined &&
      mapDrawMarker.marker instanceof MarkerArticleModel
    ) {
      mapDrawMarker.article = await articlesStore.getArticleByDocId(
        mapDrawMarker.marker.articleId
      );
    }
  });
}

async function addNaverMapListener() {
  // 사용자에 의해 map이 움직여질때의 실행 listener
  map.value!.addListener("idle", async function () {
    await updateMarkers(map.value!, mapDrawMarker.value);
  });

  // 선택 취소
  // 다른 위치 선택 시
  map.value!.addListener("click", async function () {
    if (selectedPlace.value !== null) {
      setMarkerNonSelected(selectedPlace.value);
    }
    selectedPlace.value = null;
  });
}

async function updateMarkers(map: naver.maps.Map, markers: IMapDrawMarker[]) {
  var mapBounds = map.getBounds();
  var marker, position;

  for (var i = 0; i < markers.length; i++) {
    marker = markers[i].naverMarker;
    position = marker.getPosition();

    if (mapBounds.hasPoint(position)) {
      if (markers[i].marker.placeId === selectedPlace.value?.marker.placeId)
        continue;
      setMarkerNonSelected(markers[i]);

      showMarker(map, marker);
    } else {
      if (markers[i].place === selectedPlace.value?.place) continue;
      hideMarker(map, marker);
    }
  }
  // // map 움직일때 infoWindow 없애기
  // if (infowindow.value !== null) {
  //   infowindow.value.close();
  // }
}

function setMarkerNonSelected(marker: IMapDrawMarker) {
  marker.naverMarker.setZIndex(MARKER_Z_INDEX);
  marker.naverMarker.setIcon(renderMarker(marker.marker, marker.isOpen));
}

function showMarker(map: naver.maps.Map, marker: naver.maps.Marker) {
  if (marker.getMap()) return;
  marker.setMap(map);
}

function hideMarker(map: naver.maps.Map, marker: naver.maps.Marker) {
  if (!marker.getMap()) return;
  marker.setMap(null);
}

function onClickGPSBtn() {
  const previousGPSState = gpsState.value;
  if (gpsState.value === GPS_STATUS.LOADING) return;
  gpsState.value = GPS_STATUS.LOADING;

  if (previousGPSState === GPS_STATUS.RUNNING) {
    currentLocMarker.value!.setMap(null);
    currentLocMarker.value = null;
    if (typeof gpsWatchId.value === "number") {
      navigator.geolocation.clearWatch(gpsWatchId.value);
      gpsWatchId.value = null;
    }
    gpsState.value = GPS_STATUS.STOP;
  } else {
    gpsWatchId.value = navigator.geolocation.watchPosition(
      async (position) => {
        // setTimeout(() => (gpsState.value = false), 10000);
        if (currentLocMarker.value === null) {
          currentLocMarker.value = createNewCurrentNaverMarker(
            position.coords.latitude,
            position.coords.longitude
          );
        }
        if (gpsState.value !== GPS_STATUS.RUNNING) {
          setCurrentMapPositionCenter(
            position.coords.latitude,
            position.coords.longitude
          );
        }
        gpsState.value = GPS_STATUS.RUNNING;
      },
      (PositionError) => {
        gpsState.value = GPS_STATUS.STOP;
        if (gpsWatchId.value !== null) {
          navigator.geolocation.clearWatch(gpsWatchId.value);
        }
        if (PositionError.code === PositionError.PERMISSION_DENIED)
          toastCustom("설정에서 위치정보 사용을 승인 후 다시 시도해주세요.");
        else if (PositionError.code === PositionError.POSITION_UNAVAILABLE)
          toastCustom("기기에서 위치정보를 지원하지 않습니다.");
        else if (PositionError.code === PositionError.TIMEOUT)
          toastCustom("GPS 환경이 원활하지 않습니다.");

        // PositionError.code: 1 권한없음 / 2 사용불가능 / 3 타임아웃

        // setTimeout(() => (gpsRunning.value = false), 2000);
      }
    );
  }
}

function createNewCurrentNaverMarker(latitude: number, longitude: number) {
  return new naver.maps.Marker({
    position: new naver.maps.LatLng(latitude, longitude),
    zIndex: 30,

    map: map.value,
    icon: {
      url: currentLocIcon,
      anchor: new naver.maps.Point(12, 12),
    },
  });
}

function setCurrentMapPositionCenter(latitude: number, longitude: number) {
  map.value!.setCenter(new naver.maps.LatLng(latitude, longitude));
  map.value!.setZoom(15);
}

function onClickListRouteBtn() {
  setInnerMapPlace(
    mapDrawMarker.value.filter((ele) => ele.naverMarker.getMap())
  );
  router.replace("/home/list");
}
</script>

<template>
  <!-- <main class="" id="homeScrollEle"> -->
  <main class="w-full h-full text-usual-black relative bg-white">
    <div class="relative h-full">
      <div id="map" style="width: 100%; height: 100%"></div>
      <div
        class="w-full absolute z-30 left-0"
        :style="
          getSafeAreaInsets.top !== 0
            ? `top:${getSafeAreaInsets.top}px;`
            : 'top:10px;'
        "
      >
        <top_menu_bar></top_menu_bar>
      </div>
      <!-- @click="showMap = false" -->
      <list_btn
        class="absolute right-4 z-30"
        :style="
          getSafeAreaInsets.top !== 0
            ? `top:${getSafeAreaInsets.top + 70}px;`
            : 'top:70px;'
        "
        @on-click="onClickListRouteBtn()"
      ></list_btn>

      <!-- @click="onClickSetLocation()" -->
      <home_map_gps_btn
        :gpsState="gpsState"
        @on-click="onClickGPSBtn()"
        class="absolute"
        :style="
          selectedPlace === null
            ? 'bottom:100px; right:16px'
            : 'bottom:' +
              (screenHeight * 0.22 > 180
                ? screenHeight * 0.22 + 30
                : 180 + 30) +
              'px; left:16px'
        "
      ></home_map_gps_btn>
      <!-- eachStore -->

      <div
        class="absolute bottom-4 left-0 w-full h-[22%] min-h-[180px]"
        v-if="selectedPlace !== null"
        :style="'z-index: ' + CONTENT_Z_INDEX_OVER_MARKER"
      >
        <div class="mx-4 bg-white pt-6 rounded-[10px] px-4 h-full each-card">
          <div
            class="h-full flex rounded-t-lg"
            v-if="selectedPlace.place === null"
          >
            <img
              src="@/assets/gif/loadingIcon_croped.gif"
              class="m-auto w-1/12"
            />
          </div>
          <place_detail_info_card v-else :selectedPlace="selectedPlace">
            <template #sns-icon>
              <div
                class="flex absolute right-8 -top-5"
                v-if="selectedPlace.place instanceof PlaceCakeModel"
              >
                <rounded_sns_btn
                  color="bg-phone-call-green"
                  :hrefPrefix="TELEPHONE_PREFIEX"
                  :hrefValue="selectedPlace.place.telephone"
                >
                  <template #icon>
                    <img
                      src="@/assets/img/icon/phone-call.svg"
                      class="m-auto"
                    />
                  </template>
                </rounded_sns_btn>
                <rounded_sns_btn
                  color="bg-kakao-yellow"
                  :hrefPrefix="KAKAO_URL_PREFIEX"
                  :hrefValue="selectedPlace.place.sns.kakaoTalk"
                  class="ml-3"
                >
                  <template #icon>
                    <img
                      :src="
                        selectedPlace.place.sns.kakaoTalk
                          ? kakaoAvailable
                          : kakaoDisAble
                      "
                      class="ml-2.5 mt-2.5"
                      style="width: 21.15px; height: 21.15px"
                    />
                  </template>
                </rounded_sns_btn>
                <rounded_sns_btn
                  color="bg-white"
                  :hrefPrefix="INSTAGRAM_URL_PREFIX"
                  :hrefValue="selectedPlace.place.sns.instagram"
                  styleOption="border border-light-gray"
                  class="ml-3"
                >
                  <template #icon>
                    <img
                      :src="
                        selectedPlace.place.sns.instagram
                          ? instaAvailable
                          : instaDisAble
                      "
                      class="m-auto"
                    />
                  </template>
                </rounded_sns_btn>
              </div>
            </template>
            <template #footer
              ><div class="flex-none" style="height: 12px"></div
            ></template>
          </place_detail_info_card>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.each-card {
  box-shadow: 0px -5px 5px 2px rgba(0, 0, 0, 0.08);
  /* box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1); */
}
</style>
