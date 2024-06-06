import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import VueApexCharts from "vue3-apexcharts";
import VueApexCharts from "vue3-apexcharts";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "App",
  setup() {
    const notify = () => {
      toast("Wow so easy !", {
        autoClose: 1000,
      }); // ToastOptions
    };
    return { notify };
  },
};

const app = createApp(App);

app.use(router).use(store);

app.mount("#app");
app.use(VueApexCharts);
