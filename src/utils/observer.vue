<template>
  <div ref="trigger"></div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const emit = defineEmits(["triggerIntersected"]);
const trigger = ref();
const observer = ref<IntersectionObserver | null>(null);
const handleIntersect = (entry: IntersectionObserverEntry) => {
  if (entry.isIntersecting) emit("triggerIntersected", trigger.value);
};
const options = {
  root: null,
  threshold: 0.1,
};

onMounted(() => {
  try {
    observer.value = new IntersectionObserver((entries) => {
      handleIntersect(entries[0]);
    }, options);
    observer.value.observe(trigger.value);
  } catch (err) {
    console.error(err);
  }
});

onUnmounted(() => {
  if (observer.value !== null) {
    observer.value.disconnect();
  }
});
</script>
