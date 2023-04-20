<template>
  <div>
    <button
      class="shadow rounded-[5px] p-1.5"
      @click="emit('onClick')"
      :class="gpsState === GPS_STATUS.RUNNING ? 'bg-url-blue' : 'bg-white'"
    >
      <img
        :src="
          props.gpsState === GPS_STATUS.STOP
            ? gps_stop_icon
            : props.gpsState === GPS_STATUS.LOADING
            ? gps_loading_icon
            : gps_running_icon
        "
        class="w-6 h-6 rounded-[5px]"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { GPS_STATUS_TYPE, GPS_STATUS } from "@/constant/gps_state_constant";
import gps_stop_icon from "@/assets/img/icon/gps_black.svg";
import gps_loading_icon from "@/assets/gif/loadingIcon_croped.gif";
import gps_running_icon from "@/assets/img/icon/gps_white.svg";

interface Props {
  gpsState: GPS_STATUS_TYPE;
}

const props = defineProps<Props>();
const emit = defineEmits(["onClick"]);
</script>

<style scoped>
.shadow {
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
}
</style>
