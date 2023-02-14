<script setup lang="ts">
import { getStoreInfoById } from "@/api/m1/store";
import { ref, onMounted, onUpdated, onActivated, watch } from "vue";
import defaultImg from "@/assets/img/logo/chuuka.png";
import { router } from "@/router/router";
import { useStoreInfoStore } from "@/stores/storeInfo";
import { storeToRefs } from "pinia";
import { useClipboard } from "@vueuse/core";
import { toastSuccess } from "@/utils/toast";
import { useRoute } from "vue-router";
import FixedBottomButton from "@/components/button/FixedBottomButton.vue";

// ANCHOR 선언
const source = ref("Hello");
const { text, copy, copied, isSupported } = useClipboard({ source });

const pinia = useStoreInfoStore();
const { getStoreInfo } = storeToRefs(pinia);
const { setStoreInfo } = pinia;

const innerRoute = ref(0);
const loading = ref(false);
const route = useRoute();

// ANCHOR 이벤트
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

// ANCHOR 함수
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
// 변경필요
function initInnerRoute() {
  const path = route.path.split("/").reverse()[0];
  if (path === "news") innerRoute.value = 1;
  else if (path === "design") innerRoute.value = 2;
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
      <FixedBottomButton
        name="케이크 주문/상담하러 가기"
        :nav-link="
          'https://pf.kakao.com/' +
          getStoreInfo.sns.kakaoTalk +
          (getStoreInfo.isJoined ? '/chat' : '')
        "
      ></FixedBottomButton>
      <div class="relative">
        <img
          src="@/assets/img/icon/backword.svg"
          class="absolute w-10 hover:cursor-pointer rounded-full text-white p-1 ml-3 mt-4"
          @click="onClickBack()"
        />
        <img
          v-if="
            getStoreInfo.profileImage != undefined &&
            getStoreInfo.profileImage.link != '' &&
            getStoreInfo.isJoined
          "
          :src="getStoreInfo.profileImage.link"
          class="w-full object-cover h-25v flex-none"
          @error="getImgUrl"
        />
        <div v-else class="h-25v w-full flex bg-light-gray">
          <div class="m-auto w-full">
            <img
              src="@/assets/img/default/chuuka_bold_gray.svg"
              class="w-2/5 mx-auto"
              @error="getImgUrl"
            />
            <p
              class="font-bold text-text-gray text-base mt-4"
              v-show="!getStoreInfo.isJoined"
            >
              해당 업체는 미입점되어 사진이 없습니다.
            </p>
          </div>
        </div>
      </div>

      <div class="x-basic-padding pt-4 pb-2 relative">
        <div class="absolute flex -top-6 right-3">
          <!-- NOTE 카카오톡 버튼 -->
          <a
            :href="'https://pf.kakao.com/' + getStoreInfo.sns.kakaoTalk"
            target="_blank"
          >
            <img src="@/assets/img/icon/kakaoBorder.svg" class="w-12" />
          </a>
          <!-- NOTE 인스타그램 버튼 -->
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
          <span
            class="text-sm ml-2 mt-1 text-left text-neutral-500 cursor-pointer"
            @click="
              () => {
                source = getStoreInfo.location;
                copy();
                if (copied) toastSuccess('주소를 복사했어요');
              }
            "
            >{{ getStoreInfo.location }}</span
          >
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

      <!-- ANCHOR 가게링크 -->
      <div class="x-basic-padding pb-3">
        <div class="">
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

      <!-- ANCHOR 소개 -->
      <div>
        <div
          class="whitespace-pre-line font-medium text-sm mt-2 text-left px-3 mb-3"
        >
          {{ getStoreInfo.introduction }}
        </div>
      </div>

      <!-- <div class="bg-neutral-100 h-2.5"></div> -->

      <!-- NOTE 탭 -->
      <div class="">
        <!-- ANCHOR 소개 not Joined -->
        <!-- <div
          class="text-base font-medium flex mx-3"
          v-if="!getStoreInfo.isJoined"
        >
          <p
            class="w-full h-full py-2.5 border-b-4 border-b-text-gray text-text-gray"
          >
            소개
          </p>
        </div> -->

        <!-- ANCHOR 소개 not Managed -->
        <!-- <div
          class="text-base font-medium flex mx-3"
          v-if="!getStoreInfo.isManaged"
        >
          <p class="w-full h-full py-2.5 border-b-4 border-b-main">소개</p>
        </div> -->

        <!-- ANCHOR Joined & Managed -->
        <div
          class="text-base font-medium flex gap-3 mx-3 border-b"
          v-if="getStoreInfo.isManaged"
        >
          <router-link
            :to="'/store/' + getStoreInfo.id + '/introduction'"
            class="w-full h-full py-2.5"
            :class="innerRoute === 0 ? 'border-b-main border-b-4' : ''"
            @click="innerRoute = 0"
            replace
          >
            필독사항
          </router-link>
          <router-link
            :to="'/store/' + getStoreInfo.id + '/news'"
            class="w-full h-full py-2.5"
            :class="innerRoute === 1 ? 'border-b-main border-b-4' : ''"
            @click="innerRoute = 1"
            replace
          >
            일정/소식
          </router-link>
          <router-link
            :to="'/store/' + getStoreInfo.id + '/design'"
            class="w-full h-full py-2.5"
            :class="innerRoute === 2 ? 'border-b-main border-b-4' : ''"
            @click="innerRoute = 2"
            replace
          >
            디자인
          </router-link>
        </div>

        <!-- ANCHOR alert -->
        <div class="text-base text-left x-basic-padding">
          <router-view v-if="getStoreInfo.isJoined"></router-view>
          <div v-else class="mt-4 bg-light-gray rounded-lg p-3">
            <img src="@/assets/img/icon/lock.svg" class="mx-auto" />
            <p
              class="text-text-gray font-medium text-base text-center mt-4 mb-2"
            >
              해당 가게는 추카에 가입한 가게가 아니에요
            </p>
          </div>
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
