<script setup>
import { ref } from "vue";
import { useProductCatalog, categoryName } from "../js/useProductCatalog";

const { searchProducts, focusProduct } = useProductCatalog();

const searchQuery = ref("");
const searchResults = ref([]);

function performSearch() {
  searchResults.value = searchProducts(searchQuery.value);
}

function selectResult(product) {
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  focusProduct(product);
  searchResults.value = [];
  searchQuery.value = "";
}
</script>

<template>
  <div class="search-wrapper">
    <input
      type="text"
      class="search-field"
      placeholder="Пошук продукції"
      aria-label="Пошук продукції"
      v-model="searchQuery"
      @input="performSearch"
    />
    <svg class="icon search-icon" width="20" height="20" aria-hidden="true">
      <use href="/assets/icons.svg#icon-search"></use>
    </svg>
    <ul v-if="searchResults.length" class="search-results">
      <li
        v-for="product in searchResults"
        :key="product.id"
        @click="selectResult(product)"
      >
        {{ product.title }}
        <small>{{ categoryName(product.type) }}</small>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-results small {
  display: block;
  color: var(--muted, #5a6b5a);
  font-size: 0.8em;
}
</style>
