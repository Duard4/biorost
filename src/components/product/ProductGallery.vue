<script setup>
import { useProductCatalog } from "../../js/useProductCatalog";
import ProductCard from "./ProductCard.vue";
import ProductDetailModal from "./ProductDetailModal.vue";

const { filteredItems, openProduct } = useProductCatalog();
</script>

<template>
  <div class="gallery">
    <transition-group tag="ul" name="card" class="gallery__grid">
      <ProductCard
        v-for="(product, i) in filteredItems"
        :key="product.id"
        :product="product"
        :index="i"
        @open="openProduct"
      />
    </transition-group>

    <p v-if="!filteredItems.length" class="gallery__empty">
      У цій категорії поки немає продуктів.
    </p>

    <ProductDetailModal />
  </div>
</template>

<style scoped>
.gallery__grid {
  list-style: none;
  margin: 0;
  padding: 0;
  /* positioned ancestor so leaving cards (position:absolute) anchor here */
  position: relative;
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(min(240px, 100%), 1fr));
}

.gallery__empty {
  text-align: center;
  color: var(--on-brand);
  padding: var(--space-12) 0;
}

/* Re-layout animation when the filter changes the visible set */
.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(12px);
}
.card-enter-active {
  transition: opacity var(--dur) var(--ease-out-quart),
    transform var(--dur) var(--ease-out-quart);
  transition-delay: var(--dur-fast);
}
/* Leaving cards fade in place (kept in grid flow) so they never break out
   to full container width before the layout settles. */
.card-leave-active {
  transition: opacity var(--dur-fast) var(--ease-out-quart);
}
.card-move {
  transition: transform var(--dur-slow) var(--ease-out-quart);
}

@media (min-width: 768px) {
  .gallery__grid {
    gap: var(--space-6);
  }
}

@media (prefers-reduced-motion: reduce) {
  .card-enter-active,
  .card-leave-active,
  .card-move {
    transition: none;
  }
  .card-enter-from,
  .card-leave-to {
    opacity: 1;
    transform: none;
  }
}
</style>
