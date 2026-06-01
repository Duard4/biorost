<template>
  <section class="about section" id="about-us">
    <div class="container about__grid">
      <div class="about__intro">
        <h2 class="about__title title searchable">{{ about.title }}</h2>
        <p class="about__subtitle">{{ subtitleText }}</p>
        <p class="about__text text searchable">{{ about.text }}</p>
        <button type="button" class="btn certificates-btn" @click="openModal">
          Переглянути сертифікати
        </button>
      </div>

      <figure class="about__media">
        <img
          src="/assets/bg-images/about.webp"
          alt="Молоді паростки на родючому ґрунті — органічне землеробство ТМ Біорост"
          class="about__img"
          loading="lazy"
          decoding="async"
        />
        <p class="about__badge">
          <span class="about__badge-num">{{ years }}</span>
          <span class="about__badge-text">років<br />досвіду</span>
        </p>
      </figure>
    </div>

    <div class="container">
      <ul class="accordion">
        <li
          v-for="(row, index) in rows"
          :key="index"
          class="accordion__item"
          :class="{ open: row.active }"
        >
          <h3 class="accordion__heading">
            <button
              type="button"
              class="accordion__btn"
              :aria-expanded="row.active"
              :aria-controls="`acc-panel-${index}`"
              @click="toggleRow(index)"
            >
              <span>{{ row.category }}</span>
              <svg
                class="accordion__icon"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M6 9l6 6 6-6"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </h3>
          <div
            v-show="row.active"
            :id="`acc-panel-${index}`"
            class="accordion__panel"
            v-html="row.description"
          ></div>
        </li>
      </ul>
    </div>

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
        "/assets/content-images/certificate-1.webp",
        "/assets/content-images/certificate-2.webp",
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
    this.setRowsByWidth();
    window.addEventListener("resize", this.handleResize);
  },
  beforeUnmount() {
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
      this.rows[index].active = !this.rows[index].active;
    },
    handleResize() {
      this.setRowsByWidth();
    },
    setRowsByWidth() {
      const isDesktop =
        typeof window !== "undefined" && window.innerWidth > 768;
      // desktop: all panels open as a readable knowledge block; mobile: collapsed
      this.rows.forEach((row) => (row.active = isDesktop));
    },
  },
};
</script>

<style scoped>
.about {
  background: var(--bg);
}

.about__grid {
  display: grid;
  gap: var(--space-8);
  align-items: center;
}

.about__title {
  margin-bottom: var(--space-3);
}

.about__subtitle {
  font-size: var(--text-xl);
  line-height: 1.35;
  color: var(--brand);
  font-weight: 600;
  margin: 0 0 var(--space-4);
  text-wrap: balance;
}

.about__text {
  font-size: var(--text-base);
  line-height: 1.65;
  color: var(--ink);
  max-width: 60ch;
  margin: 0;
  text-wrap: pretty;
}

.certificates-btn {
  margin-top: var(--space-6);
  min-width: 220px;
}

/* Media + proof badge */
.about__media {
  position: relative;
  margin: 0;
  max-width: 520px;
  justify-self: center;
}

.about__img {
  display: block;
  width: 100%;
  height: 100%;
  max-height: 560px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  border-top-left-radius: clamp(48px, 12vw, 100px);
}

.about__badge {
  position: absolute;
  right: var(--space-4);
  bottom: calc(-1 * var(--space-6));
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--radius-md);
  background: var(--soil);
  color: var(--on-brand);
  box-shadow: var(--shadow-2);
  margin: 0;
}

.about__badge-num {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 2rem + 2vw, 3.4rem);
  font-weight: 800;
  line-height: 1;
}

.about__badge-text {
  font-size: var(--text-sm);
  font-weight: 600;
  line-height: 1.15;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Knowledge accordion */
.accordion {
  list-style: none;
  margin: var(--space-16) 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.accordion__item {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--dur) var(--ease-out-quart),
    box-shadow var(--dur) var(--ease-out-quart);
}
.accordion__item.open {
  border-color: color-mix(in oklch, var(--brand) 40%, var(--line));
  box-shadow: var(--shadow-1);
}

.accordion__heading {
  margin: 0;
}

.accordion__btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-5);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--brand-ink);
}
.accordion__btn:hover {
  color: var(--brand);
}
.accordion__btn:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: -3px;
}

.accordion__icon {
  flex: none;
  color: var(--brand);
  transition: transform var(--dur) var(--ease-out-quart);
}
.open .accordion__icon {
  transform: rotate(180deg);
}

.accordion__panel {
  padding: 0 var(--space-5) var(--space-5);
  font-size: var(--text-base);
  line-height: 1.65;
  color: var(--ink);
}

/* v-html content from about.json */
.accordion__panel :deep(strong) {
  display: inline-block;
  margin-top: var(--space-2);
  color: var(--brand-ink);
  font-weight: 700;
}
.accordion__panel :deep(.marked-list) {
  list-style: none;
  padding-left: 0;
  margin: var(--space-2) 0 0;
  display: grid;
  gap: var(--space-2);
}
.accordion__panel :deep(.marked-list li) {
  position: relative;
  padding-left: var(--space-6);
  font-weight: 500;
  color: var(--ink);
}
.accordion__panel :deep(.marked-list li)::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  font-weight: 800;
  color: var(--brand);
}

@media (min-width: 768px) {
  .about__grid {
    grid-template-columns: 1.1fr 0.9fr;
    gap: var(--space-12);
  }
  .about__media {
    justify-self: end;
  }
}

@media (prefers-reduced-motion: reduce) {
  .accordion__item,
  .accordion__icon {
    transition: none;
  }
}
</style>
