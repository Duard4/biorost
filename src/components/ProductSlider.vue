<template>
    <div class="slider">
        <div v-for="(item, index) in items" :key="index" :class="['flip-box item', { active: index === activeIndex }]">
            <div class="flip-box-inner">
                <div class="flip-box-front">
                    <img :src="getImageUrl(item.frontImage)" alt="">
                </div>
                <div class="flip-box-back" v-if="item.backImage">
                    <img :src="getImageUrl(item.backImage)" alt="">
                </div>
            </div>
        </div>
        <button id="prev" @click="prevSlide">&#10094;</button>
        <button id="next" @click="nextSlide">&#10095;</button>
    </div>
</template>

<script>
import { items } from '../js/data';

export default {
    name: 'ProductSlider',
    data() {
        return {
            items: items,
            activeIndex: 3,
        };
    },
    methods: {
        loadShow() {
            const items = this.$el.querySelectorAll(".item");
            let stt = 0;
            items[this.activeIndex].style.transform = `none`;
            items[this.activeIndex].style.zIndex = 1;
            items[this.activeIndex].style.filter = "none";
            items[this.activeIndex].style.opacity = 1;
            for (let i = this.activeIndex + 1; i < items.length; i++) {
                stt++;
                items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt
                    }) perspective(16px) rotateY(-1deg)`;
                items[i].style.zIndex = -stt;
                items[i].style.filter = "blur(5px)";
                items[i].style.opacity = stt > 2 ? 0 : 0.6;
            }
            stt = 0;
            for (let i = this.activeIndex - 1; i >= 0; i--) {
                stt++;
                items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt
                    }) perspective(16px) rotateY(1deg)`;
                items[i].style.zIndex = -stt;
                items[i].style.filter = "blur(5px)";
                items[i].style.opacity = stt > 2 ? 0 : 0.6;
            }
        },
        nextSlide() {
            this.activeIndex = this.activeIndex + 1 < this.items.length ? this.activeIndex + 1 : this.activeIndex;
            this.loadShow();
        },
        prevSlide() {
            this.activeIndex = this.activeIndex - 1 >= 0 ? this.activeIndex - 1 : this.activeIndex;
            this.loadShow();
        },
        getImageUrl(path) {
            return new URL(path, import.meta.url).href;
        }
    },
    mounted() {
        this.loadShow();
    },
};
</script>

<style scoped>

</style>
