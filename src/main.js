import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import "./css/style.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify"; // Ensure you have the vuetify plugin setup

const head = createHead();
createApp(App).use(vuetify).use(head).mount("#app");
