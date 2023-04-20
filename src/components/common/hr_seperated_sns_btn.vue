<template>
  <a
    class="mx-4 flex w-full justify-center min-h-[36px]"
    :class="props.hrefValue ? '' : 'cursor-default pointer-events-none'"
    :href="props.hrefValue ? hrefPrefix + props.hrefValue : ''"
    target="_blank"
  >
    <slot name="icon"></slot>
    <p
      class="text-xs text-left ml-3 my-auto"
      :class="props.hrefValue ? 'text-usual-black' : 'text-mid-gray'"
    >
      {{ props.text }}
    </p>
  </a>
</template>

<script setup lang="ts">
interface Props {
  hrefPrefix: string;
  hrefValue?: string;
  text: string;
}
const props = defineProps<Props>();
</script>
