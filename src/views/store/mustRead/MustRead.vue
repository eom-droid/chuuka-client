<template>
  <!-- NOTE 필독 사항 -->
  <div>
    <div class="text-sm font-medium flex mx-3">
      <button class="btn-main text-base" @click="onClickCopyOrderFrom()">
        주문 양식 복사
      </button>
      <!-- ios에서 복사여부 확인하기 -->
      <textarea
        v-model="mustRead.orderForm.content"
        id="clipboard"
        class="clipboardCss"
      ></textarea>
    </div>

    <div class="my-2 mx-3"><hr /></div>
    <div class="m-3 grid gap-3">
      <!-- 필독사항/주문방법 -->
      <div class="store-content-block">
        <div
          @click="mustRead.orderMethod.isOpen = !mustRead.orderMethod.isOpen"
          class="flex justify-between cursor-pointer"
        >
          <div>
            {{ sections.orderMethod }}
          </div>
          <div v-show="!mustRead.orderMethod.isOpen">
            펼치기<font-awesome-icon
              icon="chevron-down"
              class="text-main ml-2"
            />
          </div>
          <div v-show="mustRead.orderMethod.isOpen">
            접기<font-awesome-icon icon="chevron-up" class="text-main ml-2" />
          </div>
        </div>
        <div
          v-show="mustRead.orderMethod.isOpen"
          class="mt-1 text-sm whitespace-pre-line"
        >
          {{ mustRead.orderMethod.content }}
        </div>
      </div>
      <!-- 필독사항/크기시트 -->
      <div class="store-content-block">
        <div
          @click="mustRead.sizeAndSheet.isOpen = !mustRead.sizeAndSheet.isOpen"
          class="flex justify-between cursor-pointer"
        >
          <div>
            {{ sections.sizeAndSheet }}
          </div>
          <div v-show="!mustRead.sizeAndSheet.isOpen">
            펼치기<font-awesome-icon
              icon="chevron-down"
              class="text-main ml-2"
            />
          </div>
          <div v-show="mustRead.sizeAndSheet.isOpen">
            접기<font-awesome-icon icon="chevron-up" class="text-main ml-2" />
          </div>
        </div>
        <div
          v-show="mustRead.sizeAndSheet.isOpen"
          class="mt-1 text-sm whitespace-pre-line"
        >
          {{ mustRead.sizeAndSheet.content }}
        </div>
      </div>
      <!-- 필독사항/유의사항 -->
      <div class="store-content-block">
        <div
          @click="mustRead.notice.isOpen = !mustRead.notice.isOpen"
          class="flex justify-between cursor-pointer"
        >
          <div>{{ sections.notice }}</div>
          <div v-show="!mustRead.notice.isOpen">
            펼치기<font-awesome-icon
              icon="chevron-down"
              class="text-main ml-2"
            />
          </div>
          <div v-show="mustRead.notice.isOpen">
            접기<font-awesome-icon icon="chevron-up" class="text-main ml-2" />
          </div>
        </div>
        <div
          v-show="mustRead.notice.isOpen"
          class="mt-1 text-sm whitespace-pre-line"
        >
          {{ mustRead.notice.content }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStoreInfoStore } from "@/stores/storeInfo";
import { toastSuccess } from "@/utils/toast";
import { ref, onMounted } from "vue";

const pinia = useStoreInfoStore();
const { getStoreInfo } = pinia;
const mustRead = ref({
  orderForm: { isOpen: false, content: "" },
  orderMethod: { isOpen: false, content: "" },
  sizeAndSheet: { isOpen: false, content: "" },
  notice: { isOpen: false, content: "" },
});

const sections = {
  orderForm: "주문양식",
  orderMethod: "주문방법",
  sizeAndSheet: "크기/맛",
  notice: "유의사항",
};

onMounted(() => {
  init();
});
function init() {
  mustRead.value.orderForm.content = getStoreInfo.mustRead.orderForm;
  mustRead.value.orderMethod.content = getStoreInfo.mustRead.orderMethod;
  mustRead.value.sizeAndSheet.content = getStoreInfo.mustRead.sizeAndSheet;
  mustRead.value.notice.content = getStoreInfo.mustRead.notice;
}

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
  toastSuccess("주문 양식을 복사했어요");
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
<style>
.clipboardCss {
  opacity: 0.01;
  /* height: 1; */
  position: absolute;
  z-index: -1;
}
.store-content-block {
  @apply border border-mid-gray shadow-sm rounded-md p-3;
}
</style>
