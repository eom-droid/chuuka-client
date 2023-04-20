<template>
  <a
    class="rounded-full w-10 h-10 flex"
    :class="
      props.hrefValue
        ? color + (styleOption ? ' ' + styleOption : '')
        : 'bg-mid-gray  cursor-default pointer-events-none'
    "
    :href="props.hrefValue ? hrefPrefix + props.hrefValue : ''"
    target="_blank"
  >
    <slot name="icon"></slot>
  </a>
</template>

<script setup lang="ts">
interface Props {
  hrefPrefix: string;
  hrefValue?: string;
  color: string;
  styleOption?: string;
}
const props = defineProps<Props>();
</script>
