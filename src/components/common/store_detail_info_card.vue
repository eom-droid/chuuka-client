<template>
  <div class="flex flex-col h-full">
    <slot name="sns-icon"></slot>
    <div class="flex">
      <span class="card-title">{{ props.selectedStore.store!.name }}</span>
      <running_status_card
        v-if="runningStatusCardVisible"
        :isOpen="selectedStore.isOpen"
      ></running_status_card>
    </div>

    <location_info_div
      :koreanLoc="props.selectedStore.store!.address"
      locPrefix="https://m.place.naver.com/restaurant/"
      :locValue="props.selectedStore.store!.locationUrl.naver"
      class="mt-2"
    ></location_info_div>
    <hr class="mt-4 border-light-gray" v-show="hrVisible" />
    <div
      class="text-xs mt-4 flex flex-col"
      :class="props.scheduleScrollAble ? 'overflow-y-scroll' : ''"
    >
      <the_day_order_able_div
        :theDayOrderAble="props.selectedStore.store!.theDayOrderAble"
      ></the_day_order_able_div>
      <open_close_hours_div
        :openCloseHours="props.selectedStore.store!.openCloseHours"
        class="mt-4"
      ></open_close_hours_div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
// component
import running_status_card from "@/components/store_detail_info/running_status_card.vue";
import location_info_div from "@/components/store_detail_info/location_info_div.vue";
import the_day_order_able_div from "@/components/store_detail_info/the_day_order_able_div.vue";
import open_close_hours_div from "../store_detail_info/open_close_hours_div.vue";
// icon

// model
import { IMapDrawMarker } from "@/model/map_draw_marker_model";
interface Props {
  selectedStore: IMapDrawMarker;
  hrVisible?: boolean;
  scheduleScrollAble?: boolean;
  runningStatusCardVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hrVisible: true,
  scheduleScrollAble: true,
  runningStatusCardVisible: true,
});
</script>

<style scoped></style>
