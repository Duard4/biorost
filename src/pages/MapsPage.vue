<script setup>
import { ref, computed } from "vue";
import InjTableComponent from "../components/InjTableComponent.vue";
import { crops, treatmentsWheat, treatmentsCanola } from "../js/injectionMaps";
import { usePageSeo } from "../js/seo";

usePageSeo({
  title: "Карти внесення добрив ТМ «Біорост» — схеми для пшениці та ріпаку",
  description:
    "Покрокові карти внесення біопрепаратів ТМ «Біорост» по фазах вегетації озимої пшениці та озимого ріпаку: норми, способи обробки та комбінації продуктів.",
  path: "/maps",
});

const active = ref(crops[0].id);
const treatments = computed(() =>
  active.value === "wheat" ? treatmentsWheat : treatmentsCanola
);
</script>

<template>
  <div class="page maps">
    <div class="container container--wide">
      <header class="maps__head">
        <p class="maps__kicker">Технологія живлення · по фазах вегетації</p>
        <h1 class="maps__title">Карти внесення</h1>
        <p class="maps__lead">
          Готові схеми застосування препаратів від обробки пожнивних залишків до
          наливу зерна. Оберіть культуру — норми та способи внесення для кожного
          етапу.
        </p>
      </header>

      <div class="maps__tabs" role="tablist" aria-label="Культура">
        <button
          v-for="crop in crops"
          :key="crop.id"
          class="maps__tab"
          :class="{ 'is-active': active === crop.id }"
          role="tab"
          :aria-selected="active === crop.id"
          @click="active = crop.id"
        >
          {{ crop.name }}
        </button>
      </div>

      <div class="maps__table">
        <InjTableComponent :key="active" :treatments="treatments" />
      </div>

      <p class="maps__note">
        * Норми наведено орієнтовно. Точну програму під культуру, ґрунт і фазу
        підкажуть наші агрономи.
      </p>

      <div class="maps__foot">
        <router-link class="btn btn--primary" to="/contacts#form">Замовити консультацію</router-link>
        <router-link class="btn btn--ghost" to="/products">Каталог продукції</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.maps {
  background: var(--bg);
  padding-block: clamp(2.5rem, 1.5rem + 5vw, 5rem);
  min-height: 100vh;
}
.maps__head {
  max-width: 62ch;
  margin-bottom: var(--space-8);
}
.maps__kicker {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--brand);
  margin: 0 0 var(--space-3);
}
.maps__title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-3xl);
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--brand-ink);
  margin: 0 0 var(--space-4);
  text-wrap: balance;
}
.maps__lead {
  font-size: var(--text-lg);
  line-height: 1.55;
  color: var(--muted);
  margin: 0;
  text-wrap: pretty;
}

.maps__tabs {
  display: inline-flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  padding: var(--space-1);
  background: var(--surface-sunk);
  border: 1px solid var(--line);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-6);
}
.maps__tab {
  appearance: none;
  border: none;
  cursor: pointer;
  padding: var(--space-3) var(--space-6);
  min-height: 44px;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--muted);
  font-family: var(--font-body);
  font-size: var(--text-base);
  font-weight: 600;
  transition:
    background var(--dur) var(--ease-out-quart),
    color var(--dur) var(--ease-out-quart);
}
.maps__tab:hover { color: var(--brand-ink); }
.maps__tab.is-active {
  background: var(--brand);
  color: var(--on-brand);
  box-shadow: var(--shadow-1);
}
.maps__tab:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }

.maps__table {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-1);
}

.maps__note {
  margin: var(--space-5) 0 0;
  font-size: var(--text-sm);
  color: var(--muted);
  line-height: 1.5;
}

.maps__foot {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-8);
}

@media (prefers-reduced-motion: reduce) {
  .maps__tab { transition: none; }
}
</style>
