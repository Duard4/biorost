import { createApp } from "vue";
import { createHead } from "@unhead/vue/client";
import "./css/style.css";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";

const head = createHead();
const app = createApp(App).use(router).use(vuetify).use(head);

// Wait for the router to resolve the initial route — which loads the matched
// async page chunk — before mounting. Otherwise the client mount discards the
// prerendered DOM and paints an empty <router-view> (nav + footer only) until
// the chunk arrives, then snaps the content back in: a large first-render
// layout shift (CLS). Mounting after isReady() renders the page in one pass.
router.isReady().then(() => app.mount("#app"));
