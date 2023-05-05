<template>
  <div class="w-full">
    <div class="imgRatio">
      <img :src="props.thumnail" class="rounded-t-[10px]" />
    </div>
    <div class="mx-4 text-left my-4">
      <!-- title -->
      <p class="font-bold text-lg">{{ props.title }}</p>
      <!-- 해시태그 -->
      <hash_tag :hash-tags="props.hashTag" class="mt-1.5"></hash_tag>
      <!-- content-preview -->
      <div
        class="content-preview text-sm font-normal text-font-gray mt-3 whitespace-pre-wrap"
      >
        {{ props.content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import hash_tag from "@/components/common/hash_tag.vue";
interface Props {
  thumnail: string;
  title: string;
  hashTag: Array<string>;
  content: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.imgRatio {
  position: relative;
  width: 100%; /* The size you want */
  padding: 0;
  margin: 0;
}
.imgRatio::after {
  content: "";
  display: block;
  padding-bottom: 55.8%; /* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
}

.imgRatio img {
  position: absolute; /* Take your picture out of the flow */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0; /* Make the picture taking the size of it's parent */
  width: 100%; /* This if for the object-fit */
  height: 100%; /* This if for the object-fit */
  object-fit: cover; /* Equivalent of the background-size: cover; of a background-image */
  object-position: center;
}

.content-preview {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
