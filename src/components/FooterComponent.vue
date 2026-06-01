<script setup>
const TEL = "+380687579303";
const EMAIL = "a0687579303@gmail.com";
const MAP_URL = "https://maps.app.goo.gl/B4SRqeFBW5ZKHrT6A";
const INSTAGRAM = "https://www.instagram.com/biorost_zp/";
const year = new Date().getFullYear();

const nav = [
  { text: "Продукція", to: "/products" },
  { text: "Карти внесення", to: "/maps" },
  { text: "Про нас", to: "/about" },
  { text: "Новини", to: "/news" },
  { text: "Контакти", to: "/contacts" },
];
</script>

<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__brand">
        <img
          class="footer__logo"
          src="/assets/content-images/logo.webp"
          alt="Біорост"
          width="160"
          height="42"
        />
        <p class="footer__tagline">
          Органічні добрива та біопрепарати для відновлення родючості ґрунту.
          Власне виробництво в Запоріжжі з 2013 року.
        </p>
        <a class="footer__ig" :href="INSTAGRAM" target="_blank" rel="noopener">
          <svg width="20" height="20" aria-hidden="true">
            <use href="/assets/icons.svg#icon-instagram" />
          </svg>
          biorost_zp
        </a>
      </div>

      <nav class="footer__nav" aria-label="Розділи сайту">
        <h3 class="footer__h">Розділи</h3>
        <ul>
          <li v-for="link in nav" :key="link.to">
            <router-link :to="link.to">{{ link.text }}</router-link>
          </li>
        </ul>
      </nav>

      <address class="footer__contacts">
        <h3 class="footer__h">Контакти</h3>
        <ul>
          <li>
            <span class="footer__label">Юридична адреса</span>
            ТОВ «Органіка України», 69083, Запоріжжя, вул. Луганська, 29а
          </li>
          <li>
            <span class="footer__label">Виробництво</span>
            69031, Запоріжжя, вул. Дослідна станція, 45
          </li>
          <li>
            <span class="footer__label">Телефон</span>
            <a class="hover" :href="`tel:${TEL}`">+380 68 757 93 03</a>
          </li>
          <li>
            <span class="footer__label">E-mail</span>
            <a class="hover" :href="`mailto:${EMAIL}`">{{ EMAIL }}</a>
          </li>
          <li>
            <a class="hover" :href="MAP_URL" target="_blank" rel="noopener"
              >Ми на карті →</a
            >
          </li>
        </ul>
      </address>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p>© {{ year }} ТМ «Біорост». Усі права захищені.</p>
        <p>Виробник органічних добрив, Україна</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--soil);
  color: var(--on-soil);
}
.footer__grid {
  display: grid;
  gap: var(--space-8);
  padding-block: clamp(3rem, 2rem + 4vw, 5rem);
}
.footer__logo {
  height: 42px;
  width: auto;
  display: block;
  margin-bottom: var(--space-4);
}
.footer__tagline {
  max-width: 42ch;
  color: color-mix(in oklch, var(--on-soil) 78%, transparent);
  line-height: 1.6;
  margin: 0 0 var(--space-5);
}
.footer__ig {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--spark);
  text-decoration: none;
  font-weight: 600;
}
.footer__ig svg {
  fill: currentColor;
}
.footer__ig:hover {
  color: var(--on-soil);
}

.footer__h {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 600;
  color: var(--on-soil);
  margin: 0 0 var(--space-4);
}
.footer__nav ul,
.footer__contacts ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-3);
}
.footer__nav a,
.footer__contacts a {
  color: color-mix(in oklch, var(--on-soil) 82%, transparent);
  text-decoration: none;
}
.footer__nav a:hover {
  color: var(--spark);
}
.hover:hover {
  color: var(--spark);
}
.footer__contacts {
  font-style: normal;
}
.footer__contacts li {
  color: color-mix(in oklch, var(--on-soil) 72%, transparent);
  line-height: 1.5;
}
.footer__label {
  display: block;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: color-mix(in oklch, var(--on-soil) 55%, transparent);
  margin-bottom: 2px;
}

.footer__bottom {
  border-top: 1px solid color-mix(in oklch, var(--on-soil) 16%, transparent);
}
.footer__bottom-inner {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: var(--space-2);
  padding-block: var(--space-5);
  font-size: var(--text-sm);
  color: color-mix(in oklch, var(--on-soil) 60%, transparent);
}
.footer__bottom-inner p {
  margin: 0;
}

@media (min-width: 720px) {
  .footer__grid {
    grid-template-columns: 1.6fr 1fr 1.4fr;
  }
}
</style>
