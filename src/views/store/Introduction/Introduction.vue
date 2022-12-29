<template>
  <!-- NOTE 필독 사항 -->
  <div class="">
    <div class="whitespace-pre-line font-medium text-sm mt-2">
      {{
        getStoreInfo.introduction === undefined
          ? "가게 소개가 없어요.ㅠㅠ"
          : getStoreInfo.introduction
      }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useStoreInfoStore } from "@/stores/storeInfo";
import { storeToRefs } from "pinia";
import { router } from "@/router/router";
onMounted(() => {
  if (getStoreInfo.value.isJoined && getStoreInfo.value.isManaged) {
    router.replace("/store/" + getStoreInfo.value.id + "/mustRead");
  }
});

const pinia = useStoreInfoStore();
const { getStoreInfo } = storeToRefs(pinia);
</script>
<style scoped>
.clipboardCss {
  opacity: 0.01;
  /* height: 1; */
  position: absolute;
  z-index: -1;
}
.store-content-block {
  @apply border border-mid-gray shadow-sm rounded-md p-3;
}
</style>
