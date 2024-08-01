<template>
    <nav class="nav">
        <div class="container">
            <ul class="nav-list">
                <li v-for="link in navLinks" :key="link.text" class="nav-item">
                    <a :href="link.href" class="nav-link">{{ link.text }}</a>
                </li>
            </ul>
            <div class="search-wrapper">
                <input type="text" v-if="searchResults.length" class="search-field brd" placeholder="Пошук" v-model="searchQuery" @input="performSearch" />
                <input type="text" v-else class="search-field" placeholder="Пошук" v-model="searchQuery" @input="performSearch" />
                
                <svg class="icon search-icon" width="20" height="20">
                    <use href="../assets/icons.svg#icon-search"></use>
                </svg>
                <ul v-if="searchResults.length" class="search-results">
                    <li v-for="(result, index) in searchResults" :key="index" v-html="result.html" @click="scrollToElement(result)"></li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { ref, provide } from 'vue';
import { items } from '../js/data';

export default {
    name: 'NavComponent',
    mounted() {
        this.header = document.querySelector('.nav');
        this.headerHeight = document.querySelector('.nav').clientHeight + document.querySelector('.header').clientHeight;

        this.scrollHandler = () => {
            let scroll = window.scrollY;
            if (scroll > this.headerHeight) {
                this.header.classList.add('fixed-nav');
            } else {
                this.header.classList.remove('fixed-nav');
            }
        };

        window.addEventListener('scroll', this.scrollHandler);
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.scrollHandler);
    },
    setup() {
        const searchQuery = ref('');
        const searchResults = ref([]);
        const setType = ref(null);
        const scrollTo = ref(null);

        const performSearch = () => {
            const query = searchQuery.value.trim().toLowerCase();
            if (!query) {
                searchResults.value = [];
                return;
            }

            const searchableElements = document.querySelectorAll('.searchable');
            const results = new Map();
            const contextLength = 20;

            searchableElements.forEach((element) => {
                const text = element.textContent.toLowerCase();
                let startIndex = 0;
                while ((startIndex = text.indexOf(query, startIndex)) !== -1) {
                    const start = Math.max(0, startIndex - contextLength);
                    const end = Math.min(text.length, startIndex + query.length + contextLength);
                    let context = element.textContent.substring(start, end);
                    if (start > 0) context = '...' + context;
                    if (end < text.length) context += '...';

                    const highlighted = context.replace(
                        new RegExp(query, 'gi'),
                        (match) => `<span class="highlight" style="background-color: rgba(245, 192, 63, 1);">${match}</span>`
                    );

                    if (!results.has(element.textContent)) {
                        results.set(element.textContent, {
                            element,
                            html: highlighted
                        });
                    }

                    startIndex += query.length;
                }
            });

            searchResults.value = Array.from(results.values());
        };

        const scrollToElement = (result) => {
            const element = result.element;
            const typeId = element.closest('.ptl-item')?.dataset?.id;
            const itemId = element.closest('.slider-item')?.dataset?.id;

            if (typeId) {
                setType.value = typeId;

                // Обновляем выбранный тип
                document.querySelector(`[data-id="${typeId}"]`).click();
            }

            if (itemId) {
                scrollTo.value = itemId;

                // Находим индекс элемента и переходим к нему
                const itemIndex = Array.from(document.querySelectorAll('.slider-item')).findIndex(item => item.dataset.id == itemId);
                if (itemIndex !== -1) {
                    const currentPage = Math.floor(itemIndex / slidesToShow.value);
                    goToSlide(currentPage);
                }
            }

            element.scrollIntoView({ behavior: 'smooth' });

            // Добавляем оффсет
            const yOffset = -100; // Настройте значение при необходимости
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        };

        provide('setType', setType);
        provide('scrollTo', scrollTo);

        return {
            navLinks: [
                { text: 'Головна', href: './index#' },
                { text: 'Про нас', href: './index#about-us' },
                { text: 'Продукція', href: './index#products' },
                { text: 'Статті', href: './index#articles' },
                { text: 'Контакти', href: './index#contact-us' },
            ],
            searchQuery,
            searchResults,
            performSearch,
            scrollToElement,
        };
    }
};
</script>

<style scoped>

.search-results li {
    padding: 10px;
    cursor: pointer;
}
</style>
