<template>
  <section class="news-section section" id="news">
    <h2 class="news-section__title">Новини</h2>
    <ul class="news-section__list">
      <li
        class="news-section__item"
        v-for="(article, index) in articles"
        :key="index"
        @click="openModal(article)"
      >
        {{ article.title }}
      </li>
    </ul>
    <div
      v-if="selectedArticle"
      class="news-section__modal-overlay"
      @click.self="closeModal"
    >
      <div class="news-section__modal-content">
        <h2 class="news-section__modal-title">{{ selectedArticle.title }}</h2>
        <div
          v-html="selectedArticle.content"
          class="news-section__modal-body"
        ></div>
        <button @click="closeModal" class="news-section__close-button">
          Закрити
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { articles } from "../js/articles";
export default {
  data() {
    return {
      articles,
      selectedArticle: null,
    };
  },
  methods: {
    openModal(article) {
      this.selectedArticle = article;
    },
    closeModal() {
      this.selectedArticle = null;
    },
    handleScroll() {
      const newsSection = document.querySelector(".news-section");
      const newsTitle = document.querySelector(".news-section__title");
      const sectionPosition = newsSection.getBoundingClientRect();

      if (sectionPosition.top > 300) {
        newsTitle.classList.add("scrolled");
      } else {
        newsTitle.classList.remove("scrolled");
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style>
.news-section {
  font-family: "Roboto", sans-serif;
  background-image: url("../assets/bg-images/news-2.jpg");
  background-blend-mode: color;
  background-position: center;
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;
}

.news-section__title {
  font-size: 2em;
  color: #3d9970;
  text-align: center;
  text-shadow: 2px 2px 2px var(--white);
  margin-bottom: 20px;
}

.news-section__title.scrolled {
  text-shadow: 2px 2px 4px black;
}

.news-section__list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0;
  margin: 0 auto;
  max-width: 700px;
}

.news-section__item {
  padding: 15px 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
  cursor: pointer;
  font-size: 1.2em;
}

.news-section__item:hover {
  background-color: #e8f5e9;
  transform: translateY(-5px);
}

.news-section__modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.news-section__modal-content {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  max-width: 800px;
  width: 90%;
  max-height: 95vh;
  overflow-y: scroll;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.4s ease-out;

  display: flex;
  flex-direction: column;
  h2 {
    line-height: 1.12;
  }
  p,
  li {
    text-align: justify;
  }
  li {
    position: relative;
    color: var(--main-green);
    padding-left: 20px;
    margin-top: 8px;
  }

  li::before {
    content: "+";
    position: absolute;
    font-weight: 700;
    left: 0;
  }
  button {
    align-self: end;
  }
  a {
    color: var(--main-cyan);
  }
}

@keyframes slideIn {
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.news-section__modal-title {
  font-size: 1.8em;
  margin-bottom: 15px;
}

.news-section__modal-body {
  font-size: 1.1em;
  line-height: 1.6;

  display: inherit;
  flex-direction: inherit;
  gap: 12px;
}

.red {
  color: red;
}
.news-section__close-button {
  margin-top: 20px;
  padding: 12px 25px;
  background-color: #66bb6a;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 6px;
  font-size: 1em;
  transition: background-color var(--animation);
}

.news-section__close-button:hover {
  background-color: #4caf50;
}

@media (max-width: 768px) {
  .news-section__item {
    font-size: 1em;
    padding: 12px 16px;
  }

  .news-section__modal-content {
    padding: 20px;
  }

  .news-section__close-button {
    padding: 10px 20px;
    font-size: 0.9em;
  }
}

@media (max-width: 480px) {
  .news-section__item {
    font-size: 0.9em;
    padding: 10px 14px;
  }

  .news-section__close-button {
    padding: 8px 16px;
    font-size: 0.85em;
  }
}
</style>
