<template>
    <ul class="product-types-list" @click="filterItems">
        <li class="ptl-item searchable" v-for="type in types" :key="type.id" :class="{ active: isActiveType(type.id) }"
            :data-id="type.id">
            {{ type.name }}
        </li>
    </ul>
</template>

<script>
import { items, types } from '../js/data';
import { useFilter } from '../js/useFilter';

export default {
    name: 'ProductFilter',

    setup() {
        const { selectedType, filteredItems, filterItems, isActiveType, setType } = useFilter(items);

        return {
            selectedType,
            types,
            isActiveType,
            filteredItems,
            filterItems,
        };
    }
};
</script>

<style scoped>
.product-types-list {
    margin: 0 auto 72px;
    max-width: 1020px;
    flex-wrap: wrap;
}
</style>
