<template>
  <div
    class="h-[86px] flex font-normal text-xs top-shadow flex-none z-50"
    v-if="showRoute"
  >
    <router-link class="w-full h-full block" to="/home/map">
      <div class="w-fit mx-auto my-4">
        <img
          src="@/assets/img/icon/bottom_navigation/home_black.svg"
          class="mx-auto"
          v-show="route.path.startsWith('/home')"
        />
        <img
          src="@/assets/img/icon/bottom_navigation/home_font_gray.svg"
          class="mx-auto"
          v-show="!route.path.startsWith('/home')"
        />
        <span
          :class="
            route.path.startsWith('/home') ? 'text-black' : 'text-font-gray'
          "
          >홈</span
        >
      </div>
    </router-link>
    <div class="w-full h-full">
      <router-link class="w-fit px-1 mx-auto my-3 py-1 block" to="/magazine">
        <img
          src="@/assets/img/icon/bottom_navigation/magazine_black.svg"
          class="mx-auto"
          v-show="route.path.startsWith('/magazine')"
        />
        <img
          src="@/assets/img/icon/bottom_navigation/magazine_font_gray.svg"
          class="mx-auto"
          v-show="!route.path.startsWith('/magazine')"
        />
        <span
          :class="
            route.path.startsWith('/magazine') ? 'text-black' : 'text-font-gray'
          "
          >매거진</span
        >
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const showRoute = ref(true);
watch(
  () => route.fullPath,
  () => {
    console.log(route.fullPath);
    if (route.fullPath === "/home/list") {
      showRoute.value = false;
      return;
    }
    var temp = route.fullPath.split("/");
    if (temp.length >= 3 && route.fullPath.startsWith("/magazine")) {
      showRoute.value = false;
      return;
    }
    showRoute.value = true;
  }
);
</script>

<style scoped>
.top-shadow {
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.1);
}
</style>
