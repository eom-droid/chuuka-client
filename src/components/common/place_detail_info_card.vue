<template>
  <div class="flex flex-col h-full">
    <template v-if="props.selectedPlace.place instanceof PlaceCakeModel">
      <slot name="sns-icon"></slot>
      <div class="flex">
        <span class="card-title">{{ props.selectedPlace.place!.name }}</span>
        <running_status_card
          v-if="runningStatusCardVisible"
          :isOpen="selectedPlace.isOpen"
        ></running_status_card>
      </div>

      <location_info_div
        :koreanLoc="props.selectedPlace.place!.address"
        locPrefix="https://m.place.naver.com/restaurant/"
        :locValue="props.selectedPlace.place!.locationUrl.naver"
        class="mt-2"
      ></location_info_div>
      <div
        class="mt-5 flex flex-col"
        :class="props.scheduleScrollAble ? 'overflow-y-scroll' : ''"
      >
        <the_day_order_able_div
          v-if="props.selectedPlace.place instanceof PlaceCakeModel"
          :theDayOrderAble="props.selectedPlace.place!.theDayOrderAble"
        ></the_day_order_able_div>
        <open_close_hours_div
          :openCloseHours="props.selectedPlace.place!.openCloseHours"
          class="mt-4"
        ></open_close_hours_div>
      </div>
      <slot name="footer"></slot>
    </template>
    <template v-else>
      <div
        v-if="props.selectedPlace.place instanceof PlaceArticleModel"
        class="h-full"
      >
        <div
          v-if="props.selectedPlace.article !== undefined"
          class="relative h-full"
        >
          <div class="flex">
            <div class="imgRatio">
              <img :src="getImageFromArticle(props.selectedPlace.article)" />
            </div>
            <div class="text-left ml-4">
              <p class="card-title">
                {{ props.selectedPlace.place.name }}
              </p>
              <p class="text-font-gray text-xs mt-1">
                {{ props.selectedPlace.place.address }}
              </p>
              <div
                class="content-preview whitespace-pre-line font-medium text-sm mt-4"
              >
                {{ getHeaderFromArticle(props.selectedPlace.article) }}
              </div>
            </div>
          </div>
          <router-link
            :to="`/magazine/${props.selectedPlace.article.id}`"
            class="text-usual-black text-sm px-4 py-1.5 border border-main rounded-[10px] absolute bottom-4 right-0"
          >
            컨텐츠 읽기
          </router-link>
        </div>
        <div v-else class="h-full flex">
          <img
            src="@/assets/gif/loadingIcon_croped.gif"
            class="w-10 mx-auto h-10"
          />
        </div>
      </div>
      <div v-else class="h-full flex">
        <span class="text-text-gray text-sm mx-auto mt-10"
          >위 기능개선 요청으로 연락부탁드릴게요. 감사합니다.</span
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
// component
import running_status_card from "@/components/place_detail_info/running_status_card.vue";
import location_info_div from "@/components/place_detail_info/location_info_div.vue";
import the_day_order_able_div from "@/components/place_detail_info/the_day_order_able_div.vue";
import open_close_hours_div from "@/components/place_detail_info/open_close_hours_div.vue";
// icon
import chuuka_default from "@/assets/img/default/chuuka.png";

// model
import { IMapDrawMarker } from "@/model/map_draw_marker_model";
import { PlaceArticleModel, PlaceCakeModel } from "@/model/place_model";
import { ArticleModel } from "@/model/article_model";
interface Props {
  selectedPlace: IMapDrawMarker;
  hrVisible?: boolean;
  scheduleScrollAble?: boolean;
  runningStatusCardVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hrVisible: true,
  scheduleScrollAble: true,
  runningStatusCardVisible: true,
});

function getImageFromArticle(article: ArticleModel): string {
  var result = "";
  // 주어진 selectedPlace.article에서
  // place와 selectedPlace.place의 id가 같은
  // article.details의 images[0]을 반환한다.

  article.details.find((ele) => {
    if (ele.place === props.selectedPlace.marker.placeId) {
      result = ele.images[0].link;
    }
  });

  if (result !== "") {
    return result;
  } else {
    return chuuka_default;
  }
}
function getHeaderFromArticle(article: ArticleModel): string {
  var result = "";
  // 주어진 selectedPlace.article에서
  // place와 selectedPlace.place의 id가 같은
  // article.details의 images[0]을 반환한다.
  article.details.find((ele) => {
    if (ele.place === props.selectedPlace.marker.placeId) {
      result = ele.header;
    }
  });
  return result;
}
</script>

<style scoped>
.imgRatio {
  position: relative;
  width: 26%; /* The size you want */
  padding: 0;
  margin: 0;
}
.imgRatio::after {
  content: "";
  display: block;
  padding-bottom: 100%; /* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
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

.content-preview {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
