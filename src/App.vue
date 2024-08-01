<!-- src/App.vue -->
<template>
  <Layout>
    <HeroSection />
    <AboutSection />
    <ProductsSection />
    <MapsSection />
    <NewsSection />
    <ContactSection />
  </Layout>
</template>

<script>
import Layout from './components/Layout.vue';
import HeroSection from './components/sections/HeroSection.vue';
import AboutSection from './components/sections/AboutSection.vue';
import ProductsSection from './components/sections/ProductsSection.vue';
import MapsSection from './components/sections/MapsSection.vue';
import NewsSection from './components/sections/NewsSection.vue';
import ContactSection from './components/sections/ContactSection.vue';

export default {
  name: 'App',
  components: {
    Layout,
    HeroSection,
    AboutSection,
    ProductsSection,
    MapsSection,
    NewsSection,
    ContactSection
  }
}
</script>

<style>
/* ваши общие стили */
</style>
