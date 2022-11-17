import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { IProduct } from "@/api/m1/product";

export const useProductStore = defineStore("design", () => {
  const product = ref([] as IProduct[]);
  const initStoreId = ref("");
  //   const doubleCount = computed(() => count.value * 2);
  const getProduct = computed(() => {
    return product.value;
  });
  const getInitStoreId = computed(() => {
    return initStoreId.value;
  });
  function setInitStoreId(newValue: string) {
    initStoreId.value = newValue;
  }
  function setProduct(newValue: IProduct[]) {
    product.value = newValue;
  }

  return {
    getProduct,
    setProduct,
    setInitStoreId,
    getInitStoreId,
  };
});
