<template>
    <div v-if="isVisible" class="fullscreen-modal" @click.self="closeModal">
        <img :src="imageSrc" alt="Fullscreen Image" class="fullscreen-image" @wheel="zoomImage" @touchstart="startTouch"
            @touchmove="zoomTouch" />
    </div>
</template>

<script>
export default {
    name: 'FullscreenImageModal',
    props: {
        isVisible: Boolean,
        imageSrc: String
    },
    watch: {
        isVisible(newVal) {
            if (newVal) {
                document.body.style.overflow = 'hidden'; // Disable scroll
            } else {
                document.body.style.overflow = ''; // Re-enable scroll
            }
        }
    },
    data() {
        return {
            scale: 1,
            startDistance: null
        };
    },
    methods: {
        closeModal() {
            this.$emit('close');
        },
        zoomImage(event) {
            event.preventDefault();
            const zoomStep = 0.1;
            if (event.deltaY < 0) {
                this.scale = Math.min(this.scale + zoomStep, 5); // Limit zoom in
            } else {
                this.scale = Math.max(this.scale - zoomStep, 1); // Limit zoom out
            }
        },
        startTouch(event) {
            if (event.touches.length === 2) {
                this.startDistance = this.getDistance(event.touches);
            }
        },
        zoomTouch(event) {
            if (event.touches.length === 2) {
                const newDistance = this.getDistance(event.touches);
                const zoomStep = 0.01;
                const zoomChange = (newDistance - this.startDistance) * zoomStep;
                this.scale = Math.min(Math.max(this.scale + zoomChange, 1), 5);
                this.startDistance = newDistance;
            }
        },
        getDistance(touches) {
            const dx = touches[0].clientX - touches[1].clientX;
            const dy = touches[0].clientY - touches[1].clientY;
            return Math.sqrt(dx * dx + dy * dy);
        }
    }
};
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
    align-items: center;
    z-index: 1000;
}

.fullscreen-image {
    max-width: 100%;
    max-height: 100%;
    transform: scale(1);
    transition: transform 0.3s ease;
}

.fullscreen-image:active {
    cursor: grab;
}
</style>