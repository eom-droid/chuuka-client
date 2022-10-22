<script setup lang="ts"></script>

<template>
  <main class="w-page-sm bg-white">
    <div class="customWidth mt-3">
      <div class="flex">
        <img src="@/assets/img/icon/backword.svg" class="w-7 ml-3" />
        <div
          class="flex border border-gray-400 -mt-0.5 ml-3 w-10/12 bg-white rounded-md"
        >
          <img src="@/assets/img/icon/search.svg" class="w-6 ml-1" />
          <input
            class="ml-2 w-full focus:outline-none text-base py-0.5 placeholder:text-xs rounded-md p-2 h-9"
            placeholder="검색어를 입력하세요."
          />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
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
</style>
