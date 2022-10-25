<script setup lang="ts">
import { router } from "@/router/router";
import { ref, onActivated, onMounted } from "vue";

const location = ref("");

onMounted(() => {
  init();
});
onActivated(() => {
  console.log(window.localStorage.getItem("location"));
  if (
    history.state.location != undefined &&
    location.value != history.state.location
  ) {
    // 적용하기로 나온경우 && 다른 선택을 했을 시
    location.value = history.state.location;
  }
});
function init() {
  initLocation();
}

function initLocation() {
  if (history.state.location != undefined) {
    location.value = history.state.location;
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
    router.push({ name: "location", state: { location } });
  }
}
</script>

<template>
  <main class="customWidth">
    <div class="flex">
      <img
        src="@/assets/img/icon/backword.svg"
        class="fixed w-6 hover:cursor-pointer mt-4 ml-2"
        @click="onClickBack()"
      />

      <button
        @click="onlickLocation(location)"
        class="flex text-base locationBtn border border-tgray-400 ml-10 rounded-md px-2 py-1 mt-3"
      >
        <img src="@/assets/img/icon/location.svg" class="w-3 my-auto" />
        <div class="ml-3">{{ location }}</div>
      </button>
    </div>
  </main>
</template>

<style>
.instagram {
  color: rgba(4, 151, 249, 1);
}
.custom_textsize {
  font-size: 12px;
}
.custom_textarea {
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/
}
.logo {
  font-style: italic;
  font-family: "Montserrat", sans-serif;
}

.mapFont {
  @apply instagram ml-2 mt-auto inline-block align-bottom w-10 text-base;
}

.btnFont {
  font-family: "Noto Sans KR", Avenir;
}

@media (max-width: 448px) {
  .customWidth {
    width: 100vw;
  }
}
@media (min-width: 448px) {
  .customWidth {
    width: 448px;
  }
}

.locationBtn {
  width: 86%;
}
</style>
