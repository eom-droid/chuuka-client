<template>
  <div class="mt-8">
    <div class="mb-10">
      <p class="title-text">{{ header }}</p>
      <div class="mt-4">
        <div class="imgRatio">
          <img :src="image" />
        </div>
      </div>
      <div
        class="text-usual-black mt-8 text-sm whitespace-pre-wrap"
        style="line-height: 200%"
      >
        {{ content }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  header: string;
  image: string;
  content: string;
}

const props = defineProps<Props>();
</script>

<style scoped>
.title-text {
  @apply font-bold text-lg;
}

.imgRatio {
  position: relative;
  width: 100%; /* The size you want */
  padding: 0;
  margin: 0;
}
.imgRatio::after {
  content: "";
  display: block;
  padding-bottom: 56.4%; /* The padding depends on the width, not on the height, so with a padding-bottom of 100% you will get a square */
}

.imgRatio > img {
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
</style>
