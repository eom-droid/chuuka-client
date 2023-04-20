<template>
  <div
    class="text-xs rounded-[20px] h-6 flex px-3 ml-3"
    :class="props.isOpen ? 'bg-sub text-main' : 'bg-light-gray text-font-gray'"
  >
    <span class="m-auto">{{
      props.isOpen === undefined
        ? "정보 없음"
        : props.isOpen
        ? "영업 중"
        : "영업 종료"
    }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isOpen?: boolean;
}
const props = defineProps<Props>();
</script>
