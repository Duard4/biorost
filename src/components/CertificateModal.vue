<!-- src/components/CertificateModal.vue -->
<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <button class="modal-close" @click="closeModal">&times;</button>
            <div class="slider">
                <div class="slider-content">
                    <img :src="currentImage" class="large-image" alt="certificate">
                    <img :src="images[1]" class="large-image second" alt="certificate">
                </div>
                <div class="thumbnail-wrapper">
                    <img v-for="(image, index) in images" :key="index" :src="image" class="thumbnail"
                    :class="{ active: index === currentIndex }" @click="setCurrentSlide(index)" />
                </div>
            </div>
        </div>
        <button class="slider-button prev" @click="prevSlide">&#10094;</button>
        <button class="slider-button next" @click="nextSlide">&#10095;</button>
    </div>
</template>

<script>
export default {
    name: 'CertificateModal',
    props: {
        showModal: {
            type: Boolean,
            required: true,
        },
        images: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            currentIndex: 0,
        };
    },
    computed: {
        currentImage() {
            return this.images[this.currentIndex];
        },
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        prevSlide() {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = this.images.length - 1;
            }
        },
        nextSlide() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
        },
        setCurrentSlide(index) {
            this.currentIndex = index;
        },
    },
};
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    z-index: 998;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #fff;
    padding: 40px 20px 20px;
    z-index: 999;
    position: relative;
    background: rgb(239, 239, 239);
    display: flex;
    gap: 1rem;
    border-radius: 10px;
    margin: auto;
    overflow: hidden;
}

.modal-close {
    position: absolute;
    top: 4px;
    right: 4px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.15);
    color: white;
    border: none;

    width: 2.3rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    cursor: pointer;
}

.slider {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.slider-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

}

.large-image {
    max-height: 80vh;
    object-fit: contain;
}

.slider-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(109, 238, 77, 0.39);
    color: #fff;
    border: none;
    font-size: 30px;
    cursor: pointer;
    padding: 10px;
    height: 100%;
}

.slider-button:hover,
.slider-button:focus {
    background: rgba(0, 0, 0, 0.25);
}

.slider-button.prev {
    left: 0;
}

.slider-button.next {
    right: 0;
}
.second {
    display: none;
}
.thumbnail-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.thumbnail {
    width: 100px;
    height: 60px;
    object-fit: cover;
    margin: 0 5px;
    cursor: pointer;
    opacity: 0.5;
}

.thumbnail.active {
    opacity: 1;
}

@media (min-width: 768px) {
    .thumbnail-wrapper, slider-button {
        display: none;
    }
    .second {
        display: block;
    }
    .slider-button {
        display: none;
    }
}

@media (min-width: 1024px) {

    .modal-content {
        width: 65vw;
        display: flex;
        justify-content: space-between;
    }

    .large-image {
        max-height: unset;
        width: 30vw;
    }
}
</style>