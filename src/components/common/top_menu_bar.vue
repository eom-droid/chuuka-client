<template>
  <div
    class="flex border border-mid-gray bg-white rounded-[10px] shadow"
    :class="'mx-' + props.marginX"
  >
    <div class="py-3.5 w-full">
      <img
        src="@/assets/img/icon/chuuka_logo.svg"
        style="height: 18px"
        class="mx-auto"
      />
    </div>
    <div class="bg-mid-gray my-auto" style="width: 1px; height: 17px"></div>

    <a
      class="w-full font-medium text-sm underline-offset-2 underline my-auto"
      href="https://pf.kakao.com/_TxnGvb"
      target="_blank"
    >
      기능 개선 요청
    </a>
  </div>
</template>

<script setup lang="ts">
interface Props {
  marginX?: string;
}

const props = withDefaults(defineProps<Props>(), {
  marginX: "4",
});
</script>
<style scoped>
.shadow {
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.05);
}
</style>
