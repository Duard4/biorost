<template>
    <div>
        <div class="slider">
            <div v-for="(item, index) in filteredItems" :key="index"
                :class="[`flip-box item ${item.type}`, { active: item.id === activeIndex }]">
                <div class="flip-box-inner">
                    <div class="flip-box-front">
                        <img :src="getImageUrl(item.frontImage)"
                            :alt="item.title + ` (${getTransliteratedTitle(item.title)})`" :data-id="item.type"
                            :class="`prod-img-item`" :data-index="item.id" />
                    </div>
                    <div class="flip-box-back" v-if="item.backImage" @click="openModal(getImageUrl(item.backImage))">
                        <img :src="getImageUrl(item.backImage)"
                            :alt="item.title + ` опис (${getTransliteratedTitle(item.title)} description)`"
                            :data-id="item.type" />
                    </div>
                </div>
            </div>
            <button id="prev" @click="prevSlide">&#10094;</button>
            <button id="next" @click="nextSlide">&#10095;</button>
        </div>
        <div class="visually-hidden">
            <!-- Existing code... -->
            <div v-for="(item, index) in extraItems" :class="[`flip-box item ${item.type}`]">
                <div class="flip-box-inner">
                    <div class="flip-box-front">
                        <img :src="getImageUrl(item.frontImage)"
                            :alt="item.title + ` (${getTransliteratedTitle(item.title)})`" :data-id="item.type"
                            :data-index="item.id" />
                    </div>
                    <div class="flip-box-back" v-if="item.backImage">
                        <img :src="getImageUrl(item.backImage)"
                            :alt="item.title + ` опис (${getTransliteratedTitle(item.title)} description)`"
                            :data-id="item.type" />
                    </div>
                </div>
            </div>
        </div>
        <!-- Add FullscreenImageModal -->
        <fullscreen-image-modal :isVisible="showModal" :imageSrc="modalImageSrc"
            @close="closeModal"></fullscreen-image-modal>
    </div>
</template>


<script>
import Hammer from 'hammerjs';
import SearchComponent from './SearchComponent.vue';
import FullscreenImageModal from './FullscreenImageModal.vue';
import { eventBus } from '../js/eventBus';
import transliterate from 'transliterate';

export default {
    name: 'ProductSlider',
    components: {
        SearchComponent,
        FullscreenImageModal
    },
    props: {
        filteredItems: Array,
        extraItems: Array
    },
    data() {
        return {
            activeIndex: 0,
            showModal: false,
            modalImageSrc: ''
        };
    },
    methods: {
        loadShow() {
            const items = this.$el.querySelectorAll('.item');

            const itemStyles = [];
            const activeIndex = this.activeIndex;

            for (let i = 0; i < items.length; i++) {
                itemStyles.push({
                    element: items[i],
                    index: i,
                    isActive: i === activeIndex
                });
            }

            requestAnimationFrame(() => {
                itemStyles.forEach(({ element, index, isActive }) => {
                    const stt = Math.abs(activeIndex - index);

                    if (isActive) {
                        element.style.transform = `none`;
                        element.style.zIndex = 1;
                        element.style.filter = 'none';
                        element.style.opacity = 1;
                    } else {
                        const direction = index > activeIndex ? 1 : -1;
                        element.style.transform = `translateX(${130 * stt * direction}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(${direction * -1}deg)`;
                        element.style.zIndex = -stt;
                        element.style.filter = 'blur(5px)';
                        element.style.opacity = stt > 2 ? 0 : 0.6;
                    }
                });
            });
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
        scrollToSlide(id) {
            const products = document.querySelectorAll(".prod-img-item");

            let res = 0;
            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                if (product.dataset.index == id) {
                    res = i;
                    break;
                }
            }
            this.activeIndex = res;
            this.loadShow();
        },
        openModal(imageSrc) {
            if (window.innerWidth <= 768) {
                const productSection = document.getElementById('products');
                productSection.scrollIntoView({ behavior: 'smooth' });
                this.modalImageSrc = imageSrc;
                this.showModal = true;
            }
        },
        closeModal() {
            this.showModal = false;
        }

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

        const slider = this.$el.querySelector('.slider');
        this.hammer = new Hammer(slider);

        this.hammer.on('swipeleft', this.nextSlide);
        this.hammer.on('swiperight', this.prevSlide);

        eventBus.on('scrollToSlide', this.scrollToSlide);
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        if (this.hammer) {
            this.hammer.off('swipeleft', this.nextSlide);
            this.hammer.off('swiperight', this.prevSlide);
            this.hammer.destroy();
        }

        eventBus.off('scrollToSlide', this.scrollToSlide);
        window.removeEventListener('resize', this.handleResize);
    },
};
</script>

<style scoped>
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
}
</style>