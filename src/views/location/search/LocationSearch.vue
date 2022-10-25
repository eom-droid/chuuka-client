<script setup lang="ts">
import { ref, computed, getCurrentInstance } from "vue";
import { locations } from "@/assets/city/city";

import { router } from "@/router/router";
const keyword = ref("");
const searchArray = computed(() => {
  if (keyword.value.trim() === "") return [];
  let result = [] as Array<string>;
  locations.map((ele) => {
    if (ele.includes(keyword.value)) {
      result.push(ele);
    }
  });
  return result;
});

//@ts-ignore
const { proxy } = getCurrentInstance();
const emitter = proxy.$emitter;

function onClickBack() {
  router.replace({ name: "location", state: { location: undefined } });
}
function changeKeyword(e: any) {
  keyword.value = e.target.value;
}
function onclickLocation(location: string) {
  window.localStorage.setItem("location", location);
  router.replace({ name: "location" });
}
</script>

<template>
  <main class="overflow-x-hidden px-2">
    <div class="mt-4 customWidth">
      <div class="flex">
        <img
          src="@/assets/img/icon/backword.svg"
          class="fixed w-6 hover:cursor-pointer"
          @click="onClickBack()"
        />
        <div
          class="flex border border-gray-400 -mt-1 ml-9 inputWidth bg-white rounded-md"
        >
          <img src="@/assets/img/icon/search.svg" class="w-5 ml-2" />
          <input
            class="ml-2 w-full focus:outline-none text-base py-0.5 placeholder:text-xs rounded-md h-8"
            placeholder="주소(구까지)를 입력해주세요 (ex.서울 중랑구)"
            :value="keyword"
            @input="changeKeyword"
          />
        </div>
      </div>
      <div class="mt-4">
        <div class="text-left text-sm text-gray-500 mb-3">
          '{{ keyword }}' 검색결과
        </div>
        <button
          v-for="(result, index) in searchArray"
          :key="index"
          class="text-left w-full text-base pt-2"
          @click="onclickLocation(result)"
        >
          {{ result }}
          <hr class="border border-gray-300 mt-2 p-0" />
        </button>
      </div>
    </div>
  </main>
</template>

<style>
@media (max-width: 448px) {
  .customWidth {
    width: 100vw;
  }
}
@media (min-width: 448px) {
  .customWidth {
    width: 448px;
  }
}
.inputWidth {
  width: 86%;
}
</style>
