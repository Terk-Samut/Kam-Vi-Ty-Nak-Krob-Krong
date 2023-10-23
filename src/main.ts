import { createApp } from "vue";

import App from "./App.vue";

import vuetify from "./plugins/vuetify";
import router from "./router";

import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(VueApexCharts);

app.mount("#app");
