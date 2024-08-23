<template>
    <div v-if="isVisible" class="fullscreen-modal" @click="closeModal">
        <img :src="imageSrc" alt="Fullscreen Image" class="fullscreen-image" />
    </div>
</template>

<script>
export default {
    name: 'FullscreenImageModal',
    props: {
        isVisible: Boolean,
        imageSrc: String
    }
}
</script>

<style scoped>
.fullscreen-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    opacity: 1;
    align-items: center;
    z-index: 1000;
}

.fullscreen-image {
    max-width: 100%;
    max-height: 100%;
    touch-action: pinch-zoom;
}

</style>
