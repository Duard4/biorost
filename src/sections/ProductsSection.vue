<script setup>
import ProductCategoryFilter from "../components/product/ProductCategoryFilter.vue";
import ProductGallery from "../components/product/ProductGallery.vue";
</script>

<template>
  <section class="products section" id="products">
    <div class="container">
      <header class="products__head">
        <h2 class="products__title searchable">Наша продукція</h2>
        <p class="products__lead">
          Органо-мінеральні добрива, інокулянти, біофунгіциди та інші рішення
          для аграріїв по всій Україні
        </p>
      </header>

      <ProductCategoryFilter />
      <ProductGallery />
    </div>
  </section>
</template>

<style scoped>
/* Committed green band — the catalog is the commercial core, so it carries
   the brand color. Texture from the existing field photo, kept subtle. */
.products {
  position: relative;
  /* clean deep-green band with a soft top highlight for depth (no muddy
     photo multiply) */
  background: radial-gradient(
    120% 90% at 50% -10%,
    var(--brand) 0%,
    var(--brand-strong) 100%
  );
  color: var(--on-brand);
  isolation: isolate;
}

.products__head {
  text-align: center;
  max-width: 60ch;
  margin: 0 auto var(--space-8);
}

.products__title {
  font-family: var(--font-display);
  font-size: var(--text-3xl);
  font-weight: 800;
  line-height: 1.05;
  margin: 0 0 var(--space-3);
  text-wrap: balance;
}

.products__lead {
  font-size: var(--text-lg);
  line-height: 1.5;
  color: color-mix(in oklch, var(--on-brand) 88%, var(--brand));
  margin: 0;
  text-wrap: pretty;
}

/* Space between the filter and the grid */
.products :deep(.filter) {
  margin-bottom: var(--space-8);
}
</style>
