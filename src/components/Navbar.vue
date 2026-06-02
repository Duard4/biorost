<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import SearchComponent from "./SearchComponent.vue";

const MAP_URL = "https://maps.app.goo.gl/B4SRqeFBW5ZKHrT6A";
const TEL = "+380687579303";
const EMAIL = "a0687579303@gmail.com";
const INSTAGRAM = "https://www.instagram.com/biorost_zp/";

const links = [
  { text: "Продукція", to: "/products" },
  { text: "Карти внесення", to: "/maps" },
  { text: "Про нас", to: "/about" },
  { text: "Новини", to: "/news" },
  { text: "Контакти", to: "/contacts" },
];

const open = ref(false);
const scrolled = ref(false);
const route = useRoute();

const onScroll = () => (scrolled.value = window.scrollY > 8);
const onKey = (e) => e.key === "Escape" && (open.value = false);

watch(open, (v) => {
  document.body.style.overflow = v ? "hidden" : "";
});
watch(
  () => route.fullPath,
  () => (open.value = false),
);

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKey);
});
onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});
</script>

<template>
  <!-- Thin utility strip: location + contact -->
  <div class="topbar">
    <div class="container topbar__inner">
      <a
        class="topbar__item topbar__loc"
        :href="MAP_URL"
        target="_blank"
        rel="noopener"
      >
        <svg width="16" height="16" aria-hidden="true">
          <use href="/assets/icons.svg#icon-location" />
        </svg>
        <span class="topbar__loc-full">вул. Луганська, 29а, Запоріжжя</span>
        <span class="topbar__loc-short">Запоріжжя</span>
      </a>
      <div class="topbar__contacts">
        <span class="topbar__item topbar__since">Виробництво з 2013 року</span>
        <a class="topbar__item" :href="`tel:${TEL}`">
          <svg width="16" height="16" aria-hidden="true">
            <use href="/assets/icons.svg#icon-phone" />
          </svg>
          <span>+380 68 757 93 03</span>
        </a>
        <a
          class="topbar__item topbar__icon"
          :href="INSTAGRAM"
          target="_blank"
          rel="noopener"
          aria-label="Instagram"
        >
          <svg width="16" height="16" aria-hidden="true">
            <use href="/assets/icons.svg#icon-instagram" />
          </svg>
        </a>
      </div>
    </div>
  </div>

  <!-- Main sticky nav -->
  <nav
    class="navbar"
    :class="{ 'is-scrolled': scrolled }"
    aria-label="Головна навігація"
  >
    <div class="container navbar__inner">
      <router-link
        class="navbar__logo"
        to="/"
        aria-label="Біорост – на головну"
      >
        <img
          src="/assets/content-images/logo.webp"
          alt="Біорост"
          width="150"
          height="40"
        />
      </router-link>

      <ul class="navbar__links">
        <li v-for="link in links" :key="link.to">
          <router-link class="navbar__link" :to="link.to">{{
            link.text
          }}</router-link>
        </li>
      </ul>

      <div class="navbar__actions">
        <SearchComponent class="navbar__search" />
        <router-link class="navbar__cta" to="/contacts#form"
          >Замовити</router-link
        >
        <button
          type="button"
          class="burger"
          :class="{ 'is-open': open }"
          :aria-expanded="open"
          aria-controls="mobile-drawer"
          aria-label="Меню"
          @click="open = !open"
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile drawer -->
  <div
    class="drawer-backdrop"
    :class="{ show: open }"
    @click="open = false"
  ></div>
  <aside
    id="mobile-drawer"
    class="drawer"
    :class="{ open }"
    :aria-hidden="!open"
    aria-label="Меню"
  >
    <div class="drawer__head">
      <img
        class="drawer__logo"
        src="/assets/content-images/logo.webp"
        alt="Біорост"
        width="120"
        height="32"
      />
      <button
        type="button"
        class="drawer__close"
        aria-label="Закрити меню"
        @click="open = false"
      >
        <svg width="22" height="22" aria-hidden="true">
          <use href="/assets/icons.svg#icon-close" />
        </svg>
      </button>
    </div>

    <SearchComponent class="drawer__search" @select="open = false" />

    <nav class="drawer__nav" aria-label="Розділи сайту">
      <router-link
        v-for="(link, i) in links"
        :key="link.to"
        class="drawer__link"
        :style="{ '--i': i }"
        :to="link.to"
      >
        <span>{{ link.text }}</span>
        <svg
          class="drawer__chevron"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M9 6l6 6-6 6"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </router-link>
    </nav>

    <div class="drawer__foot">
      <router-link class="drawer__cta" to="/contacts#form"
        >Замовити продукцію</router-link
      >
      <address class="drawer__contacts">
        <a :href="MAP_URL" target="_blank" rel="noopener">
          <svg width="18" height="18" aria-hidden="true">
            <use href="/assets/icons.svg#icon-location" />
          </svg>
          вул. Луганська, 29а, Запоріжжя
        </a>
        <a :href="`tel:${TEL}`">
          <svg width="18" height="18" aria-hidden="true">
            <use href="/assets/icons.svg#icon-phone" />
          </svg>
          +380 68 757 93 03
        </a>
        <a :href="`mailto:${EMAIL}`">
          <svg width="18" height="18" aria-hidden="true">
            <use href="/assets/icons.svg#icon-email" />
          </svg>
          {{ EMAIL }}
        </a>
      </address>
    </div>
  </aside>
</template>

<style scoped>
/* ── Utility strip ─────────────────────────────────────────── */
.topbar {
  background: var(--soil);
  color: var(--on-soil);
  font-size: var(--text-sm);
}
.topbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 40px;
  padding-block: var(--space-1);
}
.topbar__item {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: color-mix(in oklch, var(--on-soil) 88%, transparent);
  text-decoration: none;
  white-space: nowrap;
}
.topbar__item:hover {
  color: var(--spark);
}
.topbar__item svg {
  fill: currentColor;
  flex: none;
}
.topbar__contacts {
  display: flex;
  align-items: center;
  gap: var(--space-5);
}
.topbar__loc-full {
  display: none;
}
.topbar__since {
  display: none;
  color: var(--spark);
  font-weight: 600;
}

/* ── Sticky nav ────────────────────────────────────────────── */
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: color-mix(in oklch, var(--surface) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--line);
  transition: box-shadow var(--dur) var(--ease-out-quart);
}
.navbar.is-scrolled {
  box-shadow: var(--shadow-1);
}
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 66px;
}
.navbar__logo {
  display: inline-flex;
  flex: none;
}
.navbar__logo img {
  height: 36px;
  width: auto;
  display: block;
}

.navbar__links {
  display: none;
}
.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}
.navbar__search {
  display: none;
}
.navbar__cta {
  display: none;
}

/* ── Burger ────────────────────────────────────────────────── */
.burger {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
}
.burger span {
  height: 2.5px;
  width: 100%;
  border-radius: 2px;
  background: var(--brand-ink);
  transition:
    transform var(--dur) var(--ease-out-quart),
    opacity var(--dur) var(--ease-out-quart);
}
.burger.is-open span:nth-child(1) {
  transform: translateY(7.5px) rotate(45deg);
}
.burger.is-open span:nth-child(2) {
  opacity: 0;
}
.burger.is-open span:nth-child(3) {
  transform: translateY(-7.5px) rotate(-45deg);
}
.burger:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* ── Drawer ────────────────────────────────────────────────── */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-backdrop);
  background: oklch(0.22 0.04 45 / 0.5);
  backdrop-filter: blur(3px);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity var(--dur) var(--ease-out-quart),
    visibility var(--dur);
}
.drawer-backdrop.show {
  opacity: 1;
  visibility: visible;
}

.drawer {
  position: fixed;
  top: 0;
  right: 0;
  z-index: var(--z-modal);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  width: min(88vw, 380px);
  height: 100dvh;
  padding: var(--space-5);
  background: var(--surface);
  border-top-left-radius: var(--radius-lg);
  border-bottom-left-radius: var(--radius-lg);
  box-shadow: -24px 0 60px oklch(0.2 0.04 45 / 0.28);
  transform: translateX(105%);
  transition: transform var(--dur-slow) var(--ease-out-expo);
  overflow-y: auto;
}
.drawer.open {
  transform: translateX(0);
}

.drawer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.drawer__logo {
  height: 30px;
  width: auto;
  display: block;
}
.drawer__close {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--line);
  background: var(--surface);
  border-radius: var(--radius-full);
  color: var(--brand-ink);
  cursor: pointer;
  transition: background var(--dur) var(--ease-out-quart);
}
.drawer__close:hover {
  background: var(--surface-sunk);
}
.drawer__close svg {
  fill: currentColor;
}
.drawer__close:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

.drawer__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.drawer__link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 600;
  color: var(--brand-ink);
  text-decoration: none;
  opacity: 0;
  transform: translateX(16px);
  transition:
    opacity var(--dur) var(--ease-out-quart),
    transform var(--dur) var(--ease-out-quart),
    background var(--dur) var(--ease-out-quart),
    color var(--dur) var(--ease-out-quart);
}
.drawer.open .drawer__link {
  opacity: 1;
  transform: none;
  transition-delay: calc(var(--i) * 45ms + 120ms);
}
.drawer__link:hover,
.drawer__link.router-link-active {
  background: var(--brand-wash);
  color: var(--brand);
}
.drawer__chevron {
  flex: none;
  color: var(--accent);
  transition: transform var(--dur) var(--ease-out-quart);
}
.drawer__link:hover .drawer__chevron {
  transform: translateX(4px);
}

.drawer__foot {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}
.drawer__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  border-radius: var(--radius-full);
  background: var(--accent-strong);
  color: var(--on-accent);
  font-weight: 700;
  text-decoration: none;
  box-shadow: var(--shadow-1);
  transition: filter var(--dur) var(--ease-out-quart);
}
.drawer__cta:hover {
  filter: brightness(1.05);
}
.drawer__cta:focus-visible {
  outline: 3px solid var(--brand);
  outline-offset: 2px;
}

.drawer__contacts {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  background: var(--surface-sunk);
  font-style: normal;
}
.drawer__contacts a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  color: var(--ink);
  text-decoration: none;
  font-size: var(--text-sm);
}
.drawer__contacts a:hover {
  color: var(--brand);
}
.drawer__contacts svg {
  fill: var(--brand);
  flex: none;
}

/* Search field styling */
:deep(.search-wrapper) {
  position: relative;
  width: 100%;
}
:deep(.search-field) {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: var(--radius-full);
  padding: 10px 40px 10px 16px;
  font-family: var(--font-body);
  font-size: var(--text-sm);
  color: var(--ink);
  background: var(--surface-sunk);
}
:deep(.search-field:focus) {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 3px color-mix(in oklch, var(--brand) 22%, transparent);
}
:deep(.search-icon) {
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-50%);
  fill: var(--muted);
  pointer-events: none;
}
:deep(.search-results) {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: var(--z-dropdown);
  list-style: none;
  margin: 0;
  padding: var(--space-1);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-2);
  max-height: 60vh;
  overflow-y: auto;
}
:deep(.search-results li) {
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  cursor: pointer;
  color: var(--ink);
}
:deep(.search-results li:hover) {
  background: var(--surface-sunk);
}

/* ── Desktop ───────────────────────────────────────────────── */
/* 1080px (not 1000): below this the logo + 5 nav links + search + CTA are too
   cramped to sit on one line, which forced link labels to wrap. The 1000–1080
   band uses the mobile drawer instead. */
@media (min-width: 1080px) {
  .topbar__loc-full {
    display: inline;
  }
  .topbar__loc-short {
    display: none;
  }
  .topbar__since {
    display: inline-flex;
  }

  .navbar__logo img {
    height: 42px;
  }
  .navbar__links {
    display: flex;
    align-items: center;
    gap: var(--space-5);
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .navbar__link {
    position: relative;
    font-weight: 600;
    color: var(--brand-ink);
    text-decoration: none;
    padding: var(--space-2) 0;
    white-space: nowrap;
    transition: color var(--dur) var(--ease-out-quart);
  }
  .navbar__link::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--dur) var(--ease-out-quart);
  }
  .navbar__link:hover {
    color: var(--brand);
  }
  .navbar__link:hover::after,
  .navbar__link.router-link-active::after {
    transform: scaleX(1);
  }
  .navbar__link.router-link-active {
    color: var(--brand);
  }
  .navbar__search {
    display: block;
    width: 180px;
  }
  .navbar__cta {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: 0 var(--space-5);
    border-radius: var(--radius-full);
    background: var(--accent-strong);
    color: var(--on-accent);
    font-weight: 700;
    text-decoration: none;
    transition:
      background var(--dur) var(--ease-out-quart),
      transform var(--dur) var(--ease-out-quart);
  }
  .navbar__cta:hover {
    background: var(--accent);
    transform: translateY(-1px);
  }
  .burger {
    display: none;
  }
  .drawer,
  .drawer-backdrop {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .navbar,
  .burger span,
  .drawer,
  .drawer-backdrop,
  .navbar__link,
  .drawer__link,
  .drawer__chevron,
  .drawer__cta,
  .drawer__close {
    transition: none;
  }
  .drawer__link {
    opacity: 1;
    transform: none;
  }
}
</style>
