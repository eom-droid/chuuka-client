<template>
  <div class="my-3">
    <div v-if="isLoading" class="flex">
      <img src="@/assets/gif/loadingIcon.gif" class="w-40 mx-auto" />
    </div>

    <div v-else class="grid grid-cols-3 gap-0.5 relative">
      <div
        v-for="(product, index) in getProduct"
        :key="index"
        class="w-full h-full imgRatio border border-mid-gray relative"
      >
        <img
          :src="product.photos[0].link"
          class="w-full h-full object-cover"
          @click="showModal[index] = true"
        />
        <Modal
          v-if="showModal[index]"
          @close="showModal[index] = false"
          :key="index"
        >
          <template v-slot:header
            ><span class="font-bold text-xl">{{ product.name }}</span></template
          >
          <template v-slot:image
            ><img
              :src="product.photos[0].link"
              class="w-full h-full max-h-96 object-cover border border-mid-gray rounded-md"
          /></template>
          <template v-slot:description>
            <div
              class="whitespace-pre-line text-sm h-36 max-h-48 font-medium overflow-y-auto"
            >
              {{ product.description }}
            </div>
          </template>
          <template v-slot:bottom-btn>
            <button
              class="text-lg justify-center flex btn-main"
              @click="
                onClickUrl(
                  'https://pf.kakao.com/' + getStoreInfo.sns.kakaoTalk + '/chat'
                )
              "
            >
              <div class="flex my-auto">
                <img src="@/assets/img/icon/kakao.svg" class="w-7 mr-4" />
                <span>카카오 채널 상담하기</span>
              </div>
            </button>
          </template>
        </Modal>
      </div>
    </div>
    <div
      class="mt-5 text-neutral-500 text-center"
      v-if="getProduct.length <= 0"
    >
      샘플 디자인이 없습니다.
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStoreInfoStore } from "@/stores/storeInfo";
import { useProductStore } from "@/stores/design";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { getAllProduct } from "@/api/m1/product";
import Modal from "@/components/modal/Modal.vue";

const pinia = useStoreInfoStore();
const piniaProduct = useProductStore();
const { getProduct } = storeToRefs(piniaProduct);
const { getStoreInfo } = pinia;
const { getInitStoreId, setInitStoreId, setProduct } = piniaProduct;
const isLoading = ref(true);
const showModal = ref([] as boolean[]);

onMounted(() => {
  init();
});
async function init() {
  if (getInitStoreId === getStoreInfo.id) {
    isLoading.value = false;
    return;
  }
  let tempProductList = await getAllProduct(getStoreInfo.id);
  setInitStoreId(getStoreInfo.id);
  setProduct(tempProductList);
  isLoading.value = false;
  showModal.value = new Array(getProduct.value.length).fill(false);
}

function onClickUrl(url: string | undefined) {
  if (url != undefined) {
    window.open(url, "_blank");
  } else {
  }
}
</script>
<style>
.imgRatio {
  aspect-ratio: 1/1;
}
</style>
