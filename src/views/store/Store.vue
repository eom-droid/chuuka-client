<script setup lang="ts">
import { getStoreInfoById } from "@/api/m1/store";
import { ref, onMounted, onUpdated, onActivated, watch } from "vue";
import defaultImg from "@/assets/img/logo/chuuka.png";
import { router } from "@/router/router";
import { useStoreInfoStore } from "@/stores/storeInfo";
import { storeToRefs } from "pinia";

const pinia = useStoreInfoStore();
const { getStoreInfo } = storeToRefs(pinia);
const { setStoreInfo } = pinia;

const innerRoute = ref(0);
const loading = ref(false);

onMounted(async () => {
  await init();
  initInnerRoute();
});

watch(
  () => router.currentRoute.value,
  (newValue, prevCount) => {
    initInnerRoute();
  },
  { deep: true }
);
async function init() {
  if (getStoreInfo.value.id != undefined) {
    return;
  } else {
    loading.value = true;
    let tempPath = document.location.pathname.split("/");
    if (tempPath.length > 2) {
      let tempResult = await getStoreInfoById(tempPath[2]);
      if (tempResult != null) {
        setStoreInfo(tempResult);
      }
    }
    loading.value = false;
  }
}
function initInnerRoute() {
  let tempPathList = history.state.current.split("/");
  if (tempPathList.length >= 4) {
    if (tempPathList[3] === "design") {
      innerRoute.value = 1;
    } else {
      innerRoute.value = 0;
    }
  } else if (tempPathList.length === 3) {
    innerRoute.value = 0;
  }
}

function getImgUrl(e: any) {
  e.target.src = defaultImg;
}
function onClickBack() {
  // if (history.state.back === null) {
  //   router.push("/");
  // } else {
  //   router.back();
  // }
  router.push("/");
}

function onClickUrl(url: string | undefined) {
  if (url != undefined) {
    window.open(url, "_blank");
  } else {
  }
}

function onClickHome() {
  router.push({ path: "/" });
}
</script>

<template>
  <main class="" id="storeScrollEle">
    <div v-if="getStoreInfo.id != undefined" class="">
      <div class="relative">
        <img
          src="@/assets/img/icon/backword.svg"
          class="absolute w-7 hover:cursor-pointer rounded-full bg-slate-200 p-1 ml-3 mt-4"
          @click="onClickBack()"
        />
        <img
          v-if="getStoreInfo.profileImage != undefined"
          :src="getStoreInfo.profileImage.link"
          class="w-full object-cover h-25v flex-none"
          @error="getImgUrl"
        />
        <img
          v-else
          src="@/assets/img/default/chuuka.png"
          class="w-full object-cover h-25v"
          @error="getImgUrl"
        />
      </div>
      <div class="x-basic-padding pt-4 pb-2 relative">
        <div class="absolute flex -top-6">
          <a
            :href="'https://pf.kakao.com/' + getStoreInfo.sns.kakaoTalk"
            target="_blank"
          >
            <img src="@/assets/img/icon/kakaoBorder.svg" class="w-12" />
          </a>
          <a
            :href="'https://www.instagram.com/' + getStoreInfo.sns.instagram"
            target="_blank"
            class="ml-4"
          >
            <img src="@/assets/img/icon/instagramBorder.svg" class="w-12" />
          </a>
        </div>
        <!-- 이름과 인스타그램 -->
        <div class="flex mt-6">
          <!-- <div class="my-auto flex"> -->
          <div class="my-auto">
            <span class="text-xl font-bold">{{ getStoreInfo.name }}</span>
          </div>
        </div>

        <div class="flex text-base font-medium mt-3">
          <img src="@/assets/img/icon/location.svg" class="w-4 mx-0.5" />
          <span class="text-sm ml-2 mt-1 text-left text-neutral-500">{{
            getStoreInfo.location
          }}</span>
          <div class="flex mt-0.5">
            <a
              class="map-font"
              v-if="getStoreInfo.locationUrl === undefined"
              target="_blank"
            >
              <span> </span>
            </a>
            <a
              class="map-font"
              v-else-if="getStoreInfo.locationUrl.naver != undefined"
              :href="'https://naver.me/' + getStoreInfo.locationUrl.naver"
              target="_blank"
            >
              <span class=""> 지도 </span>
            </a>
            <a
              class="map-font"
              v-else-if="getStoreInfo.locationUrl.kakao != undefined"
              :href="
                'https://place.map.kakao.com/' + getStoreInfo.locationUrl.kakao
              "
              target="_blank"
            >
              <span> 지도 </span>
            </a>
          </div>
        </div>
        <div class="flex mt-4">
          <div
            v-for="(hashTag, index) in getStoreInfo.hashTags"
            :key="index"
            class="text-xs font-medium border-main border py-2 px-2.5 rounded-md mr-2"
          >
            #{{ hashTag }}
          </div>
        </div>
      </div>
      <hr class="bg-mid-gray mt-2 x-basic-margin" />

      <!-- NOTE 가게링크 -->
      <div class="x-basic-padding pb-3">
        <div class="">
          <button
            class="text-lg justify-center flex btn-main"
            @click="
              onClickUrl(
                'https://pf.kakao.com/' + getStoreInfo.sns.kakaoTalk + '/chat'
              )
            "
          >
            <div class="flex my-auto">
              <img src="@/assets/img/icon/kakao.svg" class="w-7 mr-4" />
              <span>카카오 채널 상담하기</span>
            </div>
          </button>
          <button
            class="text-lg justify-center flex btn-sub"
            v-for="(url, index) in getStoreInfo.storeButtons"
            :key="index"
            @click="onClickUrl(url.url)"
          >
            <div class="flex my-auto">
              <span>{{ url.name }}</span>
            </div>
          </button>
        </div>
      </div>

      <div class="bg-neutral-100 h-2.5"></div>

      <!-- NOTE 탭 -->
      <div class="">
        <div class="text-base font-medium flex mx-3">
          <router-link
            :to="'/store/' + getStoreInfo.id + '/introduction'"
            class="w-full h-full py-2.5"
            :class="innerRoute === 0 ? 'border-b-main border-b-4' : ''"
            @click="innerRoute = 0"
          >
            가게 소개
          </router-link>
          <router-link
            :to="'/store/' + getStoreInfo.id + '/design'"
            class="w-full h-full py-2.5"
            :class="innerRoute === 1 ? 'border-b-main border-b-4' : ''"
            @click="innerRoute = 1"
          >
            디자인
          </router-link>
        </div>

        <div class="text-base text-left x-basic-padding">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div v-else class="">
      <img src="@/assets/gif/loadingIcon.gif" v-show="loading" />
      <div v-show="!loading">
        <span class="mt-4 text-lg font-bold logo">CHUUKA</span>
        <div class="mt-20">해당 가게가 없습니다.</div>
        <button
          class="text-usual-blue inline-block align-bottom"
          @click="onClickHome()"
        >
          돌아가기
        </button>
      </div>
    </div>
    <div class="h-28"></div>
  </main>
</template>

<style scoped>
.logo {
  font-style: italic;
  font-family: "Montserrat", sans-serif;
}

.map-font {
  @apply text-usual-blue ml-2 mt-auto inline-block align-bottom w-10 text-base;
}

.store-content-block {
  @apply border border-mid-gray shadow-sm rounded-md p-3;
}
</style>
