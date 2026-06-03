<template>
  <div class="page contact">
    <div class="container">
      <header class="contact__head">
        <p class="contact__kicker">Зв'язок · консультація агронома</p>
        <h1 class="contact__title">Контакти</h1>
        <p class="contact__lead">
          Напишіть або зателефонуйте – підберемо програму живлення під вашу
          культуру, ґрунт і бюджет.
        </p>
      </header>

      <div class="contact__grid">
        <!-- Info -->
        <address class="info">
          <div class="info__item">
            <span class="info__label">Юридична адреса</span>
            <p>
              ТОВ «Органіка України», 69083, м. Запоріжжя, вул. Луганська, 29а
            </p>
          </div>
          <div class="info__item">
            <span class="info__label">Виробництво</span>
            <p>69031, м. Запоріжжя, вул. Дослідна станція, 45</p>
          </div>
          <div class="info__item">
            <span class="info__label">E-mail</span>
            <a class="info__link hover" :href="`mailto:${EMAIL}`">{{
              EMAIL
            }}</a>
          </div>
          <div class="info__item">
            <span class="info__label">Instagram</span>
            <a
              class="info__link hover"
              href="https://www.instagram.com/biorost_zp/"
              target="_blank"
              rel="noopener"
              >biorost_zp</a
            >
          </div>
        </address>

        <!-- Form -->
        <div class="form-card" id="form">
          <h2 class="form-card__title">Зв'яжіться з нами</h2>
          <form class="form" novalidate @submit.prevent="sendEmail">
            <label class="field" for="name">
              <span class="field__label">Ваше ім'я <em>*</em></span>
              <input
                id="name"
                type="text"
                v-model="form.name"
                :class="{ 'is-invalid': errors.name }"
                placeholder="ПІБ"
                maxlength="100"
                autocomplete="name"
              />
              <span v-if="errors.name" class="field__error">{{
                errors.name
              }}</span>
            </label>

            <label class="field" for="farm">
              <span class="field__label">Господарство</span>
              <input
                id="farm"
                type="text"
                v-model="form.farm"
                placeholder="Товариство"
                maxlength="100"
                autocomplete="organization"
              />
            </label>

            <label class="field" for="phone">
              <span class="field__label">Номер телефону <em>*</em></span>
              <input
                id="phone"
                type="tel"
                v-model="form.phone"
                :class="{ 'is-invalid': errors.phone }"
                placeholder="+380"
                maxlength="13"
                autocomplete="tel"
                @input="formatPhoneNumber"
              />
              <span v-if="errors.phone" class="field__error">{{
                errors.phone
              }}</span>
            </label>

            <label class="field" for="email">
              <span class="field__label">Електронна адреса <em>*</em></span>
              <input
                id="email"
                type="email"
                v-model="form.email"
                :class="{ 'is-invalid': errors.email }"
                placeholder="Email"
                maxlength="100"
                autocomplete="email"
              />
              <span v-if="errors.email" class="field__error">{{
                errors.email
              }}</span>
            </label>

            <label class="field" for="subject">
              <span class="field__label">Тема звернення</span>
              <select
                id="subject"
                v-model="form.subject"
                @change="updateSubcategories"
              >
                <option value="" disabled>Оберіть тему</option>
                <option
                  v-for="(sub, category) in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </label>

            <label v-if="form.subject" class="field" for="subcategory">
              <span class="field__label">Підкатегорія</span>
              <select id="subcategory" v-model="form.subcategory">
                <option value="" disabled>Оберіть підкатегорію</option>
                <option v-for="sub in subcategories" :key="sub" :value="sub">
                  {{ sub }}
                </option>
              </select>
            </label>

            <label class="field field--full" for="message">
              <span class="field__label">Ваш запит <em>*</em></span>
              <textarea
                id="message"
                v-model="form.message"
                :class="{ 'is-invalid': errors.message }"
                placeholder="Розкрийте ваш запит"
                rows="5"
              ></textarea>
              <span v-if="errors.message" class="field__error">{{
                errors.message
              }}</span>
            </label>

            <button
              class="btn btn--primary form__submit"
              type="submit"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? "Надсилання..." : "Надіслати заявку" }}
            </button>
          </form>
        </div>
      </div>

      <!-- Direct phones -->
      <section class="phones" aria-labelledby="phones-title">
        <div class="phones__head">
          <h2 id="phones-title" class="phones__title">
            Зателефонувати напряму
          </h2>
          <p class="phones__lead">
            Керівник і менеджери-агрономи підкажуть із вибором препаратів,
            нормами внесення та доставкою по всій Україні.
          </p>
        </div>
        <ul class="phones__list">
          <li
            v-for="person in team"
            :key="person.role + person.name"
            class="phones__row"
          >
            <div class="phones__who">
              <span class="phones__role">{{ person.role }}</span>
              <span v-if="person.name" class="phones__name">{{
                person.name
              }}</span>
            </div>
            <div class="phones__nums">
              <a
                v-for="phone in person.phones"
                :key="phone"
                class="phones__num hover"
                :href="`tel:${phone.replace(/\s/g, '')}`"
                >{{ phone }}</a
              >
            </div>
          </li>
        </ul>
      </section>

      <div class="map-wrap">
        <h2 class="title map-wrap__title">Ми на карті</h2>
        <iframe
          class="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2680.4912022686235!2d35.2232529!3d47.7913132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dc5e96e0c8ea41%3A0x5de18d14ab65449a!2z0JvRg9Cz0LDQvdGB0LrQsNGPINGD0LsuLCAyOSwg0JfQsNC_0L7RgNC-0LbRjNC1LCDQl9Cw0L_QvtGA0L7QttGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA2OTAwMA!5e0!3m2!1sru!2sua!4v1758735269486!5m2!1sru!2sua"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>

    <transition name="toast">
      <div v-if="toast.show" class="toast" :class="toast.type">
        <span>{{ toast.message }}</span>
        <button class="toast__close" @click="closeToast" aria-label="Закрити">
          ×
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { resolvePrefill } from "../js/contactPrefill.js";
import emailjs from "@emailjs/browser";
import { usePageSeo } from "../js/seo";

export default {
  name: "ContactPage",
  setup() {
    usePageSeo({
      title:
        "Контакти ТМ «Біорост» – замовити органічні добрива та консультацію",
      description:
        "Контакти ТМ «Біорост»: телефон, e-mail, адреса виробництва в Запоріжжі. Замовте органічні добрива та біопрепарати або консультацію агронома.",
      path: "/contacts",
    });
    return { TEL: "+380687579303", EMAIL: "a0687579303@gmail.com" };
  },
  data() {
    return {
      team: [
        {
          role: "Керівник",
          name: "Пархоменко Дмитро",
          phones: ["+380 67 610 05 89"],
        },
        {
          role: "Головний технолог",
          name: "Круглік Денис",
          phones: ["+380 68 757 93 03"],
        },
        {
          role: "Менеджер",
          name: "Роман",
          phones: ["+380 97 737 05 96", "+380 50 520 89 84"],
        },
        {
          role: "Менеджер",
          name: "Таісія",
          phones: ["+380 63 972 20 45"],
        },
        {
          role: "Менеджер",
          name: "Валерій",
          phones: ["+380 98 837 68 49"],
        },
        {
          role: "Менеджер",
          name: "Оксана",
          phones: ["+380 66 472 29 55"],
        },
      ],
      form: {
        name: "",
        farm: "",
        phone: "+380",
        email: "",
        subject: "",
        subcategory: "",
        message: "",
      },
      categories: {
        Покупка: [
          "Комплекс (декілька типів)",
          "Органомінеральні",
          "Інокулянти",
          "Біофунгіциди",
          "Біоінсектициди",
          "Фітогормони",
          "Бактерії ґрунтові",
        ],
        Питання: [
          "Про товар",
          "Про оплату",
          "Про використання",
          "Про доставку",
          "Інше",
        ],
        Вакансії: [
          "Спеціаліст з наукової роботи",
          "Менеджер з продажу органічних добрив (B2B)",
        ],
        Відгук: ["Скарга", "Пропозиція", "Подяка"],
      },
      subcategories: [],
      errors: {},
      isSubmitting: false,
      toast: { show: false, message: "", type: "success", timer: null },
    };
  },
  mounted() {
    this.applyPrefill();
  },
  watch: {
    "$route.query": {
      handler() {
        this.applyPrefill();
      },
    },
  },
  methods: {
    applyPrefill() {
      const prefill = resolvePrefill(this.$route.query, this.categories);
      if (!prefill) return;
      if (prefill.subject) {
        this.form.subject = prefill.subject;
        this.subcategories = this.categories[prefill.subject];
        this.form.subcategory = prefill.subcategory || "";
      }
      if (prefill.message) this.form.message = prefill.message;
    },
    formatPhoneNumber() {
      if (!this.form.phone.startsWith("+380")) this.form.phone = "+380";
      this.form.phone = this.form.phone.replace(/(?!^\+)\D/g, "");
      if (this.form.phone.length > 13)
        this.form.phone = this.form.phone.slice(0, 13);
    },
    sendEmail() {
      if (!this.validateForm()) return;
      this.isSubmitting = true;
      const serviceID = "service_u5ugyr7";
      const templateID = "template_bangnib";
      const userID = "6xpXf2EoTZal99FW_";
      const templateParams = {
        name: this.form.name,
        farm: this.form.farm ? this.form.farm : "Не вказано",
        phone: this.form.phone,
        email: this.form.email,
        subject: this.form.subject,
        subcategory: this.form.subcategory,
        message: this.form.message,
      };
      emailjs
        .send(serviceID, templateID, templateParams, { publicKey: userID })
        .then(() => {
          this.showToast("Повідомлення успішно надіслано!", "success");
          this.resetForm();
        })
        .catch((error) => {
          console.error("EmailJS Error:", error);
          this.showToast("Помилка при відправці. Спробуйте пізніше.", "error");
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    showToast(message, type = "success") {
      if (this.toast.timer) clearTimeout(this.toast.timer);
      this.toast.show = true;
      this.toast.message = message;
      this.toast.type = type;
      this.toast.timer = setTimeout(() => this.closeToast(), 5000);
    },
    closeToast() {
      this.toast.show = false;
      if (this.toast.timer) {
        clearTimeout(this.toast.timer);
        this.toast.timer = null;
      }
    },
    resetForm() {
      this.form = {
        name: "",
        farm: "",
        phone: "+380",
        email: "",
        subject: "",
        subcategory: "",
        message: "",
      };
      this.errors = {};
    },
    updateSubcategories() {
      this.subcategories = this.categories[this.form.subject];
      this.form.subcategory = "";
    },
    validateForm() {
      this.errors = {};
      if (!this.form.name.trim())
        this.errors.name = "Ім'я є обов'язковим полем.";
      else if (!/^[\p{L}\s'-]+$/u.test(this.form.name.trim()))
        this.errors.name =
          "Ім'я має містити тільки літери, пробіли, апострофи та дефіси.";
      if (!this.form.email.trim())
        this.errors.email = "Email є обов'язковим полем.";
      else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          this.form.email,
        )
      )
        this.errors.email = "Будь ласка, введіть дійсну електронну адресу.";
      if (!this.form.phone.trim())
        this.errors.phone = "Номер телефону є обов'язковим полем.";
      else if (!/^\+380\d{9}$/.test(this.form.phone))
        this.errors.phone = "Номер у форматі +380XXXXXXXXX (13 символів).";
      if (!this.form.subject) {
        this.showToast("Оберіть тему звернення", "error");
        return false;
      }
      if (!this.form.subcategory) {
        this.showToast("Оберіть підкатегорію звернення", "error");
        return false;
      }
      if (!this.form.message.trim())
        this.errors.message = "Повідомлення є обов'язковим полем.";
      return Object.keys(this.errors).length === 0;
    },
  },
};
</script>

<style scoped>
.contact {
  background: var(--bg);
  padding-block: clamp(2.5rem, 1.5rem + 5vw, 5rem);
  min-height: 100vh;
}
.contact__head {
  max-width: 60ch;
  margin-bottom: var(--space-10);
}
.contact__kicker {
  font-weight: 600;
  font-size: var(--text-sm);
  color: var(--brand);
  margin: 0 0 var(--space-3);
}
.contact__title {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--text-3xl);
  line-height: 1.04;
  letter-spacing: -0.02em;
  color: var(--brand-ink);
  margin: 0 0 var(--space-4);
  text-wrap: balance;
}
.contact__lead {
  font-size: var(--text-lg);
  line-height: 1.55;
  color: var(--muted);
  margin: 0 0 var(--space-6) 0;
  text-wrap: pretty;
}

/* Direct phones */
.phones {
  margin-top: var(--space-12);
  padding: clamp(1.5rem, 1rem + 2.5vw, 2.75rem);
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-1);
}
.phones__head {
  max-width: 56ch;
  margin-bottom: var(--space-8);
}
.phones__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-xl);
  color: var(--brand-ink);
  margin: 0 0 var(--space-2);
  letter-spacing: -0.02em;
}
.phones__lead {
  margin: 0;
  color: var(--muted);
  line-height: 1.5;
}
.phones__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--line);
}
@media (min-width: 768px) {
  .phones__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: var(--space-10);
  }
  .phones__nums {
    flex-direction: row;
    flex-wrap: wrap;
  }
}
.phones__row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
  padding-block: var(--space-5);
  border-bottom: 1px solid var(--line);
}
.phones__who {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.phones__role {
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--brand);
  font-weight: 600;
}
.phones__name {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: var(--text-lg);
  color: var(--ink);
  letter-spacing: -0.01em;
}
.phones__nums {
  display: flex;
  flex-direction: column;
  gap: var(--space-1) var(--space-5);
}
.phones__num {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: var(--text-lg);
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: var(--accent);
  text-decoration: none;
  white-space: nowrap;
  transition: color var(--dur) var(--ease-out-quart);
}
.phones__num:hover,
.phones__num:focus-visible {
  color: var(--accent-strong);
}

@media (prefers-reduced-motion: reduce) {
  .phones__num {
    transition: none;
  }
}

.contact__grid {
  display: grid;
  gap: var(--space-8);
  align-items: start;
}

/* Info */
.info {
  font-style: normal;
  display: grid;
  gap: var(--space-4);
}
.info__item p {
  margin: 0;
  color: var(--ink);
  line-height: 1.5;
}
.info__label {
  display: block;
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--muted);
  margin-bottom: var(--space-1);
}
.info__link {
  color: var(--brand);
  font-weight: 600;
  text-decoration: none;
}

/* Form */
.form-card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
  box-shadow: var(--shadow-1);
}
.form-card__title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--text-xl);
  color: var(--brand-ink);
  margin: 0 0 var(--space-6);
}
.form {
  display: grid;
  gap: var(--space-5);
  grid-template-columns: 1fr 1fr;
}
.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.field--full,
.form__submit {
  grid-column: 1 / -1;
}
.field__label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--ink);
}
.field__label em {
  color: var(--brand);
  font-style: normal;
}
.field input,
.field select,
.field textarea {
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--ink);
  background: var(--bg);
  border: 1px solid var(--line-strong);
  border-radius: var(--radius-sm);
  padding: 0.7rem 0.85rem;
  min-height: 44px;
  width: 100%;
  transition:
    border-color var(--dur) var(--ease-out-quart),
    box-shadow var(--dur) var(--ease-out-quart);
}
.field textarea {
  resize: vertical;
  min-height: 120px;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: var(--brand);
  box-shadow: 0 0 0 3px var(--brand-wash);
}
.field input::placeholder,
.field textarea::placeholder {
  color: var(--muted);
}
.field .is-invalid {
  border-color: oklch(0.55 0.2 25);
}
.field__error {
  font-size: var(--text-sm);
  color: oklch(0.5 0.2 25);
}
.form__submit {
  justify-self: start;
}
.form__submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Map */
.map-wrap {
  margin-top: var(--space-16);
}
.map-wrap__title {
  margin-bottom: var(--space-6);
}
.map {
  width: 100%;
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  display: block;
}

/* Toast */
.toast {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  z-index: var(--z-toast, 1000);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 260px;
  max-width: 360px;
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-md);
  color: var(--on-accent);
  box-shadow: var(--shadow-3);
}
.toast.success {
  background: var(--accent-strong);
}
.toast.error {
  background: oklch(0.5 0.2 25);
  color: #fff;
}
.toast__close {
  background: none;
  border: none;
  color: inherit;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}
.toast-enter-active,
.toast-leave-active {
  transition:
    transform 0.3s var(--ease-out-quart),
    opacity 0.3s var(--ease-out-quart);
}
.toast-enter-from,
.toast-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

@media (min-width: 860px) {
  .contact__grid {
    grid-template-columns: 0.8fr 1.2fr;
  }
}
@media (max-width: 560px) {
  .form {
    grid-template-columns: 1fr;
  }
}
@media (prefers-reduced-motion: reduce) {
  .field input,
  .field select,
  .field textarea {
    transition: none;
  }
  .toast-enter-active,
  .toast-leave-active {
    transition: opacity 0.2s;
  }
  .toast-enter-from,
  .toast-leave-to {
    transform: none;
  }
}
</style>
