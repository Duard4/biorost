<script setup>
import { ref } from "vue";
import about from "../assets/data/about.json";
import { managers } from "../js/data";
import { eventBus } from "../js/eventBus";
import { useRouter } from "vue-router";
import CertificateModal from "../components/CertificateModal.vue";
import { usePageSeo } from "../js/seo";

usePageSeo({
  title: "Про нас — ТМ «Біорост», виробник органічних добрив з 2013 року",
  description:
    "ТОВ «Органіка України» (ТМ «Біорост») — виробництво органічних добрив і біопрепаратів у Запоріжжі з 2013 року. Наша філософія відновлення ґрунту, команда та сертифікати.",
  path: "/about",
});

const router = useRouter();
const years = new Date().getFullYear() - about.founded;

const openRow = ref(0);
const toggleRow = (i) => (openRow.value = openRow.value === i ? null : i);

const certificates = [1, 2, 3, 4, 5].map(
  (n) => `/assets/content-images/certificate-${n}.webp`
);
const certOpen = ref(false);

const jobs = [
  {
    title: "Спеціаліст з наукової роботи",
    description:
      "Пошук лабораторій для аналізу зразків продукції заводу, аналіз результатів, робота з науковими джерелами, процеси сертифікації виробництва та продукції, розробка рекомендацій із застосування препаратів у сільгоспвиробництві.",
    skills: [
      "Повна зайнятість (готові взяти студента)",
      "Досвід роботи від 2 років",
      "Вища освіта: хімія, біологія, агрономія або захист рослин",
      "Старанність та дисциплінованість",
      "Допитливість і бажання розвиватися",
      "Творчий підхід до вирішення задач",
    ],
  },
  {
    title: "Менеджер з продажу органічних добрив (B2B)",
    description:
      "Просування продукції заводу в закріпленому регіоні, супровід клієнтів, консультації із застосування препаратів, ведення CRM. Можливі відрядження. Перевагою буде напрацьована база клієнтів.",
    skills: [
      "Вища або середня агрономічна освіта (бажано)",
      "Розуміння основ сільгоспгалузі",
      "Досвід у B2B-продажах — від 1 року",
      "Готовність освоїти CRM-системи",
      "Зацікавленість у стратегічному розвитку компанії",
      "Дисциплінованість, порядність, відповідальність",
    ],
  },
];
const openJob = ref(null);
const toggleJob = (i) => (openJob.value = openJob.value === i ? null : i);

const applyForJob = async (title) => {
  await router.push({ path: "/contacts", hash: "#form" });
  eventBus.emit("applyForJob", title);
};

const phonesOf = (contact) =>
  contact.split(" ").filter((p) => p.startsWith("+"));
const emailOf = (contact) => contact.split(" ")[0];
</script>

<template>
  <div class="page about">
    <!-- Intro -->
    <section class="about__hero">
      <div class="container">
        <p class="about__kicker">{{ about.company }} · з {{ about.founded }} року</p>
        <h1 class="about__title">Ми відновлюємо ґрунт,<br />а не виснажуємо його</h1>
        <p class="about__lead">{{ about.text }}</p>
      </div>
    </section>

    <!-- Philosophy accordion -->
    <section class="section">
      <div class="container">
        <h2 class="title about__h2">Що дає жива органіка</h2>
        <p class="lead about__h2-lead">
          Три напрями впливу наших препаратів — на ґрунт, на рослину та на все,
          що живе поруч.
        </p>
        <ul class="acc">
          <li v-for="(row, i) in about.rows" :key="i" class="acc__item" :class="{ 'is-open': openRow === i }">
            <button class="acc__head" :aria-expanded="openRow === i" @click="toggleRow(i)">
              <span class="acc__cat">{{ row.category }}</span>
              <span class="acc__icon" aria-hidden="true"></span>
            </button>
            <div v-show="openRow === i" class="acc__body" v-html="row.description" />
          </li>
        </ul>
      </div>
    </section>

    <!-- Team -->
    <section class="section team">
      <div class="container">
        <h2 class="title about__h2">Наші менеджери-агрономи</h2>
        <p class="lead about__h2-lead">
          Підкажуть із вибором препаратів, нормами внесення та доставкою по всій
          Україні.
        </p>
        <div class="team__grid">
          <article v-for="m in managers" :key="m.name" class="mcard">
            <img class="mcard__img" :src="m.image" :alt="m.name" loading="lazy" width="320" height="320" />
            <div class="mcard__body">
              <h3 class="mcard__name">{{ m.name }}</h3>
              <p class="mcard__role">{{ m.description }}</p>
              <div class="mcard__contacts">
                <a class="hover" :href="`mailto:${emailOf(m.contact)}`">{{ emailOf(m.contact) }}</a>
                <a v-for="p in phonesOf(m.contact)" :key="p" class="hover" :href="`tel:${p}`">{{ p }}</a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Certificates -->
    <section class="section--tight">
      <div class="container">
        <div class="cert">
          <div class="cert__copy">
            <h2 class="cert__title">Сертифікована продукція</h2>
            <p class="cert__text">
              Усі добрива та препарати проходять контроль якості й мають
              підтвердні документи. Перегляньте сертифікати компанії.
            </p>
            <button class="btn btn--on-dark" @click="certOpen = true">Переглянути сертифікати</button>
          </div>
          <div class="cert__thumbs">
            <img
              v-for="(c, i) in certificates"
              :key="c"
              :src="c"
              :alt="`Сертифікат ${i + 1}`"
              loading="lazy"
              @click="certOpen = true"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Vacancies -->
    <section class="section vac">
      <div class="container">
        <h2 class="title about__h2">Вакансії в команді Біорост</h2>
        <p class="lead about__h2-lead">
          Долучайтеся до виробництва органічних добрив у Запоріжжі.
        </p>
        <ul class="acc">
          <li v-for="(job, i) in jobs" :key="i" class="acc__item" :class="{ 'is-open': openJob === i }">
            <button class="acc__head" :aria-expanded="openJob === i" @click="toggleJob(i)">
              <span class="acc__cat">{{ job.title }}</span>
              <span class="acc__icon" aria-hidden="true"></span>
            </button>
            <div v-show="openJob === i" class="acc__body">
              <p class="vac__desc">{{ job.description }}</p>
              <h4 class="vac__exp">Наші очікування</h4>
              <ul class="vac__skills">
                <li v-for="s in job.skills" :key="s">{{ s }}</li>
              </ul>
              <button class="btn btn--primary" @click="applyForJob(job.title)">Подати заявку</button>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <CertificateModal :show-modal="certOpen" :images="certificates" @close="certOpen = false" />
  </div>
</template>

<style scoped>
.about { background: var(--bg); }

.about__hero {
  background:
    radial-gradient(120% 90% at 80% -10%, var(--brand-wash) 0%, transparent 60%),
    var(--bg);
  padding-block: clamp(2.5rem, 1.5rem + 5vw, 5rem) clamp(1.5rem, 1rem + 2vw, 3rem);
}
.about__kicker {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--brand);
  margin: 0 0 var(--space-4);
}
.about__title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-3xl);
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: var(--brand-ink);
  margin: 0 0 var(--space-5);
  text-wrap: balance;
}
.about__lead {
  font-size: var(--text-lg);
  line-height: 1.6;
  color: var(--muted);
  max-width: 68ch;
  margin: 0;
  text-wrap: pretty;
}
.about__h2 { margin-bottom: var(--space-3); }
.about__h2-lead { margin: 0 0 var(--space-8); }

/* Accordion (shared by philosophy + vacancies) */
.acc { list-style: none; margin: 0; padding: 0; max-width: 58rem; display: grid; gap: var(--space-3); }
.acc__item {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--dur) var(--ease-out-quart);
}
.acc__item.is-open { border-color: var(--brand); }
.acc__head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5) var(--space-6);
  min-height: 44px;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}
.acc__cat {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-lg);
  color: var(--brand-ink);
}
.acc__icon {
  position: relative;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
}
.acc__icon::before,
.acc__icon::after {
  content: "";
  position: absolute;
  background: var(--brand);
  transition: transform var(--dur) var(--ease-out-quart);
}
.acc__icon::before { inset: 8px 0; height: 2px; }
.acc__icon::after { inset: 0 8px; width: 2px; }
.acc__item.is-open .acc__icon::after { transform: scaleY(0); }
.acc__body {
  padding: 0 var(--space-6) var(--space-6);
  color: var(--ink);
  line-height: 1.65;
}
.acc__body :deep(strong) { color: var(--brand-ink); }
.acc__body :deep(ul.marked-list) { padding-left: 1.2em; margin: var(--space-3) 0; }
.acc__body :deep(li) { margin-bottom: var(--space-2); }

/* Team */
.team { background: var(--brand-wash); }
.team__grid {
  display: grid;
  gap: var(--space-6);
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
}
.mcard {
  display: flex;
  flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-1);
}
.mcard__img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
.mcard__body { padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-3); flex: 1; }
.mcard__name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-xl);
  color: var(--brand-ink);
  margin: 0;
}
.mcard__role { margin: 0; color: var(--muted); line-height: 1.55; font-size: var(--text-sm); }
.mcard__contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid var(--line);
}
.mcard__contacts a { color: var(--brand); font-weight: 600; text-decoration: none; word-break: break-word; }

/* Certificates */
.cert {
  display: grid;
  gap: var(--space-8);
  align-items: center;
  padding: clamp(2rem, 1.5rem + 3vw, 3.5rem);
  border-radius: var(--radius-lg);
  background: radial-gradient(120% 120% at 0% 0%, var(--soil-2) 0%, var(--soil) 100%);
  color: var(--on-soil);
}
.cert__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-2xl);
  margin: 0 0 var(--space-3);
  letter-spacing: -0.02em;
}
.cert__text {
  margin: 0 0 var(--space-6);
  color: color-mix(in oklch, var(--on-soil) 82%, transparent);
  line-height: 1.55;
  max-width: 48ch;
}
.cert__thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(84px, 1fr));
  gap: var(--space-3);
}
.cert__thumbs img {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius-sm);
  cursor: pointer;
  background: var(--surface);
  transition: transform var(--dur) var(--ease-out-quart);
}
.cert__thumbs img:hover { transform: translateY(-4px); }

/* Vacancies extras */
.vac__desc { margin: 0 0 var(--space-4); color: var(--ink); }
.vac__exp {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--brand-ink);
  margin: 0 0 var(--space-2);
}
.vac__skills { margin: 0 0 var(--space-5); padding-left: 1.2em; display: grid; gap: var(--space-1); }
.vac__skills li { color: var(--muted); }

@media (min-width: 768px) {
  .cert { grid-template-columns: 1fr 1.1fr; }
}
@media (prefers-reduced-motion: reduce) {
  .acc__item, .acc__icon::before, .acc__icon::after, .cert__thumbs img { transition: none; }
}
</style>
