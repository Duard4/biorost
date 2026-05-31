<script setup>
import { useProductCatalog } from "../../js/useProductCatalog";

const { categories, selectedType, selectType } = useProductCatalog();
</script>

<template>
  <div class="filter" role="group" aria-label="Фільтр за категорією продукції">
    <ul class="filter__list">
      <li v-for="cat in categories" :key="cat.id">
        <button
          type="button"
          class="filter__btn"
          :class="{ 'is-active': selectedType === cat.id }"
          :aria-pressed="selectedType === cat.id"
          @click="selectType(cat.id)"
        >
          {{ cat.name }}
          <span class="filter__count">{{ cat.count }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.filter {
  margin-inline: calc(-1 * var(--space-4));
  padding-inline: var(--space-4);
  /* mobile: a single scrollable row, no wrapping */
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.filter::-webkit-scrollbar {
  display: none;
}

.filter__list {
  display: flex;
  gap: var(--space-2);
  list-style: none;
  margin: 0;
  padding: 0;
  width: max-content;
}

.filter__btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  /* ≥44px tap target for outdoor / older-user comfort */
  min-height: 44px;
  padding: var(--space-2) var(--space-4);
  border: 1.5px solid color-mix(in oklch, var(--on-brand) 35%, transparent);
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--on-brand);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background var(--dur) var(--ease-out-quart),
    color var(--dur) var(--ease-out-quart),
    border-color var(--dur) var(--ease-out-quart);
}

.filter__btn:hover {
  border-color: var(--on-brand);
  background: color-mix(in oklch, var(--on-brand) 12%, transparent);
}

.filter__btn:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

/* Active state pairs color with weight + a solid fill, never color alone */
.filter__btn.is-active {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--on-accent);
}

.filter__count {
  font-size: var(--text-xs);
  font-weight: 700;
  padding: 0 var(--space-2);
  border-radius: var(--radius-full);
  background: color-mix(in oklch, currentColor 16%, transparent);
}

@media (min-width: 768px) {
  .filter {
    margin-inline: 0;
    padding-inline: 0;
    overflow-x: visible;
  }
  .filter__list {
    flex-wrap: wrap;
    justify-content: center;
    width: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .filter__btn {
    transition: none;
  }
}
</style>
