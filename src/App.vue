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
import Layout from "./components/Layout.vue";

import { defineAsyncComponent } from "vue";

const HeroSection = defineAsyncComponent(() =>
  import("./sections/HeroSection.vue")
);
const AboutSection = defineAsyncComponent(() =>
  import("./sections/AboutSection.vue")
);
const ProductsSection = defineAsyncComponent(() =>
  import("./sections/ProductsSection.vue")
);
const InjMapsSection = defineAsyncComponent(() =>
  import("./sections/InjMapsSection.vue")
);
const NewsSection = defineAsyncComponent(() =>
  import("./sections/NewsSection.vue")
);
const VacanciesSection = defineAsyncComponent(() =>
  import("./sections/VacanciesSection.vue")
);
const ContactSection = defineAsyncComponent(() =>
  import("./sections/ContactSection.vue")
);

export default {
  name: "App",
  components: {
    Layout,
    HeroSection,
    AboutSection,
    ProductsSection,
    InjMapsSection,
    NewsSection,
    VacanciesSection,
    ContactSection,
  },
};
</script>
