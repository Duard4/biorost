<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import SearchComponent from "./SearchComponent.vue";

const MAP_URL = "https://maps.app.goo.gl/B4SRqeFBW5ZKHrT6A";
const TEL = "+380687579303";
const EMAIL = "Biorost.zap@gmail.com";
const INSTAGRAM = "https://www.instagram.com/biorost_zp/";

const links = [
  { text: "Про нас", href: "#about-us" },
  { text: "Продукція", href: "#products" },
  { text: "Карти внесення", href: "#inj-maps" },
  { text: "Новини", href: "#news" },
  { text: "Вакансії", href: "#vacancies" },
  { text: "Контакти", href: "#contact-us" },
];

const open = ref(false);
const scrolled = ref(false);

const onScroll = () => (scrolled.value = window.scrollY > 8);
const onKey = (e) => e.key === "Escape" && (open.value = false);

watch(open, (v) => {
  document.body.style.overflow = v ? "hidden" : "";
});

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
  <!-- Thin utility strip: location + contact (keeps location present everywhere) -->
  <div class="topbar">
    <div class="container topbar__inner">
      <a class="topbar__item topbar__loc" :href="MAP_URL" target="_blank" rel="noopener">
        <svg width="16" height="16" aria-hidden="true"><use href="/assets/icons.svg#icon-location" /></svg>
        <span class="topbar__loc-full">вул. Луганська, 29а, Запоріжжя</span>
        <span class="topbar__loc-short">Запоріжжя</span>
      </a>
      <div class="topbar__contacts">
        <a class="topbar__item" :href="`tel:${TEL}`">
          <svg width="16" height="16" aria-hidden="true"><use href="/assets/icons.svg#icon-phone" /></svg>
          <span>+380 68 757 93 03</span>
        </a>
        <a class="topbar__item topbar__hide-sm" :href="`mailto:${EMAIL}`">
          <svg width="16" height="16" aria-hidden="true"><use href="/assets/icons.svg#icon-email" /></svg>
          <span>{{ EMAIL }}</span>
        </a>
        <a class="topbar__item topbar__icon" :href="INSTAGRAM" target="_blank" rel="noopener" aria-label="Instagram">
          <svg width="16" height="16" aria-hidden="true"><use href="/assets/icons.svg#icon-instagram" /></svg>
        </a>
      </div>
    </div>
  </div>

  <!-- Main sticky nav -->
  <nav class="navbar" :class="{ 'is-scrolled': scrolled }" aria-label="Головна навігація">
    <div class="container navbar__inner">
      <a class="navbar__logo" href="#" aria-label="Біорост — на початок">
        <img src="/assets/content-images/logo.webp" alt="Біорост" width="150" height="40" />
      </a>

      <ul class="navbar__links">
        <li v-for="link in links" :key="link.href">
          <a class="navbar__link" :href="link.href">{{ link.text }}</a>
        </li>
      </ul>

      <div class="navbar__actions">
        <SearchComponent class="navbar__search" />
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
  <div class="drawer-backdrop" :class="{ show: open }" @click="open = false"></div>
  <aside
    id="mobile-drawer"
    class="drawer"
    :class="{ open }"
    :aria-hidden="!open"
    aria-label="Меню"
  >
    <div class="drawer__head">
      <img class="drawer__logo" src="/assets/content-images/logo.webp" alt="Біорост" width="120" height="32" />
      <button type="button" class="drawer__close" aria-label="Закрити меню" @click="open = false">
        <svg width="22" height="22" aria-hidden="true"><use href="/assets/icons.svg#icon-close" /></svg>
      </button>
    </div>

    <SearchComponent class="drawer__search" />

    <nav class="drawer__nav" aria-label="Розділи сайту">
      <a
        v-for="(link, i) in links"
        :key="link.href"
        class="drawer__link"
        :style="{ '--i': i }"
        :href="link.href"
        @click="open = false"
      >
        <span>{{ link.text }}</span>
        <svg class="drawer__chevron" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>
    </nav>

    <div class="drawer__foot">
      <a class="drawer__cta" href="#form" @click="open = false">Замовити продукцію</a>
      <address class="drawer__contacts">
        <a :href="MAP_URL" target="_blank" rel="noopener">
          <svg width="18" height="18" aria-hidden="true"><use href="/assets/icons.svg#icon-location" /></svg>
          вул. Луганська, 29а, Запоріжжя
        </a>
        <a :href="`tel:${TEL}`">
          <svg width="18" height="18" aria-hidden="true"><use href="/assets/icons.svg#icon-phone" /></svg>
          +380 68 757 93 03
        </a>
        <a :href="`mailto:${EMAIL}`">
          <svg width="18" height="18" aria-hidden="true"><use href="/assets/icons.svg#icon-email" /></svg>
          {{ EMAIL }}
        </a>
      </address>
    </div>
  </aside>
</template>

<style scoped>
/* ── Utility strip ─────────────────────────────────────────── */
.topbar {
  background: var(--brand-strong);
  color: var(--on-brand);
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
  color: color-mix(in oklch, var(--on-brand) 90%, transparent);
  text-decoration: none;
  white-space: nowrap;
}
.topbar__item:hover { color: var(--accent); }
.topbar__item svg { fill: currentColor; flex: none; }
.topbar__contacts { display: flex; align-items: center; gap: var(--space-4); }
.topbar__loc-full { display: none; }
.topbar__hide-sm { display: none; }

/* ── Sticky nav ────────────────────────────────────────────── */
.navbar {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--surface);
  border-bottom: 1px solid var(--line);
  transition: box-shadow var(--dur) var(--ease-out-quart);
}
.navbar.is-scrolled { box-shadow: var(--shadow-1); }
.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: 64px;
}
.navbar__logo { display: inline-flex; flex: none; }
.navbar__logo img { height: 34px; width: auto; display: block; }

.navbar__links { display: none; }
.navbar__actions { display: flex; align-items: center; gap: var(--space-2); }
.navbar__search { display: none; }

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
  transition: transform var(--dur) var(--ease-out-quart),
    opacity var(--dur) var(--ease-out-quart);
}
.burger.is-open span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
.burger.is-open span:nth-child(2) { opacity: 0; }
.burger.is-open span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }
.burger:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; border-radius: var(--radius-sm); }

/* ── Drawer ────────────────────────────────────────────────── */
.drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: var(--z-backdrop);
  background: oklch(0.18 0.03 152 / 0.45);
  backdrop-filter: blur(3px);
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--dur) var(--ease-out-quart), visibility var(--dur);
}
.drawer-backdrop.show { opacity: 1; visibility: visible; }

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
  box-shadow: -24px 0 60px oklch(0.2 0.04 152 / 0.25);
  transform: translateX(105%);
  transition: transform var(--dur-slow) var(--ease-out-expo);
  overflow-y: auto;
}
.drawer.open { transform: translateX(0); }

.drawer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.drawer__logo { height: 30px; width: auto; display: block; }
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
.drawer__close:hover { background: var(--surface-sunk); }
.drawer__close svg { fill: currentColor; }
.drawer__close:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }

.drawer__nav { display: flex; flex-direction: column; gap: 2px; }
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
  /* staggered reveal once the drawer opens */
  opacity: 0;
  transform: translateX(16px);
  transition: opacity var(--dur) var(--ease-out-quart),
    transform var(--dur) var(--ease-out-quart),
    background var(--dur) var(--ease-out-quart),
    color var(--dur) var(--ease-out-quart);
}
.drawer.open .drawer__link {
  opacity: 1;
  transform: none;
  transition-delay: calc(var(--i) * 45ms + 120ms);
}
.drawer__link:hover {
  background: color-mix(in oklch, var(--brand) 9%, transparent);
  color: var(--brand);
}
.drawer__chevron {
  flex: none;
  color: var(--accent);
  transition: transform var(--dur) var(--ease-out-quart);
}
.drawer__link:hover .drawer__chevron { transform: translateX(4px); }

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
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 700;
  text-decoration: none;
  box-shadow: var(--shadow-1);
  transition: filter var(--dur) var(--ease-out-quart);
}
.drawer__cta:hover { filter: brightness(1.05); }
.drawer__cta:focus-visible { outline: 3px solid var(--brand); outline-offset: 2px; }

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
.drawer__contacts a:hover { color: var(--brand); }
.drawer__contacts svg { fill: var(--brand); flex: none; }

/* Search field styling (nav.css removed) */
:deep(.search-wrapper) { position: relative; width: 100%; }
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
:deep(.search-icon) { position: absolute; top: 50%; right: 14px; transform: translateY(-50%); fill: var(--muted); pointer-events: none; }
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
:deep(.search-results li:hover) { background: var(--surface-sunk); }

/* ── Desktop ───────────────────────────────────────────────── */
@media (min-width: 900px) {
  .topbar__loc-full { display: inline; }
  .topbar__loc-short { display: none; }
  .topbar__hide-sm { display: inline-flex; }

  .navbar__logo img { height: 40px; }
  .navbar__links {
    display: flex;
    align-items: center;
    gap: var(--space-6);
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .navbar__link {
    font-weight: 600;
    color: var(--brand-ink);
    text-decoration: none;
    padding: var(--space-2) 0;
    border-bottom: 2px solid transparent;
    transition: color var(--dur) var(--ease-out-quart),
      border-color var(--dur) var(--ease-out-quart);
  }
  .navbar__link:hover { color: var(--brand); border-bottom-color: var(--accent); }
  .navbar__search { display: block; width: 220px; }
  .burger { display: none; }
  .drawer, .drawer-backdrop { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .navbar, .burger span, .drawer, .drawer-backdrop, .navbar__link,
  .drawer__link, .drawer__chevron, .drawer__cta, .drawer__close { transition: none; }
  /* never gate link visibility on a transition that won't fire */
  .drawer__link { opacity: 1; transform: none; }
}
</style>
