<script setup lang="ts">
import { IStore, IUrl, getStoreInfoById, IMustRead } from "@/api/m1/store";
import { ref, onMounted, getCurrentInstance, onActivated } from "vue";
import defaultImg from "@/assets/img/logo/chuuka.png";
import { router } from "@/router/router";
import { toastInfo, toastSuccess } from "@/utils/toast";
import { IProduct, getAllProduct } from "@/api/m1/product";
import { getAllNews, INews } from "@/api/m1/news";
import { Timestamp } from "@firebase/firestore";
import { Agent, globalAgent } from "https";
import { getKoreanDateTime } from "@/utils/moment";
import { useStoreInfoStore } from "@/stores/storeInfo";
import { storeToRefs } from "pinia";

const pinia = useStoreInfoStore();
const { getStoreInfo } = storeToRefs(pinia);
const { setStoreInfo } = pinia;

const productList = ref([] as IProduct[]);
const newsList = ref([] as INews[]);
const isDesignBtnClicked = ref(false);
const isNewsBtnClicked = ref(false);
const innerRoute = ref(0);

const loading = ref(false);

onMounted(() => {
  init();
  initInnerRoute();
});
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
  let tempPathList = window.location.pathname.split("/");
  if (tempPathList.length >= 4) {
    if (tempPathList[3] === "news") {
      innerRoute.value = 1;
    } else if (tempPathList[3] === "design") {
      innerRoute.value = 2;
    }
  }
  // if(window.location.pathname.split('/'))
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

function onClickUrl(urlKey: IUrl) {
  if (urlKey != undefined) {
    window.open(urlKey.url, "_blank");
  } else {
    // console.log("이상해용");
  }
}

function onClickHome() {
  router.push({ path: "/" });
}
</script>

<template>
  <main class="overflow-auto overflow-x-hidden w-full noScroll">
    <div v-if="getStoreInfo.id != undefined" class="">
      <div class="custom-width">
        <img
          src="@/assets/img/icon/backword.svg"
          class="fixed w-7 hover:cursor-pointer rounded-full bg-slate-200 p-1 ml-3 mt-4"
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
      <div class="px-3 pt-4 pb-2">
        <!-- 이름과 인스타그램 -->
        <div class="flex">
          <!-- <div class="my-auto flex"> -->
          <div class="my-auto">
            <span class="text-xl font-bold">{{ getStoreInfo.name }}</span>
          </div>

          <a
            class="ml-3 flex"
            :href="'https://www.instagram.com/' + getStoreInfo.sns.instagram"
            target="_blank"
          >
            <img src="@/assets/img/icon/instagram.svg" class="w-5" />
            <div>
              <span
                class="instagram text-lg ml-1.5"
                style="font-family: Roboto"
                >{{ getStoreInfo.sns.instagram }}</span
              >
            </div>
          </a>
        </div>

        <div class="flex text-base mt-1">
          <img src="@/assets/img/icon/location.svg" class="w-4 mx-0.5" />
          <span class="text-sm ml-2 mt-1 text-left text-neutral-500">{{
            getStoreInfo.location
          }}</span>
          <div class="flex mt-1">
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
        <div class="flex mt-3">
          <div
            v-for="(hashTag, index) in getStoreInfo.hashTags"
            :key="index"
            class="text-xs border-main border py-2 pl-1.5 pr-2 rounded-md mr-2"
          >
            #{{ hashTag }}
          </div>
        </div>
        <!-- <hr class="border-neutral-200 mt-5" v-if="store.goUrl != undefined" /> -->
      </div>
      <hr
        class="border-neutral-200 mt-5"
        v-if="getStoreInfo.goUrl != undefined"
      />

      <!-- NOTE 가게링크 -->
      <div class="px-3 pb-3">
        <div>
          <button
            class="text-lg"
            :class="index === 0 ? 'btn-main' : 'btn-sub'"
            v-for="(url, index) in getStoreInfo.goUrl"
            :key="index"
            @click="onClickUrl(url)"
          >
            <span>{{ url.name }}</span>
          </button>
        </div>
      </div>

      <div class="bg-neutral-100 h-2"></div>

      <!-- NOTE 탭 -->
      <div class="">
        <div class="text-base font-medium flex">
          <router-link
            :to="'/store/' + getStoreInfo.id + '/mustRead'"
            class="w-full h-full py-2.5"
            :class="innerRoute === 0 ? 'border-b-main border-b-4' : ''"
            @click="innerRoute = 0"
          >
            필독 사항
          </router-link>
          <router-link
            :to="'/store/' + getStoreInfo.id + '/news'"
            class="w-full h-full py-2.5"
            :class="innerRoute === 1 ? 'border-b-main border-b-4' : ''"
            @click="innerRoute = 1"
          >
            일정/소식
          </router-link>
          <router-link
            :to="'/store/' + getStoreInfo.id + '/design'"
            class="w-full h-full py-2.5"
            :class="innerRoute === 2 ? 'border-b-main border-b-4' : ''"
            @click="innerRoute = 2"
          >
            디자인
          </router-link>
        </div>

        <div class="text-base text-left">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div v-else class="custom-width">
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

<style scoped>
.instagram {
  color: rgba(4, 151, 249, 1);
}
.logo {
  font-style: italic;
  font-family: "Montserrat", sans-serif;
}

.map-font {
  @apply instagram ml-2 mt-auto inline-block align-bottom w-10 text-base;
}

.store-content-block {
  @apply border border-mid-gray shadow-sm rounded-md p-3;
}

.noScroll::-webkit-scrollbar {
  display: none;
}
.noscroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 448px) {
  .custom-width {
    width: 100vw;
  }
}
@media (min-width: 448px) {
  .custom-width {
    width: 448px;
  }
}
</style>
