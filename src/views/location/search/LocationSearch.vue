<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
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

onMounted(() => {
  console.log("LocationSearch");
});
</script>

<template>
  <transition name="slide" appear>
    <main class="x-basic-padding mt-14">
      <div class="flex">
        <div
          class="bg-light-gray w-full h-12 align-middle rounded-md"
          @click="router.push({ name: 'location-search' })"
        >
          <div class="py-3 px-2.5 flex">
            <img
              src="@/assets/img/icon/search_text_gray.svg"
              class="w-6 h-6 ml"
            />
            <input
              class="bg-light-gray text-base ml-2.5 w-full"
              placeholder="시, 도, 군/구 를 검색해주세요."
              :value="keyword"
              @input="changeKeyword"
            />
          </div>
        </div>
        <button
          class="text-usual-blue text-lg w-10 my-auto ml-4"
          @click="router.push('/location')"
        >
          닫기
        </button>
      </div>
      <div>
        {{ searchArray }}
      </div>

      <!-- <div class="flex">
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
      </div> -->
      <div class="h-28"></div>
    </main>
  </transition>
</template>

<style>
/* .slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter {
  transform: translate(-100%, 0);
}
.slide-leave-to {
  transform: translate(100%, 0);
} */

.slide-leave-active,
.slide-enter-active {
  transition: 1s;
}
.slide-enter-from {
  transform: translate(100%, 0);
}
.slide-leave-to {
  transform: translate(-100%, 0);
}
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to  {
  opacity: 0;
} */

/* .leave-screen-enter-active,
.leave-screen-leave-active {
  background-color: rgba(0, 0, 0, 1);
  transform: translateX(0);
  transition: all 1s ease-in-out;
}

.leave-screen-leave-to,
.leave-screen-enter {
  background-color: rgba(0, 0, 0, 0);
  transform: translateX(-100%);
} */
</style>
