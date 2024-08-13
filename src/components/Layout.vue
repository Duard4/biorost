<!-- src/components/Layout.vue -->
<template>
    <div>
        <HeaderComponent />
        <NavComponent />
        <main>
            <slot></slot>
        </main>
        <!-- <a class="top-btn" href="#">
            <svg class="top-btn-svg" width="28" height="28">
                <use href="../assets/icons.svg#icon-circle-up"></use>
            </svg>
        </a> -->
        <FooterComponent />
    </div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';
import FooterComponent from './FooterComponent.vue';
import NavComponent from './NavComponent.vue';

export default {
    name: 'Layout',
    components: {
        HeaderComponent,
        FooterComponent,
        NavComponent
    }
}
</script>

<style scoped>
/* ваши стили для Layout */
</style>