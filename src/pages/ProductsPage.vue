<script setup>
import ProductCategoryFilter from "../components/product/ProductCategoryFilter.vue";
import ProductGallery from "../components/product/ProductGallery.vue";
import { items } from "../js/data";
import { usePageSeo } from "../js/seo";

usePageSeo({
  title: "Продукція ТМ «Біорост» – органічні добрива, інокулянти, біопрепарати",
  description:
    "Каталог органічних та органо-мінеральних добрив, інокулянтів, біофунгіцидів, біоінсектицидів і ґрунтових бактерій ТМ «Біорост». Склад, дія та норми внесення.",
  path: "/products",
});

const count = items.length;
</script>

<template>
  <div class="page products">
    <div class="container">
      <header class="products__head">
        <p class="products__kicker">Каталог · {{ count }} продуктів</p>
        <h1 class="products__title">Наша продукція</h1>
        <p class="products__lead">
          Органо-мінеральні добрива, інокулянти, біофунгіциди, біоінсектициди,
          ґрунтові бактерії та фітогормони — для промислових господарств і
          приватних ділянок по всій Україні.
        </p>
      </header>

      <ProductCategoryFilter />
      <div class="products__gallery">
        <ProductGallery />
      </div>

      <div class="products__foot">
        <p>Потрібна допомога з вибором або норми внесення?</p>
        <div class="products__foot-actions">
          <router-link class="btn btn--on-dark" to="/maps">Карти внесення</router-link>
          <router-link class="btn btn--primary" to="/contacts#form">Замовити консультацію</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.products {
  background:
    radial-gradient(130% 90% at 50% -10%, var(--brand) 0%, var(--brand-deep) 100%);
  color: var(--on-brand);
  padding-block: clamp(2.5rem, 1.5rem + 5vw, 5rem);
  min-height: 100vh;
}
.products__head {
  text-align: center;
  max-width: 60ch;
  margin: 0 auto var(--space-8);
}
.products__kicker {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--spark);
  margin: 0 0 var(--space-3);
}
.products__title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-3xl);
  line-height: 1.04;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-4);
  text-wrap: balance;
}
.products__lead {
  font-size: var(--text-lg);
  line-height: 1.55;
  color: color-mix(in oklch, var(--on-brand) 86%, transparent);
  margin: 0;
  text-wrap: pretty;
}
.products__gallery { margin-top: var(--space-8); }

.products__foot {
  margin-top: var(--space-16);
  padding-top: var(--space-8);
  border-top: 1px solid color-mix(in oklch, var(--on-brand) 18%, transparent);
  text-align: center;
}
.products__foot p {
  margin: 0 0 var(--space-4);
  font-size: var(--text-lg);
  color: color-mix(in oklch, var(--on-brand) 88%, transparent);
}
.products__foot-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
}
</style>
