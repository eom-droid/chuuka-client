<template>
  <main class="px-4">
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
  router.push({ path: "/map" });
}
</script>
<style scoped></style>
