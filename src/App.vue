<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
// import { usePersonalStore } from "@/stores/personal";
import { Device } from "@capacitor/device";
import { SafeArea } from "capacitor-plugin-safe-area";
import { useDefault } from "@/store/default";
import bottom_navigation_bar from "./components/bottom_navigation_bar.vue";

const platform = ref("");
// const pinia = usePersonalStore();
// const { init } = pinia;
const varIsMobile = isMobile();
const defaultPinia = useDefault();
const { setSafeAreaInsets, setPlatform } = defaultPinia;

function isMobile() {
  if (
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
}

onMounted(async () => {
  // init();
  // mobile이면 background color를 white로
  if (varIsMobile) {
    const body = document.getElementsByTagName("body");
    body[0].style.background = "RGB(255,255,255)";
  }
  setPlatform((await Device.getInfo()).platform);
});

// ANCHOR Safe Area for iOS Capacitorjs App

SafeArea.getSafeAreaInsets().then(({ insets }) => {
  setSafeAreaInsets(insets);
});
</script>

<template>
  <div v-if="varIsMobile" class="h-full flex flex-col">
    <router-view v-slot="{ Component }">
      <keep-alive :include="['map_screen']" :max="10">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <bottom_navigation_bar></bottom_navigation_bar>
  </div>
  <!-- <router-view v-if="varIsMobile"></router-view> -->
  <div v-else class="flex w-full h-full bg-main noScroll">
    <div class="w-1/12 disnone"></div>
    <div class="mx-auto mt-20 disnone">
      <div class="text-xl text-left mb-auto font-semibold">
        <p>전국 주문 제작 케이크</p>
        <p>정보를 한눈에!</p>
      </div>
      <div class="text-white text-5xl font-semibold text-left mb-auto mt-7">
        <p>너의</p>
        <p class="mt-2">모든 날들을</p>

        <div class="flex mt-6">
          <img
            src="@/assets/img/logo/logo_firework_white.svg"
            class="w-3/4 max-w-[250px]"
            alt="chuukaLogo"
          /><span class="my-auto ml-2">해!</span>
        </div>
      </div>
      <!-- footer -->
      <div class="text-sm text-left bottom-0 fixed mb-7">
        <div class="text-white">
          <a
            href="https://changeable-beam-1af.notion.site/CHUUKA-2d22455d43b64e8c83c4f7043dd67ec4"
            target="_blank"
            >회사소개</a
          >
          <a class="ml-7" href="https://pf.kakao.com/_TxnGvb" target="_blank"
            >입점안내</a
          >
        </div>
        <div class="text-sub font-light text-xs">
          <div class="mt-3">
            <span>(주)추카</span>
            <span class="ml-3">대표 : 송준호</span>
            <span class="ml-3">사업자 등록번호 : 435-14-01973</span>
          </div>
          <div class="mt-4">주소 : 대전광역시 대덕구 우암로492번길 18, 2충</div>
          <div class="mt-4">
            (주)추카는 통신판매중개자이며, 통신판매의 당사자가 아닙니다.
          </div>
          <div>상품 정보 및 거래에 관한 의무와 책임은 판매자에게 있습니다.</div>
        </div>
      </div>
    </div>
    <div
      class="main-view cusShadow w-page-sm bg-white customWidth mx-auto h-full flex flex-col"
      id="mainWrapper"
    >
      <router-view v-slot="{ Component }" class="">
        <keep-alive :include="['map_screen']" :max="10">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <bottom_navigation_bar></bottom_navigation_bar>
    </div>

    <div class="w-1/12 disnone"></div>
  </div>
</template>

<style scoped>
.main-view {
  min-width: 480px;
}
.cusShadow {
  box-shadow: 0 0 22px -2px rgb(0 0 0 / 75%);
}
@media (max-width: 950px) {
  .disnone {
    display: none;
  }
}

@media (max-width: 448px) {
  .customWidth {
    width: 100vw;
  }
}
@media (min-width: 448px) {
  .customWidth {
    width: 448px;
  }
}
</style>
