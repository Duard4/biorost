<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
            <!-- Thumbnails on the left side -->
            <div class="thumbnail-container">
                <div class="thumbnail-wrapper">
                    <img v-for="(image, index) in images" :key="index" :src="image" class="thumbnail"
                        :class="{ active: index === currentIndex }" @click="setCurrentSlide(index)" alt="Thumbnail" />
                </div>
            </div>

            <!-- Main document/image viewer -->
            <div class="document-viewer">
                <img :src="currentImage" class="large-image" alt="Certificate" />
            </div>
        </div>
        <button class="modal-close" @click="closeModal">&times;</button>
    </div>
</template>

<script>
export default {
    name: "CertificateModal",
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
            this.$emit("close");
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

.modal-container {
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-evenly;
    background: #f9f9f9;
    border-radius: 10px;
    overflow: hidden;
    width: 90vw;
    height: 80vh;
    max-width: 1200px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.thumbnail-container {
    background-color: #ececec;
    padding: 10px;
}

.thumbnail-wrapper {
    height: 100%;
    display: flex;
    height: 8rem;
    gap: 10px;
}

.thumbnail {
    width: auto;
    height: auto;
    cursor: pointer;
    border-radius: 4px;
    object-fit: cover;
    opacity: 0.6;
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.thumbnail.active,
.thumbnail:hover {
    opacity: 1;
    transform: scale(1.05);
}

.document-viewer {
    width: 100%;
    padding: 10px;
    overflow-y: auto;
    background: white;
    display: flex;
    justify-content: center;
    align-items: baseline;
}

@media (min-width: 768px) {
    .document-viewer {
        padding: 20px;
    }

    .thumbnail-wrapper {
        height: unset;
        flex-direction: column
    }

    .modal-container {
        flex-direction: row;
    }

    .thumbnail-container {
        width: 20%;
        height: unset;
    }
}

.large-image {
    max-width: 100%;
    object-fit: contain;
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    background: transparent;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
}
</style>