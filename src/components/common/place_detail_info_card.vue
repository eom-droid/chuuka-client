<template>
  <div class="flex flex-col h-full">
    <slot name="sns-icon"></slot>
    <div class="flex">
      <span class="card-title">{{ props.selectedPlace.place!.name }}</span>
      <running_status_card
        v-if="runningStatusCardVisible"
        :isOpen="selectedPlace.isOpen"
      ></running_status_card>
    </div>

    <location_info_div
      :koreanLoc="props.selectedPlace.place!.address"
      locPrefix="https://m.place.naver.com/restaurant/"
      :locValue="props.selectedPlace.place!.locationUrl.naver"
      class="mt-2"
    ></location_info_div>
    <hr class="mt-4 border-light-gray" v-show="hrVisible" />
    <div
      class="text-xs mt-4 flex flex-col"
      :class="props.scheduleScrollAble ? 'overflow-y-scroll' : ''"
    >
      <the_day_order_able_div
        v-if="props.selectedPlace.place instanceof PlaceCakeModel"
        :theDayOrderAble="props.selectedPlace.place!.theDayOrderAble"
      ></the_day_order_able_div>
      <open_close_hours_div
        :openCloseHours="props.selectedPlace.place!.openCloseHours"
        class="mt-4"
      ></open_close_hours_div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
// component
import running_status_card from "@/components/place_detail_info/running_status_card.vue";
import location_info_div from "@/components/place_detail_info/location_info_div.vue";
import the_day_order_able_div from "@/components/place_detail_info/the_day_order_able_div.vue";
import open_close_hours_div from "@/components/place_detail_info/open_close_hours_div.vue";
// icon

// model
import { IMapDrawMarker } from "@/model/map_draw_marker_model";
import { PlaceCakeModel } from "@/model/place_model";
interface Props {
  selectedPlace: IMapDrawMarker;
  hrVisible?: boolean;
  scheduleScrollAble?: boolean;
  runningStatusCardVisible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  hrVisible: true,
  scheduleScrollAble: true,
  runningStatusCardVisible: true,
});
props.selectedPlace;
</script>

<style scoped></style>
