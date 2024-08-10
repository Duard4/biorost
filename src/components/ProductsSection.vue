<template>
    <section class="section products" id="products">
        <div class="container">
            <h2 class="products-title searchable">Наша продукція</h2>
            <ProductFilter :selectedType="selectedType" @update:filteredItems="updateFilteredItems" @update:selectedType="updateSelectedType"></ProductFilter>
            <ProductSlider :filteredItems="filteredItems" :extraItems="extraItems"></ProductSlider>
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
        const extraItems = ref(items);
        
        const updateFilteredItems = (newItems, extra) => {
            filteredItems.value = newItems;
            extraItems.value = extra;

        };

        const updateSelectedType = (newType) => {
            selectedType.value = newType;
        };

        return {
            selectedType,
            filteredItems,
            extraItems,
            updateFilteredItems,
            updateSelectedType
        };
    }
};
</script>

