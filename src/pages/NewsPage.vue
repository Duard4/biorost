<script setup>
import { ref, computed } from "vue";
import { articles } from "../js/articles";
import { usePageSeo } from "../js/seo";

usePageSeo({
  title: "Новини та статті ТМ «Біорост» — органічне землеробство та родючість",
  description:
    "Статті та поради ТМ «Біорост»: відновлення родючості ґрунту, деструкція пожнивних залишків, застосування біопрепаратів у сучасних кліматичних умовах.",
  path: "/news",
});

const openIndex = ref(0);
const select = (i) => (openIndex.value = i);
const current = computed(() => articles[openIndex.value]);
</script>

<template>
  <div class="page news">
    <div class="container news__inner">
      <header class="news__head">
        <p class="news__kicker">Журнал · агрономія та родючість</p>
        <h1 class="news__title">Новини та статті</h1>
        <p class="news__lead">
          Практичні матеріали про відновлення ґрунту, біопрепарати й технології
          живлення культур.
        </p>
      </header>

      <ul v-if="articles.length > 1" class="news__list">
        <li v-for="(a, i) in articles" :key="i">
          <button class="news__pick" :class="{ 'is-active': i === openIndex }" @click="select(i)">
            {{ a.title }}
          </button>
        </li>
      </ul>

      <article class="article">
        <h2 class="article__title">{{ current.title }}</h2>
        <div class="article__body" v-html="current.content" />
      </article>
    </div>
  </div>
</template>

<style scoped>
.news {
  background: var(--bg);
  padding-block: clamp(2.5rem, 1.5rem + 5vw, 5rem);
  min-height: 100vh;
}
.news__inner { max-width: 1000px; }
.news__head { margin-bottom: var(--space-8); }
.news__kicker {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--brand);
  margin: 0 0 var(--space-3);
}
.news__title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-3xl);
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--brand-ink);
  margin: 0 0 var(--space-4);
  text-wrap: balance;
}
.news__lead {
  font-size: var(--text-lg);
  line-height: 1.55;
  color: var(--muted);
  margin: 0;
  text-wrap: pretty;
}

.news__list {
  list-style: none;
  margin: 0 0 var(--space-8);
  padding: 0;
  display: grid;
  gap: var(--space-2);
}
.news__pick {
  width: 100%;
  text-align: left;
  padding: var(--space-4) var(--space-5);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--brand-ink);
  transition: border-color var(--dur) var(--ease-out-quart);
}
.news__pick:hover { border-color: var(--brand); }
.news__pick.is-active { border-color: var(--brand); background: var(--brand-wash); }

.article {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: clamp(1.5rem, 1rem + 3vw, 3rem);
  box-shadow: var(--shadow-1);
}
.article__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-2xl);
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--brand-ink);
  margin: 0 0 var(--space-6);
  text-wrap: balance;
}
.article__body { color: var(--ink); font-size: var(--text-base); line-height: 1.7; max-width: 70ch; }
.article__body :deep(p) { margin: 0 0 var(--space-4); }
.article__body :deep(h3) {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-lg);
  color: var(--brand-ink);
  margin: var(--space-6) 0 var(--space-3);
}
.article__body :deep(ul) { margin: 0 0 var(--space-4); padding-left: 1.3em; }
.article__body :deep(li) { margin-bottom: var(--space-2); }
.article__body :deep(a) { color: var(--accent-strong); font-weight: 600; }

@media (prefers-reduced-motion: reduce) {
  .news__pick { transition: none; }
}
</style>
