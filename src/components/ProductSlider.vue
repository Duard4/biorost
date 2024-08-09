<template>
    <div>
        <div class="slider">
            <div v-for="(item, index) in filteredItems" :key="index"
                :class="[`flip-box item ${item.type}`, { active: item.id === activeIndex }]">
                <div class="flip-box-inner">
                    <div class="flip-box-front">
                        <img :src="getImageUrl(item.frontImage)" :alt="item.title + ` (${getTransliteratedTitle(item.title)})`" />
                    </div>
                    <div class="flip-box-back" v-if="item.backImage">
                        <img :src="getImageUrl(item.backImage)" :alt="item.title + ` опис (${getTransliteratedTitle(item.title)} description)`" />
                    </div>
                </div>
            </div>
            <button id="prev" @click="prevSlide">&#10094;</button>
            <button id="next" @click="nextSlide">&#10095;</button>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import Hammer from 'hammerjs';
import SearchComponent from './SearchComponent.vue';
import { eventBus } from '../js/eventBus';
import transliterate from 'transliterate';

export default {
    name: 'ProductSlider',
    components: {
        SearchComponent,
    },
    props: {
        filteredItems: Array,
    },
    data() {
        return {
            activeIndex: 0,
        };
    },
    methods: {
        loadShow() {
            const items = this.$el.querySelectorAll('.item');
            let stt = 0;
            if (items[this.activeIndex]) {
                items[this.activeIndex].style.transform = `none`;
                items[this.activeIndex].style.zIndex = 1;
                items[this.activeIndex].style.filter = 'none';
                items[this.activeIndex].style.opacity = 1;
            }
            for (let i = this.activeIndex + 1; i < items.length; i++) {
                stt++;
                items[i].style.transform = `translateX(${130 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
                items[i].style.zIndex = -stt;
                items[i].style.filter = 'blur(5px)';
                items[i].style.opacity = stt > 2 ? 0 : 0.6;
            }
            stt = 0;
            for (let i = this.activeIndex - 1; i >= 0; i--) {
                stt++;
                items[i].style.transform = `translateX(${-130 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
                items[i].style.zIndex = -stt;
                items[i].style.filter = 'blur(5px)';
                items[i].style.opacity = stt > 2 ? 0 : 0.6;
            }
        },
        nextSlide() {
            this.activeIndex =
                this.activeIndex + 1 < this.filteredItems.length ? this.activeIndex + 1 : this.activeIndex;
            this.loadShow();
        },
        prevSlide() {
            this.activeIndex =
                this.activeIndex - 1 >= 0 ? this.activeIndex - 1 : this.activeIndex;
            this.loadShow();
        },
        getImageUrl(path) {
            return new URL(path, import.meta.url).href;
        },
        getTransliteratedTitle(title) {
            return transliterate(title);
        },
        scrollToSlide(index) {
            this.activeIndex = index;
            this.loadShow();
        },
    },
    watch: {
        filteredItems() {
            this.activeIndex = 0;
            this.$nextTick(() => {
                this.loadShow();
            });
        },
    },
    mounted() {
        this.loadShow();

        // Integrate Hammer.js for swipe gestures
        const slider = this.$el.querySelector('.slider');
        this.hammer = new Hammer(slider);

        this.hammer.on('swipeleft', this.nextSlide);
        this.hammer.on('swiperight', this.prevSlide);

        eventBus.on('scrollToSlide', this.scrollToSlide);
    },
    beforeUnmount() {
        // Clean up Hammer.js events
        if (this.hammer) {
            this.hammer.off('swipeleft', this.nextSlide);
            this.hammer.off('swiperight', this.prevSlide);
            this.hammer.destroy();
        }

        eventBus.off('scrollToSlide', this.scrollToSlide);
    },
};
</script>
