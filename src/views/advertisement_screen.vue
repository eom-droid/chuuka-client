<template>
  <main
    class="w-full h-full text-usual-black relative overflow-y-auto"
    :style="
      getSafeAreaInsets.top !== 0
        ? `padding-top:${getSafeAreaInsets.top}px;`
        : ''
    "
  >
    <top_basic_bar @on-on-go-back-click="onGoBackClick()"></top_basic_bar>

    <img
      src="@/assets/img/default/default_advertise.png"
      class="w-full h-[26%] object-center object-cover"
    />
    <div class="">
      <place_detail_info_card
        :selected-place="GUM_BUNG_UH"
        :running-status-card-visible="false"
        :scheduleScrollAble="false"
        class="pt-6 px-4 relative"
      >
        <template #sns-icon>
          <div class="flex absolute right-4 -top-5">
            <rounded_sns_btn
              color="bg-phone-call-green"
              :hrefPrefix="TELEPHONE_PREFIEX"
              :hrefValue="gum_bung_uh.telephone"
            >
              <template #icon>
                <img src="@/assets/img/icon/phone-call.svg" class="m-auto" />
              </template>
            </rounded_sns_btn>
            <rounded_sns_btn
              color="bg-kakao-yellow"
              :hrefPrefix="KAKAO_URL_PREFIEX"
              :hrefValue="gum_bung_uh.sns.kakaoTalk"
              class="ml-3"
            >
              <template #icon>
                <img
                  :src="
                    gum_bung_uh.sns.kakaoTalk ? kakaoAvailable : kakaoDisAble
                  "
                  class="ml-2.5 mt-2.5"
                  style="width: 21.15px; height: 21.15px"
                />
              </template>
            </rounded_sns_btn>
            <rounded_sns_btn
              color="bg-white"
              :hrefPrefix="INSTAGRAM_URL_PREFIX"
              :hrefValue="gum_bung_uh.sns.instagram"
              styleOption="border border-light-gray"
              class="ml-3"
            >
              <template #icon>
                <img
                  :src="
                    gum_bung_uh.sns.instagram ? instaAvailable : instaDisAble
                  "
                  class="m-auto"
                />
              </template>
            </rounded_sns_btn>
          </div>
        </template>
      </place_detail_info_card>
    </div>
    <div class="grid grid-cols-3 mt-6 pt-1 mx-4 gap-2">
      <div v-for="ele in imgArray" class="imgRatio">
        <img
          v-bind:src="ele"
          class="rounded-[5px] object-contain w-full max-h-full"
        />
      </div>
      <div class="bg-light-gray rounded-[5px] flex relative">
        <div class="m-auto">
          <img src="@/assets/img/icon/instagram.svg" class="w-1/3 m-auto" />
          <p class="mt-1">More Design</p>
        </div>
        <a
          class="absolute w-full h-full left-0 top-0 block bg-black opacity-20 rounded-[5px]"
          :href="INSTAGRAM_URL_PREFIX + gum_bung_uh.sns.instagram"
          target="_blank"
        ></a>
      </div>
    </div>

    <div class="h-28 mt-1.5 bg-white"></div>
  </main>
</template>

<script setup lang="ts">
import {
  INSTAGRAM_URL_PREFIX,
  KAKAO_URL_PREFIEX,
  TELEPHONE_PREFIEX,
  GUM_BUNG_UH,
} from "@/constant/constant";

// Components import
import place_detail_info_card from "@/components/common/place_detail_info_card.vue";

import rounded_sns_btn from "@/components/common/rounded_sns_btn.vue";
import top_basic_bar from "@/components/common/top_basic_bar.vue";
//image
import cake1 from "@/assets/img/default/sample_cake/cake1.jpeg";
import cake2 from "@/assets/img/default/sample_cake/cake2.jpeg";
import cake3 from "@/assets/img/default/sample_cake/cake3.jpeg";
import cake4 from "@/assets/img/default/sample_cake/cake4.jpeg";
import cake5 from "@/assets/img/default/sample_cake/cake5.jpeg";
import cake6 from "@/assets/img/default/sample_cake/cake6.jpeg";
import cake7 from "@/assets/img/default/sample_cake/cake7.jpeg";
import cake8 from "@/assets/img/default/sample_cake/cake8.jpeg";
import cake9 from "@/assets/img/default/sample_cake/cake9.jpeg";
import cake10 from "@/assets/img/default/sample_cake/cake10.jpeg";
import cake11 from "@/assets/img/default/sample_cake/cake11.jpeg";
import cake12 from "@/assets/img/default/sample_cake/cake12.jpeg";
import cake13 from "@/assets/img/default/sample_cake/cake13.jpeg";
import cake14 from "@/assets/img/default/sample_cake/cake14.jpeg";

// icon
import kakaoAvailable from "@/assets/img/icon/kakao.svg";
import kakaoDisAble from "@/assets/img/icon/kakao_disable.svg";
import instaAvailable from "@/assets/img/icon/instagram.svg";
import instaDisAble from "@/assets/img/icon/instagram_disable.svg";

//pinia
import { useDefault } from "@/store/default";

import { router } from "@/router/router";
import { PlaceCakeModel } from "@/model/place_model";

const imgArray = [
  cake1,
  cake2,
  cake3,
  cake4,
  cake5,
  cake6,
  cake7,
  cake8,
  cake9,
  cake10,
  cake11,
  cake12,
  cake13,
  cake14,
];

const defaultStore = useDefault();
const { getSafeAreaInsets } = defaultStore;
const gum_bung_uh = GUM_BUNG_UH.place as PlaceCakeModel;

function onGoBackClick() {
  if (router.getRoutes().length !== 0) {
    router.back();
  } else {
    router.replace("/home/list");
  }
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
