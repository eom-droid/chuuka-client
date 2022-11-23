<template>
  <div class="m-3">
    <div v-if="isLoading" class="flex">
      <img src="@/assets/gif/loadingIcon.gif" class="w-40 mx-auto" />
    </div>

    <div v-else class="grid grid-cols-3 gap-0.5">
      <div
        v-for="(product, index) in getProduct"
        :key="index"
        class="w-full h-full imgRatio border border-mid-gray"
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
          <template v-slot:body
            ><img
              :src="product.photos[0].link"
              class="w-full h-full object-cover border border-mid-gray rounded-md"
          /></template>
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
</script>
<style>
.imgRatio {
  aspect-ratio: 1/1;
}
</style>
