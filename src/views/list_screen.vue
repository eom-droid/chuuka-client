<template>
  <main
    class="w-full h-full text-usual-black relative"
    :style="
      getSafeAreaInsets.top !== 0
        ? `padding-top:${getSafeAreaInsets.top}px;`
        : ''
    "
  >
    <div class="w-full bg-light-gray py-2.5">
      <top_menu_bar class=""></top_menu_bar>
    </div>
    <router-link class="m-4 text-left block" to="/advertisement">
      <p class="font-medium text-[13px]">광고</p>
      <div class="flex mt-3.5">
        <div class="imgRatio">
          <img
            src="@/assets/img/default/default_advertise.png"
            class="rounded-[5px]"
          />
        </div>

        <div class="ml-4">
          <p class="font-bold text-sm">금붕어 케이크</p>
          <p class="mt-3 text-xs">서울시 중구 퇴계로44길 1, 4층</p>
        </div>
      </div>
    </router-link>
    <div class="w-full bg-light-gray h-1.5"></div>

    <div
      v-if="mapDrawPlace === null || mapDrawPlace.length === 0"
      class="bg-white pt-20 text-font-gray"
    >
      지도안에 가게가 없어요
    </div>

    <div v-else>
      <div v-for="eachStore in mapDrawPlace" :key="eachStore.marker.placeId">
        <div
          v-if="
            eachStore.place !== null &&
            eachStore.place instanceof PlaceCakeModel
          "
          class="h-full w-full"
        >
          <place_detail_info_card
            :selectedPlace="eachStore"
            :hrVisible="false"
            class="mt-6 mx-4"
            :schedule-scroll-able="false"
          >
            <template #footer>
              <div class="flex mt-4">
                <hr class="w-full" />
              </div>
            </template>
          </place_detail_info_card>
          <div class="flex mt-2 h-full">
            <hr_seperated_sns_btn
              :hrefPrefix="TELEPHONE_PREFIEX"
              :hrefValue="eachStore.place.telephone"
              text="전화하기"
            >
              <template #icon>
                <img
                  :src="eachStore.place.telephone ? telAvailable : telDisAble"
                />
              </template>
            </hr_seperated_sns_btn>
            <div class="w-[1px] h-[20px] my-auto bg-light-gray"></div>
            <hr_seperated_sns_btn
              :hrefPrefix="KAKAO_URL_PREFIEX"
              :hrefValue="eachStore.place.sns.kakaoTalk"
              text="카카오 채널"
            >
              <template #icon>
                <img
                  :src="
                    eachStore.place.sns.kakaoTalk
                      ? kakaoAvailable
                      : kakaoDisAble
                  "
                />
              </template>
            </hr_seperated_sns_btn>
            <div class="w-[1px] h-[20px] my-auto bg-light-gray"></div>

            <hr_seperated_sns_btn
              :hrefPrefix="INSTAGRAM_URL_PREFIX"
              :hrefValue="eachStore.place.sns.instagram"
              text="인스타그램"
            >
              <template #icon>
                <img
                  :src="
                    eachStore.place.sns.instagram
                      ? instaAvailable
                      : instaDisAble
                  "
                />
              </template>
            </hr_seperated_sns_btn>
          </div>
          <div class="w-full bg-light-gray h-1.5 mt-4"></div>
        </div>
      </div>
      <div class="text-font-gray"></div>
    </div>
    <Observer @trigger-intersected="loadMore"></Observer>

    <div class="h-28 mt-1.5 bg-white flex">
      <img
        src="@/assets/gif/loadingIcon_croped.gif"
        class="m-auto w-1/6"
        v-show="isLoading"
      />
    </div>
    <div
      class="w-full fixed"
      :style="
        getSafeAreaInsets.bottom !== 0
          ? `bottom:${getSafeAreaInsets.bottom * 1.5 + 50}px;`
          : 'bottom:106px;'
      "
      style="max-width: 480px"
    >
      <button
        class="bg-main rounded-[10px] flex px-4 py-1.5 mx-auto"
        @click="onClickMapRouteBtn()"
      >
        <img src="@/assets/img/icon/bxs-map-alt1.svg" />
        <span class="my-auto ml-1 text-sm text-white">지도로 가기</span>
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  INSTAGRAM_URL_PREFIX,
  KAKAO_URL_PREFIEX,
  TELEPHONE_PREFIEX,
  LIMIT_PER_PAGE,
} from "@/constant/constant";
//pinia
import { storeToRefs } from "pinia";
import { usePlaceStore } from "@/store/place_store";
import { useDefault } from "@/store/default";

// Components import
import top_menu_bar from "@/components/common/top_menu_bar.vue";
import place_detail_info_card from "@/components/common/place_detail_info_card.vue";
import hr_seperated_sns_btn from "@/components/common/hr_seperated_sns_btn.vue";
import Observer from "@/utils/observer.vue";

// icon
import kakaoAvailable from "@/assets/img/icon/small-kakao.svg";
import kakaoDisAble from "@/assets/img/icon/small-kakao-mid-gray.svg";
import instaAvailable from "@/assets/img/icon/small-instagram.svg";
import instaDisAble from "@/assets/img/icon/small-instagram-mid-gray.svg";
import telAvailable from "@/assets/img/icon/small-phone.svg";
import telDisAble from "@/assets/img/icon/small-phone-mid-gray.svg";

import { router } from "@/router/router";
import { IMapDrawMarker } from "@/model/map_draw_marker_model";
import { PlaceCakeModel } from "@/model/place_model";

//pinia part
const storeStore = usePlaceStore();
const { getInnerMapStore } = storeToRefs(storeStore);
const { getPlaceByDocId: getStoreByDocId } = storeStore;
const defaultStore = useDefault();
const { getSafeAreaInsets } = defaultStore;

const mapDrawPlace = ref([] as IMapDrawMarker[]);
const page = ref(0);
const isLoading = ref(false);
function onClickMapRouteBtn() {
  router.replace("/home/map");
}

const loadMore = async () => {
  if (isLoading.value) return;
  if (getInnerMapStore.value !== null) {
    if (getInnerMapStore.value.length < LIMIT_PER_PAGE * page.value) return;

    isLoading.value = true;
    let temp = getInnerMapStore.value.slice(
      LIMIT_PER_PAGE * page.value,
      LIMIT_PER_PAGE * (page.value + 1)
    );
    await Promise.all(
      temp.map(async (ele) => {
        if (ele.place === null) {
          ele.place = await getStoreByDocId(ele.marker.placeId);
        }
      })
    ).catch((error) => (isLoading.value = false));

    mapDrawPlace.value = mapDrawPlace.value.concat(
      getInnerMapStore.value.slice(
        LIMIT_PER_PAGE * page.value,
        LIMIT_PER_PAGE * (page.value + 1)
      )
    );

    page.value += 1;
    isLoading.value = false;
  }
};
</script>
<style scoped>
.imgRatio {
  position: relative;
  width: 18%; /* The size you want */
  min-width: 60px;
  padding: 0;
  margin: 0;
}
.imgRatio::after {
  content: "";
  display: block;
  padding-bottom: 100%; /* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
}

.imgRatio img {
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
</style>
