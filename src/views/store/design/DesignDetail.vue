<template>
  <main class="font-medium">
    <div v-if="getTempProduct.id != undefined">
      <div class="relative">
        <img
          :src="getTempProduct.photos[0].link"
          class="w-full object-cover flex-none"
          style=""
          @error="getImgUrl"
        />

        <div class="w-full absolute top-0 top-shadow"></div>
        <img
          src="@/assets/img/icon/backword.svg"
          class="absolute w-10 hover:cursor-pointer rounded-full text-white p-1 ml-3 mt-4 top-0 left-0"
          @click="onClickBack()"
        />
      </div>
      <div class="mx-3 mt-6 text-left font-medium">
        <p class="text-xl">{{ getTempProduct.name }}</p>
        <div class="mt-5 w-1/2 flex justify-between text-base font-medium">
          <div>
            <p class="text-text-gray">당일 주문</p>
            <p class="text-text-gray mt-2.5">크기 변경</p>
            <p class="text-text-gray mt-2.5">디자인 변경</p>
          </div>
          <div>
            <p v-if="getTempProduct.sameDayOrderAble" class="text-main">가능</p>
            <p v-else>불가능</p>
            <p v-if="getTempProduct.sizeChangeAble" class="text-main mt-2.5">
              가능
            </p>
            <p v-else class="mt-2.5">불가능</p>
            <p v-if="getTempProduct.designChangeAble" class="text-main mt-2.5">
              가능
            </p>
            <p v-else class="mt-2.5">불가능</p>
          </div>
        </div>
      </div>
      <div class="whitespace-pre-line text-left mx-3 mt-5 text-sm break-words">
        {{ getTempProduct.description }}
      </div>
      <div
        class="fixed w-full px-3 pb-12 pt-3 bg-white text-xl bottom-0"
        style="max-width: 480px"
      >
        <a
          class="font-bold text-base text-white text-center bg-main w-full py-4 rounded-md block"
          target="_blank"
          :href="'https://pf.kakao.com/' + getStoreInfo.sns.kakaoTalk + '/chat'"
        >
          카카오 채널 상담하기
        </a>
      </div>

      <div class="h-28"></div>
    </div>
    <full-screen-loading v-show="isLoading"></full-screen-loading>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useProductStore } from "@/stores/design";
import { useStoreInfoStore } from "@/stores/storeInfo";
import FullScreenLoading from "@/components/FullScreenLoading.vue";
import { getProductById } from "@/api/m1/product";

import { storeToRefs } from "pinia";
import { getStoreInfoById } from "@/api/m1/store";
import { router } from "@/router/router";
import defaultImg from "@/assets/img/logo/chuuka.png";

const piniaStoreInfo = useStoreInfoStore();
const { getStoreInfo } = storeToRefs(piniaStoreInfo);
const { setStoreInfo } = piniaStoreInfo;

const piniaProduct = useProductStore();
const { getTempProduct } = storeToRefs(piniaProduct);
const { setTempProduct, setInitStoreId } = piniaProduct;
const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  await initStore();
  await initProduct();
  if (getTempProduct.value.id === undefined) {
    router.replace("/404");
  }
  isLoading.value = false;
});
async function initStore() {
  if (getStoreInfo.value.id != undefined) {
    return;
  } else {
    let tempPath = document.location.pathname.split("/");
    if (tempPath.length > 2) {
      let tempResult = await getStoreInfoById(tempPath[2]);
      if (tempResult != null) {
        setStoreInfo(tempResult);
      }
    }
  }
}
async function initProduct() {
  let tempPath = document.location.pathname.split("/");
  if (tempPath.length > 4) {
    setTempProduct(await getProductById(getStoreInfo.value.id, tempPath[4]));
    // setInitStoreId(getStoreInfo.value.id);
  }
}

function getImgUrl(e: any) {
  e.target.src = defaultImg;
}

function onClickBack() {
  router.replace(`/store/${getStoreInfo.value.id}/design`);
}
</script>

<style scoped>
.top-shadow {
  box-shadow: 0px 0px 60px 40px black;
  opacity: 80%;
}
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22.5px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  @apply bg-mid-gray;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 2.5px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  @apply bg-main;
}

/* input:focus + .slider {
  box-shadow: 0 0 1px #ff8400;
} */

input:checked + .slider:before {
  -webkit-transform: translateX(100%);
  -ms-transform: translateX(100%);
  transform: translateX(100%);
}

/* Rounded sliders */
.slider.round {
  border-radius: 50px;
}

.slider.round:before {
  border-radius: 50%;
}

.toggle-box {
  @apply flex justify-between;
  width: 43%;
}

.image_wrapper {
  position: relative;
  padding-top: 61%;
  width: 61%;
  height: 0px;
}

.image_wrapper > .image_wrapper_child {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
