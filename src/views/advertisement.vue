<template>
  <main class="w-full h-full text-usual-black relative overflow-y-auto">
    <top_basic_bar @on-on-go-back-click="onGoBackClick()"></top_basic_bar>

    <img
      src="@/assets/img/default/default_advertise.png"
      class="w-full h-[26%] object-center object-cover"
    />
    <div class="">
      <store_detail_info_card
        :selected-store="GUM_BUNG_UH"
        :running-status-card-visible="false"
        :scheduleScrollAble="false"
        class="pt-6 px-4"
      >
        <template #sns-icon>
          <div class="flex absolute right-4 -top-5">
            <rounded_sns_btn
              color="bg-phone-call-green"
              :hrefPrefix="TELEPHONE_PREFIEX"
              :hrefValue="GUM_BUNG_UH.store!.telephone"
            >
              <template #icon>
                <img src="@/assets/img/icon/phone-call.svg" class="m-auto" />
              </template>
            </rounded_sns_btn>
            <rounded_sns_btn
              color="bg-kakao-yellow"
              :hrefPrefix="KAKAO_URL_PREFIEX"
              :hrefValue="GUM_BUNG_UH.store!.sns.kakaoTalk"
              class="ml-3"
            >
              <template #icon>
                <img
                  :src="GUM_BUNG_UH.store!.sns.kakaoTalk 
                     ? kakaoAvailable
                      :kakaoDisAble"
                  class="ml-2.5 mt-2.5"
                  style="width: 21.15px; height: 21.15px"
                />
              </template>
            </rounded_sns_btn>
            <rounded_sns_btn
              color="bg-white"
              :hrefPrefix="INSTAGRAM_URL_PREFIX"
              :hrefValue="GUM_BUNG_UH.store!.sns.instagram"
              styleOption="border border-light-gray"
              class="ml-3"
            >
              <template #icon>
                <img
                  :src="GUM_BUNG_UH.store!.sns.instagram ? 
                      instaAvailable:
                        instaDisAble"
                  class="m-auto"
                />
              </template>
            </rounded_sns_btn>
          </div>
        </template>
      </store_detail_info_card>
    </div>
    <div class="grid grid-cols-3 mt-6 pt-1 mx-4 gap-2">
      <div v-for="ele in Array.from({ length: 9 }, (_, i) => i + 1)">
        <img
          src="@/assets/img/default/sample_cake/cake1.jpg"
          class="rounded-[5px]"
        />
      </div>
    </div>

    <div class="h-28 mt-1.5 bg-white"></div>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  INSTAGRAM_URL_PREFIX,
  KAKAO_URL_PREFIEX,
  TELEPHONE_PREFIEX,
  LIMIT_PER_PAGE,
  GUM_BUNG_UH,
} from "@/constant/constant";
//pinia
import { storeToRefs } from "pinia";
import { useStoreStore } from "@/store/store_store";
// Components import
import top_menu_bar from "@/components/common/top_menu_bar.vue";
import store_detail_info_card from "@/components/common/store_detail_info_card.vue";
import hr_seperated_sns_btn from "@/components/common/hr_seperated_sns_btn.vue";
import Observer from "@/utils/observer.vue";
import rounded_sns_btn from "@/components/common/rounded_sns_btn.vue";
import top_basic_bar from "@/components/common/top_basic_bar.vue";

// icon
import kakaoAvailable from "@/assets/img/icon/kakao.svg";
import kakaoDisAble from "@/assets/img/icon/kakao_disable.svg";
import instaAvailable from "@/assets/img/icon/instagram.svg";
import instaDisAble from "@/assets/img/icon/instagram_disable.svg";

import { router } from "@/router/router";
import { IMapDrawMarker } from "@/model/map_draw_marker_model";

//pinia part
const storeStore = useStoreStore();
const { getInnerMapStore } = storeToRefs(storeStore);
const { getStoreByDocId } = storeStore;
const mapDrawStore = ref([] as IMapDrawMarker[]);
const page = ref(0);
const isLoading = ref(false);

function onGoBackClick() {
  if (router.getRoutes().length !== 0) {
    router.back();
  } else {
    router.replace("/map");
  }
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
        if (ele.store === null) {
          ele.store = await getStoreByDocId(ele.marker.storeId);
        }
      })
    ).catch((error) => (isLoading.value = false));

    mapDrawStore.value = mapDrawStore.value.concat(
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
