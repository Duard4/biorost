<template>
  <nav class="nav">
    <div class="hamburger-menu">
      <input id="menu__toggle" type="checkbox" />
      <label class="menu__btn" for="menu__toggle">
        <span></span>
      </label>
      <div class="menu__box fixed-nav">
        <SearchComponent></SearchComponent>
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.text" class="nav-item">
            <a :href="link.href" class="nav-link">{{ link.text }}</a>
          </li>
        </ul>
        <address class="box-address">
          <a class="address-link" href="http://">
            вул. Сталеварів 17, Запоріжжя</a
          >
          <a class="address-link" href="mailto:Biorost.zap@gmail.com"
            >Biorost.zap@gmail.com</a
          >
          <a class="address-link" href="tel:+380687579303"
            >тел. +380687579303</a
          >
        </address>
      </div>
    </div>
    <div class="ordinary-menu">
      <div class="container">
        <ul class="nav-list">
          <li v-for="link in navLinks" :key="link.text" class="nav-item">
            <a :href="link.href" class="nav-link">{{ link.text }}</a>
          </li>
        </ul>
        <SearchComponent></SearchComponent>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, provide } from "vue";
import SearchComponent from "./SearchComponent.vue";

export default {
  name: "NavComponent",
  components: {
    SearchComponent,
  },
  mounted() {
    this.header = document.querySelector(".ordinary-menu");
    this.headerHeight = document.querySelector(".header").clientHeight;

    this.scrollHandler = () => {
      let scroll = window.scrollY;
      if (scroll / 1.22 > this.headerHeight) {
        this.header.classList.add("fixed-nav");
      } else {
        this.header.classList.remove("fixed-nav");
      }
    };

    window.addEventListener("scroll", this.scrollHandler);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  setup() {
    const searchQuery = ref("");
    const searchResults = ref([]);
    const setType = ref(null);
    const scrollTo = ref(null);

    const performSearch = () => {
      const query = searchQuery.value.trim().toLowerCase();
      if (!query) {
        searchResults.value = [];
        return;
      }

      const searchableElements = document.querySelectorAll(".searchable");
      const results = new Map();
      const contextLength = 20;

      searchableElements.forEach((element) => {
        const text = element.textContent.toLowerCase();
        let startIndex = 0;
        while ((startIndex = text.indexOf(query, startIndex)) !== -1) {
          const start = Math.max(0, startIndex - contextLength);
          const end = Math.min(
            text.length,
            startIndex + query.length + contextLength
          );
          let context = element.textContent.substring(start, end);
          if (start > 0) context = "..." + context;
          if (end < text.length) context += "...";

          const highlighted = context.replace(
            new RegExp(query, "gi"),
            (match) =>
              `<span class="highlight" style="background-color: rgba(245, 192, 63, 1);">${match}</span>`
          );

          if (!results.has(element.textContent)) {
            results.set(element.textContent, {
              element,
              html: highlighted,
            });
          }

          startIndex += query.length;
        }
      });

      searchResults.value = Array.from(results.values());
    };

    const scrollToElement = (result) => {
      const element = result.element;
      const typeId = element.closest(".ptl-item")?.dataset?.id;
      const itemId = element.closest(".slider-item")?.dataset?.id;

      if (typeId) {
        setType.value = typeId;

        document.querySelector(`[data-id="${typeId}"]`).click();
      }

      if (itemId) {
        scrollTo.value = itemId;

        const itemIndex = Array.from(
          document.querySelectorAll(".slider-item")
        ).findIndex((item) => item.dataset.id == itemId);
        if (itemIndex !== -1) {
          const currentPage = Math.floor(itemIndex / slidesToShow.value);
          goToSlide(currentPage);
        }
      }

      element.scrollIntoView({ behavior: "smooth" });

      const yOffset = -100;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    provide("setType", setType);
    provide("scrollTo", scrollTo);

    return {
      navLinks: [
        { text: "Про нас", href: "./index#about-us" },
        { text: "Продукція", href: "./index#products" },
        { text: "Карти внесення", href: "./index#inj-maps" },
        { text: "Новини", href: "./index#news" },
        { text: "Вакансії", href: "./index#vacancies" },
        { text: "Контакти", href: "./index#contact-us" },
      ],
      searchQuery,
      searchResults,
      performSearch,
      scrollToElement,
    };
  },
};
</script>

<style scoped>
.search-results li {
  padding: 10px;
  cursor: pointer;
}
</style>
