<template>
  <div class="flex text-sm">
    <div class="" v-for="(hashTag, index) in hashTags">
      <span :class="index !== 0 ? 'ml-3.5' : ''">
        <span class="text-main font-medium">#</span>
        <span class="ml-[3px] font-normal text-text-gray">{{ hashTag }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hashTags: Array<string>;
}

const props = defineProps<Props>();
</script>
