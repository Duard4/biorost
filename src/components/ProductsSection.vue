<template>
    <section class="section products" id="products">
        <div class="container">
            <h1 class="products-title searchable">Наша продукція</h1>
            <p class="products-text">Продукція ТМ «Біорост» входить в перелік продуктів, дозволених для використання в органічному землеробстві згідно реєстрації «ОРГАНІК СТАНДАРТ», що відображається на сайті цієї організації.</p>
            <ProductFilter :selectedType="selectedType" @update:filteredItems="updateFilteredItems" @update:selectedType="updateSelectedType"></ProductFilter>
            <ProductSlider :filteredItems="filteredItems"></ProductSlider>
        </div>
    </section>
</template>

<script>
import { ref } from 'vue';
import { items, types } from '../js/data';
import ProductSlider from './ProductSlider.vue';
import ProductFilter from './ProductFilter.vue';

export default {
    name: 'ProductTypesComponent',
    components: {
        ProductSlider,
        ProductFilter
    },
    setup() {
        const selectedType = ref(null);
        const filteredItems = ref(items);

        const updateFilteredItems = (newItems) => {
            filteredItems.value = newItems;
        };

        const updateSelectedType = (newType) => {
            selectedType.value = newType;
        };

        return {
            selectedType,
            filteredItems,
            updateFilteredItems,
            updateSelectedType
        };
    }
};
</script>

