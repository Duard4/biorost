<!-- src/App.vue -->
<template>
  <Layout>
    <HeroSection />
    <AboutSection />
    <ProductsSection />
    <InjMapsSection />
    <NewsSection />
    <VacanciesSection />
    <ContactSection />
  </Layout>
</template>

<script>
import Layout from './components/Layout.vue';
import HeroSection from './components/sections/HeroSection.vue';
import AboutSection from './components/sections/AboutSection.vue';
import ProductsSection from './components/sections/ProductsSection.vue';
import InjMapsSection from './components/sections/InjMapsSection.vue';
import NewsSection from './components/sections/NewsSection.vue';
import VacanciesSection from './components/sections/VacanciesSection.vue';
import ContactSection from './components/sections/ContactSection.vue';

export default {
  name: 'App',
  components: {
    Layout,
    HeroSection,
    AboutSection,
    ProductsSection,
    InjMapsSection,
    NewsSection,
    VacanciesSection,
    ContactSection
  }
}
</script>

<style>
/* ваши общие стили */
</style>
