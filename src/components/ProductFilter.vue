<template>
    <ul class="product-types-list" @click="filterItems">
        <li class="ptl-item searchable" v-for="type in types" :key="type.id" :class="{ active: isActiveType(type.id) }" :data-id="type.id">
            {{ type.name }}
        </li>
    </ul>
</template>

<script>
import { ref } from 'vue';
import { items, types } from '../js/data';

export default {
    name: 'ProductFilter',
    props: {
        selectedType: String,
    },
    setup(props, { emit }) {
        const isActiveType = (id) => props.selectedType === id;

        const filterItems = (event) => {
            const typeId = event.target.dataset.id;
            emit('update:filteredItems', items.filter(item => item.type === typeId));
            emit('update:selectedType', typeId);
        };

        return {
            types,
            isActiveType,
            filterItems
        };
    }
};
</script>

<style scoped>

</style>
