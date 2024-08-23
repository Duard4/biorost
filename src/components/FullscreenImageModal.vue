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
            // Блокируем прокрутку страницы, но оставляем возможность зума
            document.body.style.overflow = 'hidden';
            // Отключаем только вертикальную прокрутку, сохраняя другие жесты
            document.addEventListener('touchmove', this.preventScroll, { passive: false });
        },
        enableScroll() {
            // Включаем прокрутку страницы
            document.body.style.overflow = '';
            document.removeEventListener('touchmove', this.preventScroll);
        },
        preventScroll(event) {
            // Блокируем прокрутку только при вертикальном движении, разрешая масштабирование
            if (event.touches.length > 1) {
                return; // Не блокируем жесты с двумя пальцами (например, зум)
            }
            event.preventDefault(); // Блокируем стандартное поведение прокрутки
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
    touch-action: none; /* Отключаем действия по умолчанию, но сохраняем зумирование */
}
</style>
