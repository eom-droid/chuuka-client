<script setup lang="ts">
import { router } from "@/router/router";
import { ref, onActivated, onMounted } from "vue";

const location = ref("");

onMounted(() => {
  init();
});
onActivated(() => {
  let tempStoreInfo = window.localStorage.getItem("location");

  if (tempStoreInfo != null && location.value != tempStoreInfo) {
    // 적용하기로 나온경우 && 다른 선택을 했을 시
    location.value = tempStoreInfo;
  }
});
function init() {
  initLocation();
}

function initLocation() {
  let tempStoreInfo = window.localStorage.getItem("location");

  if (tempStoreInfo != null) {
    location.value = tempStoreInfo;
  } else {
    location.value = "지역 전체";
  }
}

function onClickBack() {
  if (history.state.back === null) {
    router.push("/");
  } else {
    router.go(-1);
  }
}

function onlickLocation(location: string) {
  if (location === "지역 전체") {
    router.push({ name: "location" });
  } else {
    router.push({ name: "location" });
  }
}
</script>

<template>
  <main class="">
    <div class="flex">
      <img
        src="@/assets/img/icon/backword.svg"
        class="fixed top-6 left-6 w-6 cursor-pointer"
        @click="onClickBack()"
      />

      <button
        @click="onlickLocation(location)"
        class="flex text-base locationBtn border border-neutral-400 ml-10 rounded-md px-2 py-1 mt-3"
      >
        <img src="@/assets/img/icon/location.svg" class="w-3 my-auto" />
        <div class="ml-3">{{ location }}</div>
      </button>
    </div>
    <div class="">dfgdfg</div>
  </main>
</template>

<style scoped>
.custom_textsize {
  font-size: 12px;
}

.logo {
  font-style: italic;
  font-family: "Montserrat", sans-serif;
}

.mapFont {
  @apply text-usual-blue ml-2 mt-auto inline-block align-bottom w-10 text-base;
}

.btnFont {
  font-family: "Noto Sans KR", Avenir;
}

.locationBtn {
  width: 86%;
}
</style>
