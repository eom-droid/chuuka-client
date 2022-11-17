import { createApp } from "vue";
import "../src/index.css";
import App from "./App.vue";
import { router } from "./router/router";
import { createPinia } from "pinia";

import mitt from "mitt";
import FontAwesomeIcon from "@/utils/fontawesome-icons";

const app = createApp(App);
const emitter = mitt();
const pinia = createPinia();

app.config.globalProperties.$emitter = emitter;
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);
app.mount("#app");
