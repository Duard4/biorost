<!-- src/components/CertificateModal.vue -->
<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <button class="modal-close" @click="closeModal">&times;</button>
            <div class="slider">
                <div class="slider-content">
                    <img :src="currentImage" class="large-image" alt="certificate">
                    <button class="slider-button prev" @click="prevSlide">&#10094;</button>
                    <button class="slider-button next" @click="nextSlide">&#10095;</button>
                </div>
                <div class="thumbnail-wrapper">
                    <img v-for="(image, index) in images" :key="index" :src="image" class="thumbnail"
                        :class="{ active: index === currentIndex }" @click="setCurrentSlide(index)" />
                </div>
            </div>
        </div>
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
    width: 100%;
    max-height: 460px;
    object-fit: contain;
}

.slider-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.15);
    color: #fff;
    border: none;
    font-size: 30px;
    cursor: pointer;
    padding: 10px;
    height: 100%;
}
.slider-button:hover, .slider-button:focus  {
    background: rgba(0, 0, 0, 0.25);
}
.slider-button.prev {
    left: -85px;
}

.slider-button.next {
    right: -85px;
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
</style>