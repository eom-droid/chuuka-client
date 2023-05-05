<template>
  <div class="w-full h-full font-normal overflow-y-auto noScroll flex flex-col">
    <div v-if="article.id">
      <div>
        <div class="imgRatio">
          <div class="absolute left-0 top-0 z-10 w-full h-full linear">
            <div class="px-4 pt-4 flex justify-between">
              <button class="w-6" @click="onClickBackword()">
                <img src="@/assets/img/icon/backword_white.svg" />
              </button>
              <button class="w-6 mr-1" @click="onClickCopy()">
                <img src="@/assets/img/icon/share_white.svg" />
              </button>
            </div>
          </div>

          <img :src="article.details[0].images[0].link" />
        </div>
      </div>
      <div class="mx-4 text-left">
        <div>
          <div class="mt-6">
            <p class="title-text">{{ article.title }}</p>
            <hash_tag :hash-tags="article.hashTags" class="mt-1.5"></hash_tag>
            <p class="text-xs text-font-gray mt-1.5">
              {{ getKoreanDateTime(article.modDTime!.toDate()) }}
            </p>
          </div>
          <div v-for="articleDeatil in article.details">
            <article_detail_card
              :header="articleDeatil.header"
              :image="articleDeatil.images[0].link"
              :content="articleDeatil.content"
            ></article_detail_card>
          </div>
          <div>
            <p class="title-text">주변 케이크 가게</p>
            <div>
              <div id="article-map" class="min-h-[240px] rounded-t-[10px] mt-4">
                <div
                  class="absolute right-0 left-0 w-full h-full z-[101]"
                ></div>
              </div>
              <!-- <div class="min-h-[240px] rounded-t-[10px] mt-4">
                
              </div> -->
              <router-link
                :to="
                  '/home/map?latitude=' +
                  article.mapCenter.latitude +
                  '&longitude=' +
                  article.mapCenter.longitude +
                  '&zoom=15'
                "
                class="block w-full bg-light-gray rounded-b-[10px] text-center py-3.5 font-bold text-xs"
                >지도로 바로기가</router-link
              >
            </div>
            <div class="mt-8 mb-8">
              <div v-for="(marker, index) in mapDrawMarker">
                <cake_place_card
                  v-if="marker.place instanceof PlaceCakeModel"
                  :address="marker.place.address"
                  :placeName="marker.place.name"
                  :distance="
                    map
                      ? getDistance(marker.place.geoCoord, article.mapCenter)
                      : 0
                  "
                ></cake_place_card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="m-auto">
      <img src="@/assets/gif/loadingIcon_croped.gif" class="w-1/12 m-auto" />
      <div style="text-align: center"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import cake_mini_open_marker from "@/assets/img/icon/marker/cake_mini_open_marker.svg";
import place_article_marker from "@/assets/img/icon/marker/place_article_marker.svg";
import hash_tag from "@/components/common/hash_tag.vue";
import cake_place_card from "@/components/magazine/cake_place_card.vue";
import article_detail_card from "@/components/magazine/article_detail_card.vue";
import { getKoreanDateTime } from "@/utils/moment";
import { ArticleModel } from "@/model/article_model";
import { router } from "@/router/router";
import { useArticleStore } from "@/store/article_store";
import { onActivated, onMounted, ref } from "vue";
import { PlaceArticleModel, PlaceCakeModel } from "@/model/place_model";
import { usePlaceStore } from "@/store/place_store";
import { GeoPoint } from "firebase/firestore";
import { useMarkerStore } from "@/store/marker_store";
import { storeToRefs } from "pinia";
import { IMapDrawMarker } from "@/model/map_draw_marker_model";
import { ARTICLE_MAP_BOUND, PLACE_CATEGORY } from "@/constant/constant";
import { toastCustom } from "@/utils/toast";

function articlePlaceMarker(name: string) {
  return [
    "<div style='width:200px; text-align: center;'>",
    `<img src='${place_article_marker}' style='margin:auto;'/>`,
    `<div class='text-xs mx-auto font-bold bg-black w-fit' style='color: #FE6666;'>${name}</div>`,
    "</div>",
  ].join("");
}

const articlesStore = useArticleStore();
const placesStore = usePlaceStore();
const markersStore = useMarkerStore();
const {
  initialize: articlesStoreInit,
  getArticleByDocId,
  isInitialized,
} = articlesStore;
const { getPlaceByDocId } = placesStore;
const { initialize: markerStoreInit } = markersStore;
const { getMarkers } = storeToRefs(markersStore);
const article = ref({} as ArticleModel);
const map = ref<naver.maps.Map>();
const mapDrawMarker = ref([] as IMapDrawMarker[]);

onMounted(() => {
  init();
});

async function init() {
  await Promise.all([markerStoreInit(), initArticle()]);
  initArticleMap();
}

function onClickCopy() {
  navigator.clipboard.writeText(
    window.location.origin + router.currentRoute.value.fullPath
  );
  toastCustom("url이 복사되었어요.");
}
async function initArticle() {
  // article init 상태 확인
  if (!isInitialized) {
    await articlesStoreInit();
  }
  // path 확인 후 요청
  var docId = router.currentRoute.value.path.split("/")[2];
  if (docId) {
    var tempArticle = await getArticleByDocId(
      router.currentRoute.value.path.split("/")[2]
    );
    if (tempArticle) {
      article.value = tempArticle;
    }
  }
  // article detail place init
  for (var articleDetail of article.value.details) {
    if (typeof articleDetail.place === "string") {
      var place = await getPlaceByDocId(articleDetail.place);
      if (place !== null) articleDetail.place = place as PlaceArticleModel;
    }
  }
}

async function initArticleMap() {
  map.value = new naver.maps.Map("article-map", {
    zoom: 15,
    scaleControl: false,
    mapDataControl: false,
    logoControl: false,
    draggable: false,
  });
  map.value.setCenter(
    new naver.maps.LatLng(
      article.value.mapCenter.latitude,
      article.value.mapCenter.longitude
    )
  );

  (await getMarkers.value).map(async (ele) => {
    const mapBounds = map.value!.getBounds();
    const placeLatLng = new naver.maps.LatLng(
      ele.geoCoord.latitude,
      ele.geoCoord.longitude
    );
    // mapBound 안에 존재하며
    // 현재 article의 mapCenter와의 거리가 ARTICLE_MAP_BOUND 이내인 경우
    if (
      mapBounds.hasPoint(placeLatLng) &&
      getDistance(article.value.mapCenter, ele.geoCoord) < ARTICLE_MAP_BOUND
    ) {
      var placeInfo = await getPlaceByDocId(ele.placeId);
      if (placeInfo != null) {
        mapDrawMarker.value.push({
          marker: ele,
          naverMarker: new naver.maps.Marker({
            position: new naver.maps.LatLng(
              ele.geoCoord.latitude,
              ele.geoCoord.longitude
            ),
            zIndex: 20,
            map: map.value,
            icon:
              ele.category === PLACE_CATEGORY.CAKE
                ? {
                    url: cake_mini_open_marker,
                    anchor: new naver.maps.Point(8, 8),
                  }
                : {
                    content: articlePlaceMarker(placeInfo.name),
                    anchor: new naver.maps.Point(100, 12),
                  },
          }),
          place: placeInfo,
        });
      }
    }
  });
}

function onClickBackword() {
  router.push("/magazine");
}

function getDistance(point1: GeoPoint, point2: GeoPoint) {
  var proj = map.value!.getProjection();
  var distanceMeter = proj.getDistance(
    new naver.maps.LatLng(point1.latitude, point1.longitude),
    new naver.maps.LatLng(point2.latitude, point2.longitude)
  );

  return Math.floor(distanceMeter);
}
</script>

<style scoped>
.imgRatio {
  position: relative;
  width: 100%; /* The size you want */
  padding: 0;
  margin: 0;
}
.imgRatio::after {
  content: "";
  display: block;
  padding-bottom: 56.4%; /* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
}

.imgRatio > img {
  position: absolute; /* Take your picture out of the flow */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; /* Make the picture taking the size of it's parent */
  width: 100%; /* This if for the object-fit */
  height: 100%; /* This if for the object-fit */
  object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
  object-position: center;
}
.linear {
  background: linear-gradient(
    180deg,
    rgba(61, 61, 61, 0.5) 0%,
    rgba(25, 25, 25, 0) 100%
  );
}

.title-text {
  @apply font-bold text-lg;
}
</style>
