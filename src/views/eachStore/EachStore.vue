<script setup lang="ts">
import {
  getAllStoreLandingInfo,
  IStoreLanding,
  IUrl,
  getStoreLandingInfo,
} from "@/api/m1/store";
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  getCurrentInstance,
  onUnmounted,
  watch,
} from "vue";
import defaultImg from "@/assets/chuuka.png";
import { router } from "@/router/router";
import { toastInfo } from "@/utils/toast";

const store = ref({} as IStoreLanding);

//@ts-ignore
const { proxy } = getCurrentInstance();
const emitter = proxy.$emitter;
const loading = ref(false);
const isDirectToStore = ref(false);

onMounted(() => {
  init();
});
async function init() {
  // 라우팅 되는거 고민하기
  // 1. lsit에서 들어오는거
  // 2. 바로 url로 들어오는거 고민좀
  let temp = window.localStorage.getItem("aa");
  if (temp != null) {
    console.log(JSON.parse(temp));
  }
  if (history.state.store != undefined) {
    isDirectToStore.value = false;
    store.value = history.state.store as IStoreLanding;
    changeNewLine(store.value.introduction);
  } else {
    isDirectToStore.value = true;
    loading.value = true;
    let tempPath = document.location.pathname.split("/");

    if (tempPath.length > 2) {
      let tempResult = await getStoreLandingInfo(tempPath[2]);
      if (tempResult != null) store.value = tempResult;
    }
    loading.value = false;
  }
}

function getStoreInfo() {}

function getImgUrl(e: any) {
  e.target.src = defaultImg;
}
function onClickBack() {
  if (isDirectToStore.value) {
    router.push("/");
  } else {
    router.back();
  }
}
function onClickInstagram(instaUrl: string) {
  window.open("https://www.instagram.com/" + instaUrl, "_blank");
}

function onClickUrl(urlKey: IUrl) {
  if (urlKey != undefined) {
    window.open(urlKey.url, "_blank");
  } else {
    console.log("이상해용");
  }
}
function changeNewLine(args: string) {
  if (args != undefined) {
    return args.replaceAll("\n", "</br>");
  }
  return "";
}

function onClickMap() {
  if (store.value.locationUrl != undefined) {
    if (store.value.locationUrl.naver != undefined) {
      window.open(
        "https://naver.me/" + store.value.locationUrl.naver,
        "_blank"
      );
    } else if (store.value.locationUrl.kakao != undefined) {
      window.open(
        "https://place.map.kakao.com/" + store.value.locationUrl.naver,
        "_blank"
      );
    }
  } else {
    toastInfo("죄송합니다. 해당 업체는 위치가 등록되어있지 않습니다.");
  }
}
function onClickHome() {
  router.push({ path: "/" });
}
</script>

<template>
  <main class="">
    <div v-if="store.id != undefined" class="">
      <div class="customWidth">
        <img
          src="@/assets/img/icon/backword.svg"
          class="fixed w-7 hover:cursor-pointer rounded-full bg-slate-200 p-1 ml-3 mt-4"
          @click="onClickBack()"
        />

        <img
          v-if="store.profileImage != undefined"
          :src="store.profileImage.link"
          class="w-full object-cover h-25v"
          @error="getImgUrl"
        />
        <img
          v-else
          src="@/assets/img/default/chuuka.png"
          class="w-full object-cover h-25v"
          @error="getImgUrl"
        />
      </div>
      <div class="px-3 pt-4 pb-2">
        <!-- 이름과 인스타그램 -->
        <div class="flex">
          <!-- <div class="my-auto flex"> -->
          <div class="my-auto">
            <span class="text-xl font-bold">{{ store.name }}</span>
          </div>

          <a
            class="ml-3 flex"
            :href="'https://www.instagram.com/' + store.sns.instagram"
            target="_blank"
          >
            <img src="@/assets/img/icon/instagram.svg" class="w-5" />
            <div>
              <span
                class="instagram text-lg ml-1.5"
                style="font-family: Roboto"
                >{{ store.sns.instagram }}</span
              >
            </div>
          </a>
        </div>

        <div class="flex text-base mt-1">
          <img src="@/assets/img/icon/location.svg" class="w-4 mx-0.5" />
          <span class="text-sm ml-2 mt-1 text-left text-tgray-500">{{
            store.location
          }}</span>
          <div class="flex mt-1">
            <a
              class="mapFont"
              v-if="store.locationUrl === undefined"
              target="_blank"
            >
              <span> </span>
            </a>
            <a
              class="mapFont"
              v-else-if="store.locationUrl.naver != undefined"
              :href="'https://naver.me/' + store.locationUrl.naver"
              target="_blank"
            >
              <span class=""> 지도 </span>
            </a>
            <a
              class="mapFont"
              v-else-if="store.locationUrl.kakao != undefined"
              :href="'https://place.map.kakao.com/' + store.locationUrl.kakao"
              target="_blank"
            >
              <span> 지도 </span>
            </a>
          </div>
        </div>
        <div class="flex mt-3">
          <div
            v-for="(hashTag, index) in store.hashTags"
            :key="index"
            class="text-xs border-color-main border py-1 pl-1.5 pr-2 rounded-md mr-2"
          >
            #{{ hashTag }}
          </div>
        </div>
        <!-- <hr class="border-tgray-200 mt-5" v-if="store.goUrl != undefined" /> -->
      </div>
      <hr class="border-tgray-200 mt-5" v-if="store.goUrl != undefined" />

      <div class="px-3 pb-3">
        <div>
          <button
            class="w-full mt-3 text-base font-semibold h-11 rounded-md"
            :class="
              index === 0
                ? 'bg-color-main text-white'
                : 'bg-color-sub text-color-main'
            "
            v-for="(url, index) in store.goUrl"
            :key="index"
            @click="onClickUrl(url)"
          >
            <span class="btnFont">{{ url.name }}</span>
          </button>
        </div>
      </div>

      <div class="bg-tgray-100 h-2"></div>
      <div class="">
        <div
          class="border-b-color-main border-b-2 text-sm font-medium shadow-md py-2.5"
        >
          가게 소개
        </div>
        <div class="text-left mt-3 mx-3 text-sm">
          <div class="whitespace-pre-line">{{ store.introduction }}</div>
        </div>
      </div>
    </div>
    <div v-else>
      <img src="@/assets/gif/loadingIcon.gif" v-show="loading" />
      <div v-show="!loading">
        <span class="mt-4 text-lg font-bold logo">CHUUKA</span>
        <div class="mt-20">해당 가게가 없습니다.</div>
        <button
          class="instagram inline-block align-bottom"
          @click="onClickHome()"
        >
          돌아가기
        </button>
      </div>
    </div>
  </main>
</template>

<style>
.instagram {
  color: rgba(4, 151, 249, 1);
}
.custom_textsize {
  font-size: 12px;
}
.custom_textarea {
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/
}
.logo {
  font-style: italic;
  font-family: "Montserrat", sans-serif;
}

.mapFont {
  @apply instagram ml-2 mt-auto inline-block align-bottom w-10 text-base;
}

.btnFont {
  font-family: "Noto Sans KR", Avenir;
}

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
