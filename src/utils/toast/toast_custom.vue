<template>
  <div class="text-white mx-3 flex">
    <img src="@/assets/img/icon/toast_info.svg" />
    <span class="ml-2">{{ props.msg }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  msg: string;
}

const props = defineProps<Props>();
</script>
<style>
.mosha__toast__slot-wrapper {
  min-height: fit-content;
}
.mosha__toast {
  min-height: fit-content;
}
</style>
