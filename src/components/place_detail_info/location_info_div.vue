<template>
  <div class="flex">
    <span
      class="text-xs my-auto text-font-gray text-left"
      style="max-width: 80%"
      >{{ props.koreanLoc }}</span
    >
    <a
      class="text-usual-blue text-xs my-auto ml-3 flex-none"
      :href="props.locPrefix + props.locValue"
      target="_blank"
      >지도</a
    >
  </div>
</template>

<script setup lang="ts">
interface Props {
  koreanLoc: string;
  locValue: string;
  locPrefix: string;
}

const props = defineProps<Props>();
</script>
