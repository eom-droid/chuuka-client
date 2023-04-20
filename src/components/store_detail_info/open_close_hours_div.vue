<template>
  <div
    class="flex text-xs cursor-pointer font-normal"
    @click="isExpanded = !isExpanded"
    :class="isExpanded ? '' : 'h-1/2'"
  >
    <img src="@/assets/img/icon/bx-time-five1.svg" class="mb-auto" />

    <div class="ml-2">
      <div
        v-for="(openCloseHour, index) in arrangedOpenCloseHourArray"
        :class="index === 0 ? 'font-bold' : isExpanded ? ' ' : 'hidden'"
        class="flex mb-1.5"
      >
        <div class="mr-2">
          {{ arrangedKorDayOfWeek[index] }}
        </div>
        <div v-if="openCloseHour.isClosed === undefined">정보없음</div>
        <div v-else-if="openCloseHour.isClosed === true">정기휴무</div>
        <div v-else="openCloseHour.openHour && openCloseHour.closeHour">
          {{ openCloseHour.openHour }} - {{ openCloseHour.closeHour }}
        </div>
        <div
          v-if="openCloseHour.startBreakTime && openCloseHour.endBreakTime"
          class="mt-1"
        >
          {{ openCloseHour.startBreakTime }} -
          {{ openCloseHour.endBreakTime }} 브레이크타임
        </div>
        <div v-if="openCloseHour.lastOrderTime" class="mt-1">
          {{ openCloseHour.lastOrderTime }} 라스트오더
        </div>
      </div>
      <div class="whitespace-pre-line text-left">
        {{ props.openCloseHours.description }}
      </div>
    </div>

    <img
      src="@/assets/img/icon/down_arrow.svg"
      class="mb-auto ml-2"
      v-show="!isExpanded"
    />
    <img
      src="@/assets/img/icon/up_arrow.svg"
      class="mb-auto ml-2"
      v-show="isExpanded"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { OpenCloseHoursModel } from "@/model/store/open_close_hours_model";
import { getDateTimeByDate } from "@/utils/moment";
import { OpenCloseHourModel } from "@/model/store/open_close_hour_model";

interface Props {
  openCloseHours: OpenCloseHoursModel;
}

const props = defineProps<Props>();
const arrangedOpenCloseHourArray = ref([] as OpenCloseHourModel[]);
const arrangedKorDayOfWeek = ref([] as string[]);
const isExpanded = ref(false);

onMounted(() => {
  arrangeDayOfWeek();
});

// 오늘요일이 우선적으로 전시되야하기 때문에 배열을 재정렬한다.
function arrangeDayOfWeek() {
  const dayOfWeekEn = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const dayOfWeekKor = ["일", "월", "화", "수", "목", "금", "토"];
  const nowDayOfWeekIndex = new Date().getDay();

  const arrangedDayOfWeek = dayOfWeekEn
    .slice(nowDayOfWeekIndex)
    .concat(dayOfWeekEn.slice(0, nowDayOfWeekIndex));
  arrangedDayOfWeek.map((ele) => {
    try {
      arrangedOpenCloseHourArray.value.push(
        //@ts-ignore
        props.openCloseHours[ele]
      );
    } catch (error) {
      // 해당 경우는 나오지 않을것으로 예상함 하지만 혹시나 모를 오류를 대비해 try catch문을 사용함
      arrangedOpenCloseHourArray.value.push(new OpenCloseHourModel({}));
    }
  });

  arrangedKorDayOfWeek.value = dayOfWeekKor
    .slice(nowDayOfWeekIndex)
    .concat(dayOfWeekKor.slice(0, nowDayOfWeekIndex));
}
</script>
