import { createApp } from "vue";
import "./css/style.css";
import App from "./App.vue";
import vuetify from "./plugins/vuetify"; // Ensure you have the vuetify plugin setup

createApp(App)
    .use(vuetify)
    .mount("#app");

const list = document.querySelector(".product-types-list"),
    items = document.querySelectorAll(".pil-item"),
    types = document.querySelectorAll(".ptl-item");

function filter() {
    list.addEventListener("click", (event) => {
        const targetId = event.target.dataset.id,
            target = event.target;

        if (target.classList.contains("ptl-item")) {
            types.forEach((type) => type.classList.remove("active"));
            target.classList.add("active");
            getItems(targetId);
        }
    });
}

function getItems(className) {
    items.forEach((item) => {
        if (item.classList.contains(className)) item.style.display = "block";
        else item.style.display = "none";
    });
}

filter();

let search;
