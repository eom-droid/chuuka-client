<script setup lang="ts">
interface IProps {
  name: string;
  isShown?: boolean;
  navLink?: string;
}
const props = withDefaults(defineProps<IProps>(), {
  isShown: true,
});
</script>

<template>
  <div class="fixed bottom-0 flex w-full">
    <a
      v-if="navLink"
      v-show="isShown"
      class="fbb-btn"
      target="_blank"
      :href="navLink"
      >{{ name }}</a
    >
    <button v-else v-show="isShown" class="fbb-btn">
      {{ name }}
    </button>
  </div>
</template>

<style scoped>
.fbb-btn {
  @apply flex-1 py-4 text-center shadow-sm text-base md:text-lg bg-main text-white font-semibold;
}
</style>
