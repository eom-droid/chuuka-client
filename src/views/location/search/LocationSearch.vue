<script setup lang="ts">
import { ref, computed, onMounted, onActivated } from "vue";
import { locations } from "@/assets/city/city";
import { router } from "@/router/router";
import { usePersonalStore } from "@/stores/personal";
import { storeToRefs } from "pinia";

onMounted(() => {
  // setTimeout(() => {
  //   document.getElementById("searchInput")?.focus();
  // }, 301);
});

const pinia = usePersonalStore();
const { setSelectedLocation, setLastSearchedAddress, addSearchedList } = pinia;

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
function onClickLocation(location: string) {
  setSelectedLocation(location);
  setLastSearchedAddress(location);
  addSearchedList(location);
  router.push("/");
  // window.localStorage.setItem("location", location);
  // router.replace({ name: "location" });
}

function onClickXBtn() {
  keyword.value = "";
  document.getElementById("searchInput")?.blur();
}

function onClickBackword() {
  router.push("/location/setting");
}
</script>

<template>
  <div class="absolute z-10 w-full">
    <div class="x-basic-padding flex relative py-4">
      <img
        src="@/assets/img/icon/backword.svg"
        class="absolute w-6 h-6 hover:cursor-pointer mt-0.5"
        @click="onClickBackword()"
      />

      <p class="font-semibold text-xl m-auto py">위치</p>
    </div>
    <div class="x-basic-padding mt-5 w-full">
      <div class="py-3 px-2.5 flex bg-light-gray w-full rounded-md searchBox">
        <img src="@/assets/img/icon/search_text_gray.svg" class="w-6 h-6 ml" />
        <input
          id="searchInput"
          class="searchInput"
          placeholder="시, 도, 군/구 를 검색해주세요."
          :value="keyword"
          @input="changeKeyword"
        />
        <button>
          <img
            src="@/assets/img/icon/cancleBtn.svg"
            v-show="keyword != ''"
            @click="onClickXBtn()"
            class="w-6 h-6"
          />
        </button>
      </div>
      <div class="mt-6 text-left ml-1 text-text-gray">
        "{{ keyword }}" 검색 결과
      </div>
      <div class="mt-5">
        <div v-for="loc in searchArray">
          <button
            class="text-base py-2 my-1 w-full text-left"
            @click="onClickLocation(loc)"
          >
            {{ loc }}
          </button>
          <hr />
        </div>
      </div>
      <div class="h-28"></div>
    </div>
  </div>
</template>

<style scoped>
.searchInput {
  @apply bg-light-gray text-base ml-2.5 w-full outline-0 border-0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.searchInput:focus {
  @apply outline-0 border-0 ring-0 stroke-none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
.searchBox:focus-within {
  box-shadow: 0 0 0 1.5px black;
}

*:focus:not(.searchInput) {
  outline: none;
}

.searchInput:-webkit-autofill,
.searchInput:-webkit-autofill:hover,
.searchInput:-webkit-autofill:focus,
.searchInput:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px rgb(245, 245, 245) inset !important;
}
</style>
