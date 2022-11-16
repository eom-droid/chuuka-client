<script setup lang="ts">
import { IStore, IUrl, getStoreInfoById, IMustRead } from "@/api/m1/store";
import { ref, onMounted, getCurrentInstance } from "vue";
import defaultImg from "@/assets/img/logo/chuuka.png";
import { router } from "@/router/router";
import { toastInfo, toastSuccess } from "@/utils/toast";
import { IProduct, getAllProduct } from "@/api/m1/product";
import { getAllNews, INews } from "@/api/m1/news";
import { Timestamp } from "@firebase/firestore";
import { Agent, globalAgent } from "https";
import { getKoreanDateTime } from "@/utils/moment";

const store = ref({} as IStore);
const productList = ref([] as IProduct[]);
const newsList = ref([] as INews[]);
const isDesignBtnClicked = ref(false);
const isNewsBtnClicked = ref(false);
const innerRoute = ref(0);

const loading = ref(false);
const isDirectToStore = ref(false);

const fooNewsList = [
  {
    id: "id1",
    title: "제목",
    content: "내용",
    photos: [],
    regWriter: "",
    modWriter: "",
    isHidden: false,
    regDtime: Timestamp.fromDate(new Date()),
    modDtime: Timestamp.fromDate(new Date()),
  },
  {
    id: "id2",
    title: "제목",
    content: "내용",
    photos: [],
    regWriter: "",
    modWriter: "",
    isHidden: false,
    regDtime: Timestamp.fromDate(new Date()),
    modDtime: Timestamp.fromDate(new Date()),
  },
] as INews[];

const sections = {
  orderForm: "주문양식",
  orderMethod: "주문방법",
  sizeAndSheet: "크기/맛",
  notice: "유의사항",
};

// let fooMustRead = ref({
//   sections.orderForm{
//     title: "주문방법",
//     content: "주문방법 콘텐츠",
//     isOpen: false,
//   },
//   {
//     title: "크기/맛",
//     content: "크기/맛 콘텐츠",
//     isOpen: false,
//   },
//   {
//     title: "유의 사항",
//     content: "유의 사항 콘텐츠",
//     isOpen: false,
//   },
// });

const fooMustRead = ref({
  // orderForm: { isOpen: false, content: "" },
  orderMethod: { isOpen: false, content: "" },
  sizeAndSheet: { isOpen: false, content: "" },
  notice: { isOpen: false, content: "" },
});

onMounted(() => {
  init();
});
async function init() {
  let tempStoreInfo = window.localStorage.getItem("tempStoreInfo");

  if (tempStoreInfo != null && history.state.back != null) {
    isDirectToStore.value = false;
    store.value = JSON.parse(tempStoreInfo) as IStore;
    // changeNewLine(store.value.introduction);
  } else {
    isDirectToStore.value = true;
    loading.value = true;
    let tempPath = document.location.pathname.split("/");

    if (tempPath.length > 2) {
      let tempResult = await getStoreInfoById(tempPath[2]);
      if (tempResult != null) store.value = tempResult;
    }
    loading.value = false;
  }
  initFooMustRead();
}

function initFooMustRead() {
  if (store.value.mustRead != undefined) {
    if (store.value.mustRead.orderMethod != undefined) {
      fooMustRead.value.orderMethod.content = store.value.mustRead.orderMethod;
    }
    if (store.value.mustRead.notice != undefined) {
      fooMustRead.value.notice.content = store.value.mustRead.notice;
    }
    if (store.value.mustRead.sizeAndSheet != undefined) {
      fooMustRead.value.sizeAndSheet.content =
        store.value.mustRead.sizeAndSheet;
    }
  }
}

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
    // console.log("이상해용");
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

function onClickInnerRoute(to: number) {
  if (innerRoute.value === to) return;
  innerRoute.value = to;
  if (to === 1) {
    if (!isNewsBtnClicked.value) {
      initNews();
    }
  }

  if (to === 2) {
    if (!isDesignBtnClicked.value) {
      initProduct();
    }
  }
}
async function initProduct() {
  productList.value = await getAllProduct(store.value.id);
  isDesignBtnClicked.value = true;
}
async function initNews() {
  newsList.value = await getAllNews(store.value.id);
  isNewsBtnClicked.value = true;
}

// function onClickCopyOrderFrom() {
//   console.log(store.value.mustRead.orderForm);
// }

///////////////////////양식 복사하기

// 버튼 클릭 했을 때
// 이거 안됨 ㅅㅂ
// <!-- ios에서 복사여부 확인하기 -->
function onClickCopyOrderFrom() {
  /* Get the text field */
  var copyText = document.getElementById("clipboard");

  var isIOS = navigator.userAgent.match(/i(Phone|Pod)/i) != null ? true : false;

  if (isIOS) {
    // ios 일때
    iosCopyToClipboard(copyText);
  } else {
    // ios가 아닐때
    copyToClipboard(copyText);
  }

  /* Alert the copied text */
  // alert("copy 되었습니다.");
  toastSuccess("클립보드 복사완료~");
  return false;
}

// ios가 아닐 때
function copyToClipboard(copyText: any) {
  /* Select the text field */
  copyText.select();

  /* Copy the text inside the text field */
  document.execCommand("copy");
}

// ios 일때
function iosCopyToClipboard(el: any) {
  var oldContentEditable = el.contentEditable,
    oldReadOnly = el.readOnly,
    range = document.createRange();

  el.contentEditable = true;
  el.readOnly = false;
  range.selectNodeContents(el);

  var s = window.getSelection();
  if (s != null) {
    s.removeAllRanges();
    s.addRange(range);
  }

  // A big number, to cover anything that could be inside the element.
  el.setSelectionRange(0, 999999);

  el.contentEditable = oldContentEditable;
  el.readOnly = oldReadOnly;

  document.execCommand("copy");
}
</script>

<template>
  <main class="overflow-auto overflow-x-hidden w-full noScroll">
    <div v-if="store.id != undefined" class="">
      <div class="custom-width">
        <img
          src="@/assets/img/icon/backword.svg"
          class="fixed w-7 hover:cursor-pointer rounded-full bg-slate-200 p-1 ml-3 mt-4"
          @click="onClickBack()"
        />
        <img
          v-if="store.profileImage != undefined"
          :src="store.profileImage.link"
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
          <span class="text-sm ml-2 mt-1 text-left text-neutral-500">{{
            store.location
          }}</span>
          <div class="flex mt-1">
            <a
              class="map-font"
              v-if="store.locationUrl === undefined"
              target="_blank"
            >
              <span> </span>
            </a>
            <a
              class="map-font"
              v-else-if="store.locationUrl.naver != undefined"
              :href="'https://naver.me/' + store.locationUrl.naver"
              target="_blank"
            >
              <span class=""> 지도 </span>
            </a>
            <a
              class="map-font"
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
            class="text-xs border-main border py-2 pl-1.5 pr-2 rounded-md mr-2"
          >
            #{{ hashTag }}
          </div>
        </div>
        <!-- <hr class="border-neutral-200 mt-5" v-if="store.goUrl != undefined" /> -->
      </div>
      <hr class="border-neutral-200 mt-5" v-if="store.goUrl != undefined" />

      <!-- NOTE 가게링크 -->
      <div class="px-3 pb-3">
        <div>
          <button
            class="text-lg"
            :class="index === 0 ? 'btn-main' : 'btn-sub'"
            v-for="(url, index) in store.goUrl"
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
          <button
            class="w-full h-full py-2.5"
            :class="innerRoute === 0 ? 'border-b-main border-b-4' : ''"
            @click="onClickInnerRoute(0)"
          >
            필독 사항
          </button>
          <button
            class="w-full h-full py-2.5"
            :class="innerRoute === 1 ? 'border-b-main border-b-4' : ''"
            @click="onClickInnerRoute(1)"
          >
            일정/소식
          </button>
          <button
            class="w-full h-full py-2.5"
            :class="innerRoute === 2 ? 'border-b-main border-b-4' : ''"
            @click="onClickInnerRoute(2)"
          >
            디자인
          </button>
        </div>

        <div class="text-base text-left">
          <!-- NOTE 필독 사항 -->
          <div v-show="innerRoute === 0">
            <div class="text-sm font-medium flex mx-3">
              <button
                class="btn-main text-base"
                @click="onClickCopyOrderFrom()"
              >
                주문 양식 복사
              </button>
              <!-- ios에서 복사여부 확인하기 -->
              <textarea
                v-model="store.mustRead.orderForm"
                id="clipboard"
                class="clipboardCss"
              ></textarea>
            </div>

            <div class="my-2 mx-3"><hr /></div>
            <div class="m-3 grid gap-3">
              <!-- 필독사항/주문방법 -->
              <div class="store-content-block">
                <div
                  @click="
                    fooMustRead.orderMethod.isOpen =
                      !fooMustRead.orderMethod.isOpen
                  "
                  class="flex justify-between cursor-pointer"
                >
                  <div>
                    {{ sections.orderMethod }}
                  </div>
                  <div v-show="!fooMustRead.orderMethod.isOpen">
                    펼치기<font-awesome-icon
                      icon="chevron-down"
                      class="text-main ml-2"
                    />
                  </div>
                  <div v-show="fooMustRead.orderMethod.isOpen">
                    접기<font-awesome-icon
                      icon="chevron-up"
                      class="text-main ml-2"
                    />
                  </div>
                </div>
                <div
                  v-show="fooMustRead.orderMethod.isOpen"
                  class="mt-1 text-sm whitespace-pre-line"
                >
                  {{ fooMustRead.orderMethod.content }}
                </div>
              </div>
              <!-- 필독사항/크기시트 -->
              <div class="store-content-block">
                <div
                  @click="
                    fooMustRead.sizeAndSheet.isOpen =
                      !fooMustRead.sizeAndSheet.isOpen
                  "
                  class="flex justify-between cursor-pointer"
                >
                  <div>
                    {{ sections.sizeAndSheet }}
                  </div>
                  <div v-show="!fooMustRead.sizeAndSheet.isOpen">
                    펼치기<font-awesome-icon
                      icon="chevron-down"
                      class="text-main ml-2"
                    />
                  </div>
                  <div v-show="fooMustRead.sizeAndSheet.isOpen">
                    접기<font-awesome-icon
                      icon="chevron-up"
                      class="text-main ml-2"
                    />
                  </div>
                </div>
                <div
                  v-show="fooMustRead.sizeAndSheet.isOpen"
                  class="mt-1 text-sm whitespace-pre-line"
                >
                  {{ fooMustRead.sizeAndSheet.content }}
                </div>
              </div>
              <!-- 필독사항/유의사항 -->
              <div class="store-content-block">
                <div
                  @click="
                    fooMustRead.notice.isOpen = !fooMustRead.notice.isOpen
                  "
                  class="flex justify-between cursor-pointer"
                >
                  <div>{{ sections.notice }}</div>
                  <div v-show="!fooMustRead.notice.isOpen">
                    펼치기<font-awesome-icon
                      icon="chevron-down"
                      class="text-main ml-2"
                    />
                  </div>
                  <div v-show="fooMustRead.notice.isOpen">
                    접기<font-awesome-icon
                      icon="chevron-up"
                      class="text-main ml-2"
                    />
                  </div>
                </div>
                <div
                  v-show="fooMustRead.notice.isOpen"
                  class="mt-1 text-sm whitespace-pre-line"
                >
                  {{ fooMustRead.notice.content }}
                </div>
              </div>
              <!-- <div
                v-for="(item, index) in fooMustRead"
                :key="index"
                class="store-content-block"
              >
                <div
                  @click="item.isOpen = !item.isOpen"
                  class="flex justify-between cursor-pointer"
                >
                  <div>
                    {{ item.title }}
                  </div>
                  <div>
                    <div v-show="!item.isOpen">
                      펼치기<font-awesome-icon
                        icon="chevron-down"
                        class="text-main ml-2"
                      />
                    </div>
                    <div v-show="item.isOpen">
                      접기<font-awesome-icon
                        icon="chevron-up"
                        class="text-main ml-2"
                      />
                    </div>
                  </div>
                </div>
                <div v-show="item.isOpen" class="mt-1 text-sm">
                  {{ item.content }}
                </div>
              </div> -->
            </div>
          </div>

          <!-- NOTE 일정/소식 -->
          <div
            v-show="innerRoute === 1"
            class="text-left m-3 whitespace-pre-line grid gap-3 text-sm"
          >
            <img
              src="@/assets/gif/loadingIcon.gif"
              v-if="!isNewsBtnClicked"
              class="w-40"
            />
            <div
              v-for="(news, index) in newsList"
              :key="index"
              class="border border-mid-gray shadow-sm rounded-md px-3 pb-3 pt-2"
              v-else
            >
              <div class="text-xs">
                {{ getKoreanDateTime(news.modDtime.toDate()) }}
              </div>
              <div class="mt-1 my-3"><hr /></div>
              <div></div>
              <!-- 1. 사진 X -->
              <div
                v-if="
                  news.photos === undefined ||
                  news.photos.length === 0 ||
                  news.photos[0].link === ''
                "
              >
                <div class="text-base font-semibold">{{ news.title }}</div>
                <div class="text-sm mt-3 tracking-tighter leading-tight">
                  {{ news.content }}
                </div>
              </div>
              <!-- 2. 사진 O -->
              <!-- 2-2. 사진 한개 -->
              <div v-else-if="news.photos.length === 1">
                <div class="text-base font-semibold">{{ news.title }}</div>
                <div class="w-full border border-mid-gray mt-3">
                  <img
                    :src="news.photos[0].link"
                    class="w-full h-20v object-contain"
                  />
                </div>
                <div class="text-sm mt-3 tracking-tighter leading-tight">
                  {{ news.content }}
                </div>
              </div>
              <!-- 2-1. 사진 여러개 -->
              <div v-else>
                <div class="text-base font-semibold">{{ news.title }}</div>
                <div class="flex w-full mt-3 h-20v">
                  <div class="w-2/3 border border-mid-gray h-full">
                    <img
                      :src="news.photos[0].link"
                      class="object-contain h-full w-full"
                    />
                  </div>

                  <div class="w-1/3 ml-1 flex flex-col justify-between">
                    <div class="mb-1 w-full border border-mid-gray h-1/2">
                      <img
                        :src="news.photos[1].link"
                        class="object-contain w-full h-full"
                      />
                    </div>

                    <div
                      class="w-full font-medium h-1/2 bg-usual-black opacity-50 text-white text-2xl flex"
                    >
                      <span class="m-auto">
                        +{{ news.photos.length - 2 }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="text-sm mt-3 tracking-tighter leading-tight">
                  {{ news.content }}
                </div>
              </div>
            </div>
          </div>

          <!-- NOTE 디자인 -->
          <div v-show="innerRoute === 2" class="m-3">
            <img
              src="@/assets/gif/loadingIcon.gif"
              v-if="!isDesignBtnClicked"
              class="w-40"
            />
            <div v-else class="grid grid-cols-3 gap-0.5">
              <div
                v-for="(product, index) in productList"
                :key="index"
                class="w-full h-full imgRatio border border-mid-gray"
              >
                <img
                  :src="product.photos[0].link"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
            <div class="mt-5 text-neutral-500" v-if="productList.length <= 0">
              샘플 디자인이 없습니다.
            </div>
          </div>
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
.imgRatio {
  aspect-ratio: 1/1;
}
.clipboardCss {
  opacity: 0.01;
  /* height: 1; */
  position: absolute;
  z-index: -1;
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
