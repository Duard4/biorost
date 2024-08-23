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
    },
    methods: {
        closeModal() {
            this.$emit('close');
            this.enableScroll(); // Включаем прокрутку при закрытии модального окна
        },
        disableScroll() {
            // Блокируем прокрутку
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
            document.addEventListener('touchmove', this.preventScroll, { passive: false });
        },
        enableScroll() {
            // Включаем прокрутку
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
            document.removeEventListener('touchmove', this.preventScroll);
        },
        preventScroll(event) {
            // Предотвращаем стандартное поведение скроллинга
            event.preventDefault();
        }
    },
    watch: {
        isVisible(newVal) {
            if (newVal) {
                this.disableScroll(); // Выключаем прокрутку при открытии модального окна
            } else {
                this.enableScroll(); // Включаем прокрутку при закрытии модального окна
            }
        }
    },
    beforeDestroy() {
        // Убедитесь, что события удалены при уничтожении компонента
        this.enableScroll();
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
    align-items: center;
    z-index: 9999;
}

.fullscreen-image {
    max-width: 100%;
    max-height: 100%;
}
</style>
