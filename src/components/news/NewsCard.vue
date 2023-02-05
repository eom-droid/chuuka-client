<template>
  <div class="x-basic-padding text-left font-normal">
    <div class="flex justify-between pt-2.5">
      <span class="text-base">{{ props.title }}</span>
    </div>
    <a
      :href="props.content"
      class="text-sm mt-2.5 text-url-blue underline"
      target="_blank"
      >{{ props.content }}</a
    >
    <div
      class="rounded-md border border-mid-gray box-border px-3 py-4 mt-2.5 grid grid-cols-6"
    >
      <div class="col-span-1 minWidth">
        <div class="image_wrapper">
          <img :src="props.ogImage" class="image_wrapper_child" />
        </div>
      </div>
      <div class="text-sm w-full col-span-5">
        <p class="break-words ml-2.5 og-title">{{ props.ogTitle }}</p>
        <p class="text-xs break-words ml-2.5 mt-2 og-description">
          {{ props.ogDescription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps([
  "title",
  "content",
  "ogImage",
  "ogTitle",
  "ogDescription",
  "state",
]);
</script>

<style scoped>
.image_wrapper {
  position: relative;
  padding-top: 100%;
  width: 100%;
  height: 0px;
}

.image_wrapper > .image_wrapper_child {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.minWidth {
  min-width: 50px;
}
.og-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.og-description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
