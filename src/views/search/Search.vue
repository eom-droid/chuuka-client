<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { router } from "@/router/router";
import { debounce } from "lodash";
import { IStoreLanding, searchStoreLandingInfo } from "@/api/m1/store";
import { async } from "@firebase/util";

function onClickBack() {
  if (history.state.back === null) {
    router.push("/");
  } else {
    router.back();
  }
}

const keyword = ref("");
watch(
  keyword,
  debounce(async function (keyword: string, prevKeyword) {
    keyword = keyword.trim();
    if (keyword === "") {
      return;
    }
    storeResultList.value = await searchStoreLandingInfo("name", keyword);
  }, 800)
);
const storeResultList = ref([] as IStoreLanding[]);
const cakeResultList = ref([]);

// const storeResultList = computed(() => {
//   debounce(function () {
//     console.log(keyword.value);
//   }, 1000);
// });

// const cakeResultList = ref([]);

function changeKeyword(e: any) {
  keyword.value = e.target.value;
}
</script>

<template>
  <main class="w-page-sm bg-white">
    <div class="mt-4 customWidth px-2">
      <div class="flex">
        <img
          src="@/assets/img/icon/backword.svg"
          class="fixed w-6 hover:cursor-pointer"
          @click="onClickBack()"
        />
        <div
          class="flex border border-gray-400 -mt-0.5 ml-9 w-10/12 bg-white rounded-md"
        >
          <img src="@/assets/img/icon/search.svg" class="w-5" />
          <input
            class="ml-2 w-full focus:outline-none text-base py-0.5 placeholder:text-xs rounded-md"
            placeholder="검색어를 입력하세요"
            :value="keyword"
            @input="changeKeyword"
          />
        </div>
      </div>
      <div class="mt-4">
        <div class="text-left text-sm text-gray-500 mb-3">
          '{{ keyword }}' 검색결과
        </div>
      </div>
    </div>
    <div class="text-left">
      <div class="w-full bg-slate-300">
        가게 검색결과 {{ storeResultList.length }}개
      </div>
      <div>
        <div v-for="eachStore in storeResultList">
          {{ eachStore.name }}
        </div>
      </div>
    </div>
    <div class="text-left">
      <div class="w-full bg-slate-300">케이크 검색결과</div>
      <div>sdf</div>
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
