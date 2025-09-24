<template>
  <section class="section about container" id="about-us">
    <div class="text-wrapper">
      <h2 class="about-title title searchable">{{ about.title }}</h2>
      <h3>{{ subtitleText }}</h3>
      <p class="about-text text searchable">{{ about.text }}</p>

      <button type="button" class="certificates-btn btn" @click="openModal">
        Сертифікати
      </button>
    </div>

    <div class="bg-img-wrapper">
      <p class="about-age-label">
        <span class="large">{{ years }}</span
        ><br />
        років<br />
        досвіду
      </p>
      <img
        src="../assets/bg-images/about.jpg"
        alt="sprouts"
        class="about-bg-img"
      />
    </div>

    <ul class="accordion">
      <li
        v-for="(row, index) in rows"
        :key="index"
        :class="{ active: row.active }"
        @click="toggleRow(index)"
      >
        <h3 class="accordion-title">{{ row.category }}</h3>
        <div
          class="accordion-content"
          v-if="row.active"
          v-html="row.description"
        ></div>
      </li>
    </ul>

    <CertificateModal
      :showModal="showModal"
      :images="images"
      @close="closeModal"
    />
  </section>
</template>

<script>
import CertificateModal from "../components/CertificateModal.vue";
import aboutData from "/src/assets/data/about.json";

export default {
  name: "AboutSection",
  components: { CertificateModal },
  data() {
    return {
      showModal: false,
      images: [
        "../assets/content-images/certificate-1.jpg",
        "../assets/content-images/certificate-2.jpg",
      ],
      about: aboutData,
      rows: aboutData.rows.map((r) => ({ ...r, active: false })),
    };
  },
  computed: {
    years() {
      return new Date().getFullYear() - this.about.founded;
    },
    subtitleText() {
      return this.about.subtitle.replace("{{years}}", this.years);
    },
  },
  mounted() {
    // Встановлюємо початковий стан залежно від ширини екрану
    this.setRowsByWidth();
    window.addEventListener("resize", this.handleResize);
  },
  // Якщо у тебе Vue 3 — заміни beforeDestroy на beforeUnmount
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    toggleRow(index) {
      // Просто мутуємо активність конкретного рядка — тепер це реактивно
      this.rows[index].active = !this.rows[index].active;
    },
    handleResize() {
      this.setRowsByWidth();
    },
    setRowsByWidth() {
      const isDesktop =
        typeof window !== "undefined" && window.innerWidth > 768;
      // на десктопі — всі відкриті, на мобілі — закриті
      this.rows.forEach((row) => (row.active = isDesktop));
    },
  },
};
</script>
