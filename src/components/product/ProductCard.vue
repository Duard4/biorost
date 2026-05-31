<script setup>
import { categoryName } from "../../js/useProductCatalog";

const props = defineProps({
  product: { type: Object, required: true },
});
defineEmits(["open"]);
</script>

<template>
  <li class="card">
    <button
      type="button"
      class="card__btn"
      :aria-label="`${product.title} — детальніше`"
      @click="$emit('open', product)"
    >
      <span class="card__media">
        <img
          :src="product.frontImage"
          :alt="product.title"
          loading="lazy"
          decoding="async"
          width="300"
          height="380"
        />
      </span>
      <span class="card__body">
        <span class="card__cat">{{ categoryName(product.type) }}</span>
        <span class="card__title">{{ product.title }}</span>
        <span v-if="product.description" class="card__desc">{{
          product.description
        }}</span>
        <span class="card__more">Детальніше</span>
      </span>
    </button>
  </li>
</template>

<style scoped>
.card {
  list-style: none;
  display: flex;
}

.card__btn {
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: left;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  color: var(--ink);
  box-shadow: var(--shadow-1);
  transition: transform var(--dur) var(--ease-out-quart),
    box-shadow var(--dur) var(--ease-out-quart),
    border-color var(--dur) var(--ease-out-quart);
}

.card__btn:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-2);
  border-color: var(--brand);
}

.card__btn:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

.card__media {
  display: block;
  aspect-ratio: 4 / 5;
  background: var(--surface-sunk);
  overflow: hidden;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--dur-slow) var(--ease-out-quart);
}

.card__btn:hover .card__media img {
  transform: scale(1.04);
}

.card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
}

.card__cat {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--brand);
}

.card__title {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  line-height: 1.15;
  color: var(--brand-ink);
}

.card__desc {
  font-size: var(--text-sm);
  line-height: 1.5;
  color: var(--muted);
  /* clamp to keep the grid even; full text lives in the detail modal */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__more {
  margin-top: var(--space-1);
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--soil);
}

.card__more::after {
  content: " →";
  transition: margin-left var(--dur) var(--ease-out-quart);
}

.card__btn:hover .card__more::after {
  margin-left: var(--space-1);
}

@media (prefers-reduced-motion: reduce) {
  .card__btn,
  .card__media img,
  .card__more::after {
    transition: none;
  }
  .card__btn:hover {
    transform: none;
  }
  .card__btn:hover .card__media img {
    transform: none;
  }
}
</style>
