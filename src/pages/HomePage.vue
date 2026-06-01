<script setup>
import { computed } from "vue";
import { items, types } from "../js/data";
import about from "../assets/data/about.json";
import { usePageSeo } from "../js/seo";
import { consultationQuery, requestQuery } from "../js/contactPrefill";

usePageSeo({
  title:
    "ТМ «Біорост» – Органічні добрива та біопрепарати для аграріїв України",
  path: "/",
});

const years = new Date().getFullYear() - about.founded;

const descriptions = {
  org: "Мікродобрива з металами, кислотами та гуматами для живлення культур.",
  ino: "Живі бактерії та гриби для потужної кореневої системи.",
  fun: "Захист від кореневих гнилей, фітофторозу та грибкових хвороб.",
  ins: "Біологічний контроль ґрунтових і листових шкідників.",
  bact: "Азотфіксація та мобілізація фосфору й калію в ґрунті.",
  fito: "Стимуляція росту, цвітіння та формування врожаю.",
};

const categories = computed(() =>
  types.map((t) => ({
    ...t,
    description: descriptions[t.id] || "",
    count: items.filter((p) => String(p.type).split(" ").includes(t.id)).length,
  })),
);

const proof = [
  { num: `${years}`, label: "років власного виробництва" },
  { num: `${items.length}+`, label: "продуктів у каталозі" },
  { num: "100%", label: "органічна основа" },
];
</script>

<template>
  <div class="page">
    <!-- Hero -->
    <section class="hero">
      <div class="container hero__grid">
        <div class="hero__copy">
          <p class="hero__kicker">ТОВ «Органіка України» · Запоріжжя</p>
          <h1 class="hero__title">
            Живий ґрунт – основа<br />
            високого врожаю
          </h1>
          <p class="hero__lead">
            Органічні та органо-мінеральні добрива, інокулянти й біопрепарати,
            що відновлюють родючість ґрунту та захищають культури без хімії.
          </p>
          <div class="hero__actions">
            <router-link class="btn btn--primary" to="/products"
              >Переглянути продукцію</router-link
            >
            <router-link class="btn btn--ghost" :to="consultationQuery()"
              >Замовити консультацію</router-link
            >
          </div>
        </div>

        <figure class="hero__media">
          <img
            src="/assets/bg-images/hero.webp"
            alt="Молоді сходи на родючому ґрунті – органічне землеробство ТМ Біорост"
            width="900"
            height="700"
            fetchpriority="high"
          />
          <p class="hero__badge">
            <span class="hero__badge-num">BIO</span>
            <span class="hero__badge-text"
              >біопрепарати <br />
              для здорового ґрунту</span
            >
          </p>
        </figure>
      </div>

      <div class="hero__proof">
        <div class="container hero__proof-inner">
          <div v-for="p in proof" :key="p.label" class="hero__stat">
            <span class="hero__stat-num">{{ p.num }}</span>
            <span class="hero__stat-label">{{ p.label }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section catalog">
      <div class="container">
        <header class="catalog__head">
          <h2 class="title catalog__title">
            Шість напрямів для повного циклу живлення
          </h2>
          <p class="lead">
            Від обробки насіння до наливу плодів – рішення на кожну фазу
            вегетації, для промислових господарств і приватних ділянок.
          </p>
        </header>

        <ul class="catalog__grid">
          <li v-for="cat in categories" :key="cat.id">
            <router-link
              class="cat-card"
              :to="{ path: '/products', query: { category: cat.id } }"
            >
              <span class="cat-card__count">{{ cat.count }}</span>
              <h3 class="cat-card__name">{{ cat.name }}</h3>
              <p class="cat-card__desc">{{ cat.description }}</p>
              <span class="cat-card__arrow" aria-hidden="true">→</span>
            </router-link>
          </li>
        </ul>
      </div>
    </section>

    <!-- Soil story teaser -->
    <section class="section--tight story">
      <div class="container story__grid">
        <figure class="story__media">
          <img
            src="/assets/bg-images/about.webp"
            alt="Здоровий ґрунт із розвиненою кореневою системою рослин"
            loading="lazy"
            width="720"
            height="560"
          />
        </figure>
        <div class="story__copy">
          <h2 class="title">Ми відновлюємо ґрунт, а не виснажуємо його</h2>
          <p class="text story__text">
            Корисні гриби й бактерії в наших препаратах структурують ґрунт,
            очищують його від патогенів і запускають гуміфікацію. Це підвищує
            родючість рік за роком – на відміну від мінеральної хімії, що
            виснажує землю.
          </p>
          <router-link class="btn btn--clay" to="/about"
            >Про виробництво</router-link
          >
        </div>
      </div>
    </section>

    <!-- Application maps teaser -->
    <section class="section--tight">
      <div class="container">
        <div class="maps-cta">
          <div class="maps-cta__copy">
            <h2 class="maps-cta__title">
              Карти внесення для пшениці та ріпаку
            </h2>
            <p class="maps-cta__text">
              Покрокові схеми застосування препаратів по фазах вегетації –
              норми, способи обробки та комбінації для кожного етапу.
            </p>
          </div>
          <router-link class="btn btn--on-dark" to="/maps"
            >Відкрити карти внесення</router-link
          >
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="section--tight final-cta">
      <div class="container">
        <h2 class="title final-cta__title">
          Підберемо програму живлення під вашу культуру
        </h2>
        <p class="lead final-cta__lead">
          Напишіть нам – менеджери-агрономи Ігор та Оксана допоможуть із вибором
          препаратів, нормами та доставкою по всій Україні.
        </p>
        <div class="final-cta__actions">
          <router-link class="btn btn--primary" :to="requestQuery()"
            >Залишити заявку</router-link
          >
          <router-link class="btn btn--ghost" to="/products"
            >Каталог продукції</router-link
          >
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.final-cta {
  padding-top: 0;
}
/* ── Hero ───────────────────────────────────────────────────── */
.hero {
  position: relative;
  background:
    radial-gradient(120% 80% at 85% 0%, var(--brand-wash) 0%, transparent 60%),
    var(--bg);
}
.hero__grid {
  display: grid;
  gap: var(--space-8);
  padding-block: clamp(2.5rem, 1.5rem + 5vw, 5.5rem)
    clamp(2rem, 1rem + 3vw, 3.5rem);
  align-items: center;
}
.hero__kicker {
  font-weight: 600;
  color: var(--brand);
  margin: 0 0 var(--space-4);
  font-size: var(--text-sm);
  letter-spacing: 0.01em;
}
.hero__title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-display);
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: var(--brand-ink);
  margin: 0 0 var(--space-5);
  text-wrap: balance;
}
.hero__lead {
  font-size: var(--text-lg);
  line-height: 1.55;
  color: var(--muted);
  max-width: 54ch;
  margin: 0 0 var(--space-8);
  text-wrap: pretty;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.hero__media {
  position: relative;
  margin: 0;
  justify-self: center;
  max-width: 560px;
}
.hero__media img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 5 / 4;
  object-fit: cover;
  border-radius: var(--radius-lg);
  border-top-right-radius: clamp(48px, 12vw, 110px);
  box-shadow: var(--shadow-3);
}
.hero__badge {
  position: absolute;
  left: calc(-1 * var(--space-4));
  bottom: var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin: 0;
  padding: var(--space-3) var(--space-5);
  background: var(--surface);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-2);
}
.hero__badge-num {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-xl);
  color: var(--brand);
}
.hero__badge-text {
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1.15;
  color: var(--muted);
}

.hero__proof {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--surface);
}
.hero__proof-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  padding-block: var(--space-6);
}
.hero__stat {
  text-align: center;
}
.hero__stat-num {
  display: block;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-2xl);
  color: var(--brand);
  line-height: 1;
}
.hero__stat-label {
  display: block;
  margin-top: var(--space-2);
  font-size: var(--text-sm);
  color: var(--muted);
}

/* ── Catalog ────────────────────────────────────────────────── */
.catalog__head {
  max-width: 60ch;
  margin-bottom: var(--space-12);
}
.catalog__title {
  margin-bottom: var(--space-4);
}
.catalog__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 270px), 1fr));
}
.cat-card {
  position: relative;
  display: block;
  height: 100%;
  padding: var(--space-6);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  text-decoration: none;
  overflow: hidden;
  transition:
    transform var(--dur) var(--ease-out-quart),
    box-shadow var(--dur) var(--ease-out-quart),
    border-color var(--dur) var(--ease-out-quart);
}
.cat-card::before {
  content: "";
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: var(--brand);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur) var(--ease-out-quart);
}
.cat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2);
  border-color: transparent;
}
.cat-card:hover::before {
  transform: scaleX(1);
}
.cat-card:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}
.cat-card__count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  padding: 0 var(--space-2);
  border-radius: var(--radius-full);
  background: var(--spark);
  color: var(--on-spark);
  font-weight: 800;
  font-size: var(--text-sm);
}
.cat-card__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-lg);
  color: var(--brand-ink);
  margin: var(--space-4) 0 var(--space-2);
}
.cat-card__desc {
  color: var(--muted);
  font-size: var(--text-sm);
  line-height: 1.5;
  margin: 0;
}
.cat-card__arrow {
  display: block;
  margin-top: var(--space-4);
  font-size: var(--text-lg);
  color: var(--accent);
  transition: transform var(--dur) var(--ease-out-quart);
}
.cat-card:hover .cat-card__arrow {
  transform: translateX(6px);
}

/* ── Story ──────────────────────────────────────────────────── */
.story {
  background: var(--brand-wash);
}
.story__grid {
  display: grid;
  gap: var(--space-8);
  align-items: center;
}
.story__media {
  margin: 0;
}
.story__media img {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-2);
}
.story__text {
  font-size: var(--text-lg);
  line-height: 1.6;
  color: var(--ink);
  max-width: 56ch;
  margin: var(--space-4) 0 var(--space-6);
}

/* ── Maps CTA ───────────────────────────────────────────────── */
.maps-cta {
  display: grid;
  gap: var(--space-6);
  align-items: center;
  padding: clamp(2rem, 1.5rem + 3vw, 3.5rem);
  border-radius: var(--radius-lg);
  background: radial-gradient(
    120% 120% at 100% 0%,
    var(--brand) 0%,
    var(--brand-deep) 100%
  );
  color: var(--on-brand);
}
.maps-cta__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-2xl);
  margin: 0 0 var(--space-3);
  letter-spacing: -0.02em;
}
.maps-cta__text {
  margin: 0;
  color: color-mix(in oklch, var(--on-brand) 85%, transparent);
  line-height: 1.55;
  max-width: 52ch;
}

/* ── Final CTA ──────────────────────────────────────────────── */
.final-cta {
  text-align: center;
  max-width: 64ch;
  margin-inline: auto;
}
.final-cta__lead {
  margin: var(--space-4) auto var(--space-8);
}
.final-cta__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
}

@media (min-width: 768px) {
  .hero__grid {
    grid-template-columns: 1.05fr 0.95fr;
  }
  .story__grid {
    grid-template-columns: 0.9fr 1.1fr;
  }
  .maps-cta {
    grid-template-columns: 1fr auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cat-card,
  .cat-card__arrow,
  .cat-card::before {
    transition: none;
  }
}
</style>
