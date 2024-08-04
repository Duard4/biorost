<template>
    <div>
        <!-- Фильтр для настольных компьютеров -->
        <ul class="product-types-list desktop" @click="filterItems">
            <li class="ptl-item searchable" v-for="type in types" :key="type.id"
                :class="{ active: isActiveType(type.id) }" :data-id="type.id">
                {{ type.name }}
            </li>
        </ul>
        <!-- Фильтр для мобильных устройств -->
        <select class="product-types-select mobile" @change="filterItems">
            <option class="product-option" v-for="type in types" :key="type.id" :value="type.id" :selected="isActiveType(type.id)">
                {{ type.name }}
            </option>
        </select>
    </div>
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
            const typeId = event.target.dataset.id || event.target.value;
            if (typeId != null) {
                emit('update:filteredItems', items.filter(item => item.type.includes(typeId)));
                emit('update:selectedType', typeId);
            }
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
.desktop {
    display: none;
}

.mobile {
    display: block;
    
}
.product-title {
    margin-bottom: 12px;
}
.product-types-select {
    font-size: 20px;
    color: var(--white);
    margin: 0 auto;
    text-align: center;
    
    background-color: var(--slateOp);
    backdrop-filter: blur(30px);
    box-shadow: 2px 2px 4px var(--slateOp);
}
.product-option {
    color: var(--slate);
    font-size: 12px;
}

/* Стили для настольных устройств */
@media (min-width: 768px) {
    .desktop {
        display: flex;
    }

    .product-title {
        margin-bottom: 2rem;
    }
    .mobile {
        display: none;
    }
}
</style>