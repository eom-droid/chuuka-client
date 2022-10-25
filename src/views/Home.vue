<script setup lang="ts">
import NavigationBar from "@/components/NavigationBar.vue";
</script>

<template>
  <div class="h-100v mx-auto overflow-auto customWidth">
    <NavigationBar></NavigationBar>
    <main class="w-page-sm bg-white">
      <!-- <div class="flex text-base font-bold">
        <div class="mt-3 p-1 border-b-4 border-color-main w-16">홈</div>
        <div class="mt-3 p-1 ml-8">컨텐츠</div>
      </div> -->
      <div class="relative flex justify-center align-middle">
        <img src="@/assets/img/slide/slide1.png" class="w-full" />
        <img src="@/assets/img/slide/dots.png" class="absolute bottom-5" />
      </div>
      <div class="w-full h-2 spaceColor"></div>
      <div class="px-4 text-left">
        <p class="subTitle">수제 상품 주문을 쉽게!</p>
        <div
          class="grid grid-flow-col gap-7 mt-4 text-center text-sm font-bold"
        >
          <router-link to="/storeList">
            <div class="mainIcon">
              <img src="@/assets/img/icon/cake_main.svg" class="w-full" />
            </div>
            <p>케이크</p>
          </router-link>
          <div>
            <div class="mainIconDisable getReady">
              <img src="@/assets/img/icon/bouquet.svg" class="w-full" />
              <p class="absolute text-white">준비중</p>
            </div>
            <p>꽃다발</p>
          </div>
          <div>
            <div class="mainIconDisable getReady">
              <img src="@/assets/img/icon/coffe_car.svg" class="w-full" />
              <p class="absolute text-white">준비중</p>
            </div>
            <p>커피차</p>
          </div>
          <div>
            <div class="mainIconDisable getReady">
              <img src="@/assets/img/icon/studio.svg" class="w-full" />
              <p class="absolute text-white">준비중</p>
            </div>
            <p>스튜디오</p>
          </div>
        </div>
      </div>
      <div class="w-full h-2 spaceColor mt-4"></div>
      <div class="px-4 text-left">
        <div class="subTitle flex justify-between">
          <p class="">이런 케이크는 어때요?</p>
          <router-link
            to="/explore"
            class="underline text-sm text-tgray-500 font-bold"
            >더보기</router-link
          >
        </div>
        <div class="grid grid-cols-3 gap-4 mt-4">
          <img
            src="@/assets/img/default/sample_cake/cake1.jpg"
            class="rounded-lg"
          />
          <img
            src="@/assets/img/default/sample_cake/cake2.jpg"
            class="rounded-lg"
          />
          <img
            src="@/assets/img/default/sample_cake/cake3.jpg"
            class="rounded-lg"
          />
          <img
            src="@/assets/img/default/sample_cake/cake1.jpg"
            class="rounded-lg"
          />
          <img
            src="@/assets/img/default/sample_cake/cake2.jpg"
            class="rounded-lg"
          />
          <img
            src="@/assets/img/default/sample_cake/cake3.jpg"
            class="rounded-lg"
          />
          <img
            src="@/assets/img/default/sample_cake/cake1.jpg"
            class="rounded-lg"
          />
          <img
            src="@/assets/img/default/sample_cake/cake2.jpg"
            class="rounded-lg"
          />
          <img
            src="@/assets/img/default/sample_cake/cake3.jpg"
            class="rounded-lg"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.spaceColor {
  background: #f5f5f5;
}

.mainIcon {
  @apply border border-color-main p-2.5 rounded-md;
}
.mainIconDisable {
  @apply p-2.5 rounded-md;
}

.getReady {
  background: rgba(16, 24, 32, 0.5);
  @apply relative flex flex-col items-center justify-center;
}

.subTitle {
  @apply text-base font-normal mt-4;
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
