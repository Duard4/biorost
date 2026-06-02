<!-- src/components/Layout.vue -->
<template>
    <div>
        <Navbar />
        <main>
            <slot></slot>
        </main>
        <FooterComponent />
    </div>
</template>

<script>
import Navbar from './Navbar.vue';
import FooterComponent from './FooterComponent.vue';

export default {
    name: 'Layout',
    components: {
        Navbar,
        FooterComponent
    }
}
</script>

<style scoped>
/* ваши стили для Layout */
</style>