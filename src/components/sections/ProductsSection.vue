<template>
    <section class="section products" id="products">
        <div class="container">
            <h1 class="products-title searchable">Наша продукція</h1>
            <ul class="product-types-list" @click="filterItems">
                <li class="ptl-item searchable" v-for="type in types" :key="type.id" :class="{ active: isActiveType(type.id) }"
                    :data-id="type.id">
                    {{ type.name }}
                </li>
            </ul>

            <div class="slider-wrapper">
                <div class="slider">
                    <div class="slider-content-wrapper" id="slider-wrapper">
                        <div v-for="(item, index) in filteredItems" :key="item.id" :data-id="item.id"
                            :class="['slider-item', slideClass(index)]">
                                <v-img :src="item.imageSrc" class="product-item-img" ></v-img>
                                <v-card-title class="pil-title searchable">{{ item.title }}</v-card-title>
                                <v-card-text class="pil-text searchable points">{{ item.description }}</v-card-text>
                        </div>
                    </div>
                </div>
                <button class="slider-button-prev" id="prevBtn">&#10094;</button>
                <button class="slider-button-next" id="nextBtn">&#10095;</button>
                <div class="pagination" v-if="paginationDots.length > 1">
                    <span v-for="(dot, index) in paginationDots" :key="index"
                        :class="['pagination-dot', { active: currentPage === index }]" @click="goToSlide(index)">
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import { items, types } from '../../js/data';
import { useSlider } from '../../js/useSlider';
import { useFilter } from '../../js/useFilter';

export default {
    name: 'ProductTypesComponent',
    setup() {
        const slidesToShow = ref(3);

        const { selectedType, filteredItems, filterItems, isActiveType, setType } = useFilter(items);
        const { currentPage, paginationDots, updateSliderPosition, checkVisibility, goToSlide } = useSlider(filteredItems, slidesToShow);

        const slideClass = (index) => {
            if (index === 0) {
                return 'first-slide';
            } else if (index === filteredItems.value.length - 1) {
                return 'last-slide';
            }
            return '';
        };

        const scrollToElement = (result) => {
            const element = result.element;
            const typeId = element.closest('.ptl-item')?.dataset?.id;

            if (typeId) {
                setType(typeId);
            }

            const itemId = element.closest('.slider-item')?.dataset?.id;
            if (itemId) {
                const index = filteredItems.value.findIndex(item => item.id == itemId);
                if (index !== -1) {
                    goToSlide(Math.floor(index / slidesToShow.value));
                }
            }

            element.scrollIntoView({ behavior: 'smooth' });

            // Add offset
            const yOffset = -100; // Adjust this value as needed
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        };

        onMounted(() => {
            checkVisibility();

            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');

            prevBtn.addEventListener('click', () => {
                if (currentPage.value > 0) {
                    currentPage.value--;
                    updateSliderPosition();
                }
            });

            nextBtn.addEventListener('click', () => {
                if (currentPage.value < paginationDots.value.length - 1) {
                    currentPage.value++;
                    updateSliderPosition();
                }
            });

            window.addEventListener('resize', () => {
                checkVisibility();
                updateSliderPosition();
            });

            // Add a global event listener for search result clicks
            document.addEventListener('scroll-to-element', (e) => {
                scrollToElement(e.detail);
            });
        });

        watch(filteredItems, () => {
            currentPage.value = 0; // Reset to first page if items change
            updateSliderPosition();
        });

        return {
            selectedType,
            types,
            isActiveType,
            filteredItems,
            filterItems,
            slideClass,
            paginationDots,
            currentPage,
            goToSlide
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
