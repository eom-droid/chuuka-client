<template>
  <div class="mx-3">
    <div class="w-full my-2.5 relative">
      <button
        class="my-auto absolute left-0 top-1"
        @click="$emit('onOnGoBackClick')"
      >
        <img src="@/assets/img/icon/backword_black.svg" />
      </button>
      <div class="my-auto leading-snug font-medium">Gum bung uh</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["onGoBackClick"]);
</script>
<style scoped></style>
