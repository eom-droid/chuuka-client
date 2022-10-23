<script setup lang="ts">
import { onMounted } from "vue";
import { router } from "./router/router";
</script>

<template>
  <div class="bg-color-main h-100v flex">
    <div class="w-1/12 disnone"></div>
    <div class="mx-auto mt-20 disnone">
      <div class="text-xl text-left mb-auto font-semibold">
        <p>전국 주문 제작 케이크</p>
        <p>정보를 한곳에서!</p>
      </div>
      <div class="text-white text-5xl font-semibold text-left mb-auto mt-7">
        <p>너의</p>
        <p class="mt-2">모든 날들을</p>

        <div class="flex mt-6">
          <img
            src="@/assets/img/logo/logo_firework_white.svg"
            class="w-3/4"
          /><span class="my-auto ml-2">해!</span>
        </div>
      </div>
      <!-- footer -->
      <div class="text-sm text-left bottom-0 fixed mb-7">
        <div class="text-white">
          <a>회사소개</a>
          <a class="ml-7" href="https://x170w.channel.io/lounge" target="_blank"
            >입점안내</a
          >
        </div>
        <div class="text-color-sub font-light">
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

    <router-view
      v-slot="{ Component }"
      class="cusShadow w-page-sm bg-white h-100v"
    >
      <keep-alive include="StoreList,Location,Explore" :max="10">
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <div class="w-1/12 disnone"></div>
  </div>
</template>

<style scoped>
.cusShadow {
  box-shadow: 0 0 22px -2px rgb(0 0 0 / 75%);
}
@media (max-width: 900px) {
  .disnone {
    display: none;
  }
}
</style>
