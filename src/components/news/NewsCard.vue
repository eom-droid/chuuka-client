<template>
  <div class="text-left font-normal py-4">
    <div class="flex justify-between relative py-2">
      <span class="newsTitle">{{ props.title }}</span>
    </div>
    <a :href="props.content" class="newsContent" target="_blank">{{
      props.content
    }}</a>
    <a
      class="rounded-md border border-mid-gray box-border px-3 py-4 mt-2.5 grid grid-cols-6"
      target="_blank"
      :href="props.content"
    >
      <div class="col-span-1 minWidth">
        <div class="image_wrapper">
          <img
            :src="ogImage"
            @error="replaceByDefault"
            class="image_wrapper_child object-cover"
          />
        </div>
      </div>
      <div class="text-sm w-full col-span-5">
        <p class="OGTitle">{{ props.ogTitle }}</p>
        <p class="OGDescription">{{ props.ogDescription }}</p>
      </div>
    </a>
    <div class="text-left w-full justify-end flex text-xs mt-2 text-text-gray">
      <span>{{ getKoreanDateTime(new Date()) }}</span>
    </div>
    <div id="shitshit"></div>
  </div>
</template>

<script setup lang="ts">
import { getKoreanDateTime } from "@/utils/moment";
import { onMounted } from "vue";
import defaultImg from "@/assets/img/logo/chuuka.png";

function replaceByDefault(e: any) {
  e.target.src = defaultImg;
}

const props = defineProps([
  "idKey",
  "title",
  "content",
  "ogImage",
  "ogTitle",
  "ogDescription",
  "state",
  "modDTime",
]);

function a(event: any) {
  event.stopPropagation();
}
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

.box-shadow-float {
  border: 1px solid #d9d9d9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.newsTitle {
  @apply text-base text-ellipsis font-medium;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.newsContent {
  @apply text-sm text-url-blue underline text-ellipsis;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
.OGDescription {
  @apply text-xs break-words ml-2.5 mt-2 overflow-ellipsis;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.OGTitle {
  @apply text-sm break-words ml-2.5 overflow-ellipsis;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
