<!-- src/components/Layout.vue -->
<template>
    <div>
        <HeaderComponent />
        <NavComponent />
        <main>
            <slot></slot>
        </main>
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