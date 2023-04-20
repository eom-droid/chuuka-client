<!-- <template>
  <div
    class="mb-1.5 pb-4 px-4 pt-6 bg-white"
  >
    <div class="flex">
      <span class="text-base font-bold">{{ eachStore.store.name }}</span>

      <div
        class="text-xs rounded-20 h-6 flex px-3 ml-3"
        :class="
          drawingMarkers[eachStore.indexOfDrawingMarkers].isWorkingNow === 1
            ? 'bg-sub text-main'
            : 'bg-light-gray text-font-gray'
        "
      >
        <span class="m-auto">{{
          drawingMarkers[eachStore.indexOfDrawingMarkers].isWorkingNow === 1
            ? "영업 중 "
            : drawingMarkers[eachStore.indexOfDrawingMarkers].isWorkingNow ===
              -1
            ? "정보 없음"
            : "영업 종료"
        }}</span>
      </div>
    </div>
    <div class="flex mt-5">
      <img src="@/assets/img/icon/bx-map1.svg" class="w-5" />
      <span
        class="text-xs ml-2 my-auto text-font-gray text-left"
        style="max-width: 80%"
        >{{ eachStore.store.address }}</span
      >
      <a
        class="text-usual-blue text-xs my-auto ml-3 flex-none"
        :href="'https://m.place.naver.com/restaurant/' + eachStore.store.id"
        target="_blank"
        >지도</a
      >
    </div>
    <div class="text-xs">
      <div class="flex mt-4">
        <img src="@/assets/img/icon/bx-cake2.svg" />
        <span class="ml-2 my-auto">당일케이크</span>
        <span
          class="text-main font-medium ml-2 my-auto"
          :class="
            eachStore.store.theDayOrderAble === 1
              ? 'text-main'
              : 'text-font-gray'
          "
          >{{
            eachStore.store.theDayOrderAble === 1
              ? "가능"
              : eachStore.store.theDayOrderAble === -1
              ? "문의 필요"
              : "불가능"
          }}</span
        >
      </div>
      <div
        class="flex mt-4 text-xs cursor-pointer"
        @click="eachStore.showFullSchedule = !eachStore.showFullSchedule"
      >
        <img
          src="@/assets/img/icon/bx-time-five1.svg"
          class="mb-auto"
        />
        <div
          class="ml-2"
          style="margin-top: 2px"
          v-html="
            getSibal(eachStore.store.openCloseHour, eachStore.showFullSchedule)
          "
        ></div>

        <img
          src="@/assets/img/icon/down_arrow.svg"
          class="mb-auto ml-2"
          v-show="!eachStore.showFullSchedule"
        />
        <img
          src="@/assets/img/icon/up_arrow.svg"
          class="mb-auto ml-2"
          v-show="eachStore.showFullSchedule"
        />
      </div>
    </div>
    <hr class="mt-4 mb-2" />
    <div class="flex">
      <a
        class="border-r border-r-light-gray w-full flex py-2 mx-auto justify-center"
        :class="eachStore.store.telephone ? '' : 'pointer-events-none'"
        :href="
          eachStore.store.telephone ? 'tel:' + eachStore.store.telephone : ''
        "
      >
        <img
          src="@/assets/img/icon/small-phone.svg"
          v-if="eachStore.store.telephone"
          class="w-5"
        />
        <img
          src="@/assets/img/icon/small-phone-mid-gray.svg"
          v-else
          class="w-5"
        />
        <span
          class="text-sm ml-3"
          :class="
            eachStore.store.telephone ? 'text-usual-black' : 'text-mid-gray'
          "
          >전화하기</span
        >
      </a>
      <a
        class="border-r border-r-light-gray w-full flex py-2 mx-auto justify-center"
        :class="eachStore.store.sns.kakaoTalk ? '' : ' pointer-events-none'"
        :href="
          eachStore.store.sns.kakaoTalk
            ? 'https://pf.kakao.com/' + eachStore.store.sns.kakaoTalk
            : ''
        "
        target="_blank"
      >
        <img
          src="@/assets/img/icon/small-kakao.svg"
          v-if="eachStore.store.sns.kakaoTalk"
          class="w-5"
        />
        <img
          src="@/assets/img/icon/small-kakao-mid-gray.svg"
          v-else
          class="w-5"
        />
        <span
          class="text-sm ml-3"
          :class="
            eachStore.store.sns.kakaoTalk ? 'text-usual-black' : 'text-mid-gray'
          "
          >카카오 채널</span
        >
      </a>
      <a
        class="w-full flex py-2 mx-auto justify-center"
        target="_blank"
        :class="eachStore.store.sns.instagram ? '' : ' pointer-events-none'"
        :href="
          eachStore.store.sns.instagram
            ? 'https://www.instagram.com/' + eachStore.store.sns.instagram
            : ''
        "
      >
        <img
          src="@/assets/img/icon/small-instagram.svg"
          v-if="eachStore.store.sns.instagram"
          class="w-5"
        />
        <img
          src="@/assets/img/icon/small-instagram-mid-gray.svg"
          v-else
          class="w-5"
        />
        <span
          class="text-sm ml-3"
          :class="
            eachStore.store.sns.instagram ? 'text-usual-black' : 'text-mid-gray'
          "
          >인스타그램</span
        >
      </a>
    </div>
  </div>
</template>


<script setup lang="ts">


interface Props{
    
}


</script> -->
