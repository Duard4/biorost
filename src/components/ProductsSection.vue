<template>
    <section class="section products" id="products">
        <div class="container">
            <h1 class="products-title searchable">Наша продукція</h1>
            <ProductFilter></ProductFilter>
            <ProductSlider></ProductSlider>
            
        </div>
    </section>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { items, types } from '../js/data';
import ProductSlider from './ProductSlider.vue'
import ProductFilter from './ProductFilter.vue'

export default {
    name: 'ProductTypesComponent',
    components: {
        ProductSlider,
        ProductFilter
    }
};
</script>

<style scoped>
.product-types-list {
    margin: 0 auto;
    max-width: 1020px;
    flex-wrap: wrap;
}
</style>
