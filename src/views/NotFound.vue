<template>
  <main class="custom-width">
    <div class="mt-20">잘못된 접근입니다.</div>
    <button
      class="text-usual-blue inline-block align-bottom mt-5"
      @click="onClickHome()"
    >
      돌아가기
    </button>
  </main>
</template>

<script setup lang="ts">
import { router } from "@/router/router";

function onClickHome() {
  router.push({ path: "/" });
}
</script>
<style>
@media (max-width: 448px) {
  .custom-width {
    width: 100vw;
  }
}
@media (min-width: 448px) {
  .custom-width {
    width: 448px;
  }
}
</style>
