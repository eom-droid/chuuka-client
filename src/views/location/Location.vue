<script setup lang="ts">
import { router } from "@/router/router";
import { onMounted, onActivated, ref, onDeactivated } from "vue";

const animationExecute = ref(false);

onActivated(() => {
  animationExecute.value = true;
});
onDeactivated(() => {
  animationExecute.value = false;
});
</script>

<template>
  <main class="w-full h-full font-medium">
    <router-view v-slot="{ Component, route }">
      <transition
        :name="animationExecute ? route.meta.transition as string: 'fade'"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
.slide-right-leave-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-left-enter-active {
  transition: 0.3s;
}
.slide-right-enter-from {
  transform: translate(-100%, 0);
}
.slide-right-enter-from {
  transform: translate(100%, 0);
}
.slide-right-leave-to {
  transform: translate(-100%, 0);
}
.slide-left-enter-from {
  transform: translate(-100%, 0);
}
.slide-left-leave-to {
  transform: translate(100%, 0);
}
</style>
