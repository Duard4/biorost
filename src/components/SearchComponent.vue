<template>
    <div class="search-wrapper">
        <input type="text" class="search-field" placeholder="Пошук" v-model="searchQuery" @input="performSearch" />
        <svg class="icon search-icon" width="20" height="20">
            <use href="../assets/icons.svg#icon-search"></use>
        </svg>
        <ul v-if="searchResults.length" class="search-results">
            <li v-for="(result, index) in searchResults" :key="index" @click="scrollToElement(result)">
                {{ result.title }}
            </li>
        </ul>
    </div>
</template>

<script>
import { eventBus } from '../js/eventBus';

export default {
    name: 'SearchBar',
    data() {
        return {
            searchQuery: '',
            searchResults: []
        };
    },
    methods: {
        performSearch() {
            const query = this.searchQuery.toLowerCase();
            const results = [];

            const items1 = document.querySelectorAll('.slider .item img');
            const items2 = document.querySelectorAll('.visually-hidden .item img');
            const items = [...items1, ...items2];
            items.forEach((item, index) => {
                if (query!='' && query != ' ' && item.alt.toLowerCase().includes(query)) {
                    results.push({ index, item, title: item.alt });
                }
            });

            this.searchResults = results;
        },
        scrollToElement(result) {
            const element = document.getElementById('products');
            element.scrollIntoView({'behaviour' :'smooth'});
            eventBus.emit('openType', result.item);
            eventBus.emit('scrollToSlide', result.index);
            this.searchResults = [];
            this.searchQuery = '';
        }
    }
};
</script>

<style scoped>
/* Add your styles here */
</style>
