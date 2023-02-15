<template>
  <!-- NOTE 필독 사항 -->
  <div class="">
    <div class="text-sm font-medium flex">
      <button
        class="btn-sub-sub text-base font-bold"
        @click="onClickCopyOrderFrom()"
      >
        주문 양식 복사
      </button>
      <textarea
        readonly
        v-model="mustRead.orderForm.content"
        id="clipboard"
        class="clipboardCss"
      ></textarea>
    </div>

    <div class="my-3 grid gap-3">
      <!-- 필독사항 : 주문방법 -->
      <div class="store-content-block">
        <div
          @click="mustRead.orderMethod.isOpen = !mustRead.orderMethod.isOpen"
          class="flex justify-between cursor-pointer"
        >
          <div class="flex gap-3">
            <img src="@/assets/img/icon/pen.svg" class="w-5" />
            <span>{{ sections.orderMethod }}</span>
          </div>
          <div v-show="!mustRead.orderMethod.isOpen">
            <font-awesome-icon icon="chevron-down" class="text-sub-gray" />
          </div>
          <div v-show="mustRead.orderMethod.isOpen">
            <font-awesome-icon icon="chevron-up" class="text-sub-gray" />
          </div>
        </div>
        <div
          v-show="mustRead.orderMethod.isOpen"
          class="my-3 text-sm whitespace-pre-line"
        >
          <div v-if="mustRead.orderMethod.content != ''">
            {{ mustRead.orderMethod.content }}
          </div>
          <div v-else class="text-mid-gray">주문방법이 없습니다</div>
        </div>
      </div>

      <!-- 필독사항 : 크기시트 -->
      <div class="store-content-block">
        <div
          @click="mustRead.size.isOpen = !mustRead.size.isOpen"
          class="flex justify-between cursor-pointer"
        >
          <div class="flex gap-3">
            <img src="@/assets/img/icon/star.svg" class="w-5" />
            <span>크기/맛</span>
          </div>
          <div v-show="!mustRead.size.isOpen">
            <font-awesome-icon icon="chevron-down" class="text-sub-gray" />
          </div>
          <div v-show="mustRead.size.isOpen">
            <font-awesome-icon icon="chevron-up" class="text-sub-gray" />
          </div>
        </div>
        <div
          v-show="mustRead.size.isOpen"
          class="my-3 text-sm whitespace-pre-line grid gap-2"
        >
          <div v-if="mustRead.size.content != ''" class="grid">
            <div>{{ mustRead.size.content }}</div>
          </div>
          <div v-else class="text-mid-gray">크기가 없습니다</div>
          <div v-if="mustRead.taste.content != ''" class="grid">
            <div>{{ mustRead.taste.content }}</div>
          </div>
          <div v-else class="text-mid-gray">맛 정보가 없습니다</div>
        </div>
      </div>

      <!-- 필독사항 : 유의사항 -->
      <div class="store-content-block">
        <div
          @click="mustRead.notice.isOpen = !mustRead.notice.isOpen"
          class="flex justify-between cursor-pointer"
        >
          <div class="flex gap-3">
            <img src="@/assets/img/icon/info.svg" class="w-5" />
            <span>{{ sections.notice }}</span>
          </div>
          <div v-show="!mustRead.notice.isOpen">
            <font-awesome-icon icon="chevron-down" class="text-sub-gray" />
          </div>
          <div v-show="mustRead.notice.isOpen">
            <font-awesome-icon icon="chevron-up" class="text-sub-gray" />
          </div>
        </div>
        <div
          v-show="mustRead.notice.isOpen"
          class="my-3 text-sm whitespace-pre-line"
        >
          <div v-if="mustRead.notice.content != ''">
            {{ mustRead.notice.content }}
          </div>
          <div v-else class="text-mid-gray">유의사항이 없습니다</div>
        </div>
      </div>
      <!-- 교환 및 환불 -->
      <div class="store-content-block">
        <div
          @click="
            mustRead.exchangeRefund.isOpen = !mustRead.exchangeRefund.isOpen
          "
          class="flex justify-between cursor-pointer"
        >
          <div class="flex gap-3">
            <img src="@/assets/img/icon/tag.svg" class="w-5" />
            <span>{{ sections.exchangeRefund }}</span>
          </div>
          <div v-show="!mustRead.exchangeRefund.isOpen">
            <font-awesome-icon icon="chevron-down" class="text-sub-gray" />
          </div>
          <div v-show="mustRead.exchangeRefund.isOpen">
            <font-awesome-icon icon="chevron-up" class="text-sub-gray" />
          </div>
        </div>
        <div
          v-show="mustRead.exchangeRefund.isOpen"
          class="my-3 text-sm whitespace-pre-line"
        >
          <div v-if="mustRead.exchangeRefund.content != ''">
            {{ mustRead.exchangeRefund.content }}
          </div>
          <div v-else class="text-mid-gray">교환 및 환불 정보가 없습니다</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStoreInfoStore } from "@/stores/storeInfo";
import { toastInfo, toastSuccess } from "@/utils/toast";
import { ref, onMounted } from "vue";

const pinia = useStoreInfoStore();
const { getStoreInfo } = pinia;
const mustRead = ref({
  orderForm: { isOpen: false, content: "" },
  orderMethod: { isOpen: false, content: "" },
  size: { isOpen: false, content: "" },
  taste: { isOpen: false, content: "" },
  notice: { isOpen: false, content: "" },
  exchangeRefund: { isOpen: false, content: "" },
});

const sections = {
  orderForm: "주문양식",
  orderMethod: "주문방법",
  size: "크기",
  taste: "맛",
  notice: "유의사항",
  exchangeRefund: "교환 및 환불",
};

onMounted(() => {
  init();
});
function init() {
  if (getStoreInfo.mustRead != undefined) {
    if (getStoreInfo.mustRead.orderForm != undefined)
      mustRead.value.orderForm.content = getStoreInfo.mustRead.orderForm;
    if (getStoreInfo.mustRead.orderMethod != undefined)
      mustRead.value.orderMethod.content = getStoreInfo.mustRead.orderMethod;
    if (getStoreInfo.mustRead.size != undefined)
      mustRead.value.size.content = getStoreInfo.mustRead.size;
    if (getStoreInfo.mustRead.taste != undefined)
      mustRead.value.taste.content = getStoreInfo.mustRead.taste;
    if (getStoreInfo.mustRead.notice != undefined)
      mustRead.value.notice.content = getStoreInfo.mustRead.notice;
    if (getStoreInfo.mustRead.exchangeRefund != undefined)
      mustRead.value.exchangeRefund.content =
        getStoreInfo.mustRead.exchangeRefund;
  }
}

function onClickCopyOrderFrom() {
  if (mustRead.value.orderForm.content === "") {
    toastInfo("해당 항목이 아직 추가되지 않았어요");
    return;
  }
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
  copyText?.blur();
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

// // ios 일때
// function iosCopyToClipboard(el: any) {
//   var oldContentEditable = el.contentEditable,
//     oldReadOnly = el.readOnly,
//     range = document.createRange();

//   el.contentEditable = true;
//   el.readOnly = false;
//   range.selectNodeContents(el);

//   var s = window.getSelection();
//   if (s != null) {
//     s.removeAllRanges();
//     s.addRange(range);
//   }

//   // A big number, to cover anything that could be inside the element.
//   el.setSelectionRange(0, 999999);

//   el.contentEditable = oldContentEditable;
//   el.readOnly = oldReadOnly;

//   document.execCommand("copy");
// }
function iosCopyToClipboard(el: any) {
  var textarea = document.createElement("textarea");
  textarea.value = getStoreInfo.mustRead.orderForm; // 복사할 메시지
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999); // For IOS
  document.execCommand("copy");
  document.body.removeChild(textarea);
}
</script>
<style scoped>
.clipboardCss {
  opacity: 0.01;
  /* height: 1; */
  position: absolute;
  z-index: -1;
}
.store-content-block {
  @apply rounded-md p-3;
}
</style>
