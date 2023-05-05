<template>
  <div class="border border-light-gray rounded-[10px] px-5 py-2.5 mb-2">
    <div class="flex">
      <span class="text-sm font-bold">{{ props.placeName }}</span>
      <span class="font-bold text-main text-xs ml-2.5 my-auto"
        >{{ props.distance }}m</span
      >
    </div>
    <div class="text-xs text-font-gray mt-2">
      {{ props.address }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  placeName: string;
  distance: number;
  address: string;
}

const props = defineProps<Props>();
</script>
