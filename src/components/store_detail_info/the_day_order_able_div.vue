<template>
  <div class="flex">
    <img src="@/assets/img/icon/bx-cake2.svg" />
    <span class="ml-2 my-auto">당일케이크</span>
    <span
      class="text-main font-medium ml-2 my-auto"
      :class="theDayOrderAble ? 'text-main' : 'text-font-gray'"
      >{{
        theDayOrderAble
          ? "가능"
          : theDayOrderAble === undefined
          ? "문의 필요"
          : "불가능"
      }}</span
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  theDayOrderAble?: boolean;
}

const props = defineProps<Props>();
</script>
