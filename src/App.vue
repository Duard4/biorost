<!-- src/App.vue -->
<template>
  <Layout>
    <HeroSection />
    <AboutSection />
    <ProductsSection />
    <MapsSection />
    <NewsSection />
    <TeamSection />
    <ContactSection />
  </Layout>
</template>

<script>
import Layout from './components/Layout.vue';
import HeroSection from './components/HeroSection.vue';
import AboutSection from './components/AboutSection.vue';
import ProductsSection from './components/ProductsSection.vue';
import MapsSection from './components/MapsSection.vue';
import NewsSection from './components/NewsSection.vue';
import ContactSection from './components/ContactSection.vue';
import TeamSection from './components/TeamSection.vue';

export default {
  name: 'App',
  components: {
    Layout,
    HeroSection,
    AboutSection,
    ProductsSection,
    MapsSection,
    NewsSection,
    ContactSection,
    TeamSection
  }
}
</script>

<style>
/* ваши общие стили */
</style>
