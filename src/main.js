import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import "./css/style.css";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

const head = createHead();
createApp(App).use(router).use(vuetify).use(head).mount("#app");
