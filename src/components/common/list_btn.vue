<template>
  <button
    class="rounded-[10px] list-btn flex bg-white"
    style="top: 70px"
    @click="$emit('onClick')"
  >
    <div class="flex my-1.5 mx-4">
      <img src="@/assets/img/icon/list.svg" />
      <span class="ml-1 text-sm">목록</span>
    </div>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["onClick"]);
</script>
<style scoped>
.list-btn {
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
}
</style>
