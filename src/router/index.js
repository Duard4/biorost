import { createRouter, createWebHistory } from "vue-router";

const HomePage = () => import("../pages/HomePage.vue");
const ProductsPage = () => import("../pages/ProductsPage.vue");
const MapsPage = () => import("../pages/MapsPage.vue");
const AboutPage = () => import("../pages/AboutPage.vue");
const NewsPage = () => import("../pages/NewsPage.vue");
const ContactPage = () => import("../pages/ContactPage.vue");

export const routes = [
  { path: "/", name: "home", component: HomePage },
  { path: "/products", name: "products", component: ProductsPage },
  { path: "/maps", name: "maps", component: MapsPage },
  { path: "/about", name: "about", component: AboutPage },
  { path: "/news", name: "news", component: NewsPage },
  { path: "/contacts", name: "contacts", component: ContactPage },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      // The out-in page transition and async route chunks mean the target
      // isn't in the DOM the instant navigation resolves — wait for it.
      return new Promise((resolve) => {
        const position = { el: to.hash, behavior: "smooth", top: 80 };
        let tries = 0;
        const tryScroll = () => {
          if (document.querySelector(to.hash) || tries++ > 60) resolve(position);
          else requestAnimationFrame(tryScroll);
        };
        requestAnimationFrame(tryScroll);
      });
    }
    if (savedPosition) return savedPosition;
    return { top: 0 };
  },
});

export default router;
