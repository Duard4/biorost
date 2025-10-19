<template>
  <section class="section contact-us" id="contact-us">
    <div class="container">
      <div class="contact-info">
        <p class="contact-pre-text">Адреса та контактна інформація</p>
        <h1 class="contact-us-title title">Контакти</h1>
        <address class="contact-address">
          <ul class="contact-adress-list">
            <li class="address-point-item">
              <h3 class="adress-point">Юридична адреса</h3>
              <p class="adress-point-info">
                TM «BIOROST» ТОВ «Органіка України», 69083, Україна, м.
                Запоріжжя, вул. Луганська, 29а<br />
              </p>
            </li>
            <li class="address-point-item">
              <h3 class="adress-point">Адреса виробництва</h3>
              <p class="adress-point-info">
                69031, Україна, м. Запоріжжя, вул. Дослідна станція, 45
              </p>
            </li>
            <li class="address-point-item">
              <h3 class="adress-point">Телефон</h3>
              <p class="adress-point-info">
                Головний технолог та вiддiл продажу Денис Георгiйович
                <a href="tel:+380687579303" class="hover">+380687579303</a>
              </p>
            </li>
            <li class="address-point-item">
              <h3 class="adress-point">E-mail</h3>
              <a
                class="adress-point-info hover"
                href="mailto:a0687579303@gmail.com"
                >a0687579303@gmail.com</a
              >
            </li>
            <li class="address-point-item">
              <h3 class="adress-point">Instagram</h3>
              <a
                class="adress-point-info hover"
                href="https://www.instagram.com/biorost_zp/"
                target="_blank"
                rel="noopener noreferrer"
                >biorost_zp</a
              >
            </li>
          </ul>
        </address>
      </div>
      <div class="form-wrapper" id="form">
        <h3>Зв'яжіться з нами</h3>
        <form @submit.prevent="sendEmail" class="form" novalidate>
          <label for="name"
            >Ваше ім'я:
            <input
              id="name"
              type="text"
              v-model="form.name"
              :class="{ 'input-error': errors.name }"
              placeholder="ПІБ"
              maxlength="100"
              autocomplete="name"
              required
            />
            <span v-if="errors.name" class="error">{{ errors.name }}</span>
          </label>
          <label for="farm"
            >Господарство:
            <input
              id="farm"
              type="text"
              v-model="form.farm"
              placeholder="Товариство"
              maxlength="100"
              autocomplete="organization"
            />
          </label>
          <label for="phone"
            >Номер телефону:
            <input
              id="phone"
              type="tel"
              v-model="form.phone"
              :class="{ 'input-error': errors.phone }"
              placeholder="+380"
              maxlength="13"
              autocomplete="tel"
              required
              @input="formatPhoneNumber"
            />
            <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
          </label>
          <label for="email"
            >Електронна адреса:
            <input
              id="email"
              type="email"
              v-model="form.email"
              :class="{ 'input-error': errors.email }"
              placeholder="Email"
              maxlength="100"
              autocomplete="email"
              required
            />
            <span v-if="errors.email" class="error">{{ errors.email }}</span>
          </label>
          <div class="dropdown-wrapper">
            <label for="subject">
              Питання за яким звертаєтесь:
              <select
                class="custom-select"
                id="subject"
                v-model="form.subject"
                @change="updateSubcategories"
              >
                <option value="" disabled>Оберіть тему</option>
                <option
                  v-for="(subcategories, category) in categories"
                  :key="category"
                  :value="category"
                >
                  {{ category }}
                </option>
              </select>
            </label>

            <label v-if="form.subject" for="subcategory">
              <select
                class="custom-select"
                id="subcategory"
                v-model="form.subcategory"
              >
                <option value="" disabled>Оберіть підкатегорію</option>
                <option
                  v-for="subcategory in subcategories"
                  :key="subcategory"
                  :value="subcategory"
                >
                  {{ subcategory }}
                </option>
              </select>
            </label>
          </div>
          <label for="message" class="textarea"
            >Розкрийте ваш запит:
            <textarea
              id="message"
              v-model="form.message"
              :class="{ 'input-error': errors.message }"
              placeholder="Розкрийте ваш запит"
              required
            ></textarea>
            <span v-if="errors.message" class="error">{{
              errors.message
            }}</span>
          </label>
          <button class="submit-btn" type="submit" :disabled="isSubmitting">
            <span v-if="isSubmitting">Надсилання...</span>
            <span v-else>Надіслати</span>
          </button>
        </form>
      </div>
    </div>
    <div v-if="toast.show" class="toast" :class="toast.type">
      <div class="toast-content">
        <span class="toast-message">{{ toast.message }}</span>
        <button class="toast-close" @click="closeToast">×</button>
      </div>
    </div>
  </section>
  <TeamSection />
  <section class="section location">
    <div class="container">
      <div class="google-map">
        <h2 class="title">Ми на карті</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2680.4912022686235!2d35.2232529!3d47.7913132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dc5e96e0c8ea41%3A0x5de18d14ab65449a!2z0JvRg9Cz0LDQvdGB0LrQsNGPINGD0LsuLCAyOSwg0JfQsNC_0L7RgNC-0LbRjNC1LCDQl9Cw0L_QvtGA0L7QttGB0LrQsNGPINC-0LHQu9Cw0YHRgtGMLCA2OTAwMA!5e0!3m2!1sru!2sua!4v1758735269486!5m2!1sru!2sua"
          height="450"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          class="map"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBus } from "../js/eventBus.js";
import emailjs from "emailjs-com";
import TeamSection from "./TeamSection.vue";

export default {
  name: "ContactSection",
  components: {
    TeamSection,
  },
  data() {
    return {
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
        "Питання щодо": ["Товару", "Оплати", "Використання", "Доставки"],
        "Відгук на вакансію": [
          "Спеціаліст з наукової роботи",
          "Менеджер з продажу органічних добрив (B2B-сектор)",
        ],
        "Звернення з": ["Скаргою", "Пропозицією", "Подякою"],
      },
      subcategories: [],
      errors: {},
      isSubmitting: false,
      toast: {
        show: false,
        message: "",
        type: "success",
        timer: null,
      },
    };
  },
  mounted() {
    // Слухаємо подію для оновлення форми
    eventBus.on("applyForJob", (jobTitle) => {
      this.form.subject = "Відгук на вакансію";
      this.subcategories = this.categories["Відгук на вакансію"];
      this.form.subcategory = jobTitle;
    });
  },
  methods: {
    formatPhoneNumber() {
      if (!this.form.phone.startsWith("+380")) {
        this.form.phone = "+380";
      }

      this.form.phone = this.form.phone.replace(/(?!^\+)\D/g, "");

      if (this.form.phone.length > 13) {
        this.form.phone = this.form.phone.slice(0, 13);
      }
    },
    sendEmail() {
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;

      // EmailJS конфігурація
      const serviceID = "service_u5ugyr7";
      const templateID = "template_bangnib";
      const userID = "6xpXf2EoTZal99FW_";

      const templateParams = {
        name: this.form.name,
        farm: this.form.farm ? this.form.farm : '"Не вказано"',
        phone: this.form.phone,
        email: this.form.email,
        subject: `${this.form.subject} - ${this.form.subcategory}`,
        message: this.form.message,
      };

      emailjs
        .send(serviceID, templateID, templateParams, userID)
        .then((response) => {
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
      if (this.toast.timer) {
        clearTimeout(this.toast.timer);
      }

      this.toast.show = true;
      this.toast.message = message;
      this.toast.type = type;

      this.toast.timer = setTimeout(() => {
        this.closeToast();
      }, 5000);
    },
    closeToast() {
      this.toast.show = false;
      if (this.toast.timer) {
        clearTimeout(this.toast.timer);
        this.toast.timer = null;
      }
    },
    resetForm() {
      this.form.name = "";
      this.form.farm = "";
      this.form.phone = "+380";
      this.form.email = "";
      this.form.subject = "";
      this.form.subcategory = "";
      this.form.message = "";
      this.errors = {};
    },
    updateSubcategories() {
      this.subcategories = this.categories[this.form.subject];
      this.form.subcategory = "";
    },
    validateForm() {
      this.errors = {};

      // Перевірка імені - підтримка різних мовних груп
      if (!this.form.name.trim()) {
        this.errors.name = "Ім'я є обов'язковим полем.";
      } else if (!/^[\p{L}\s'-]+$/u.test(this.form.name.trim())) {
        this.errors.name =
          "Ім'я має містити тільки літери, пробіли, апострофи та дефіси.";
      }

      // Перевірка email
      if (!this.form.email.trim()) {
        this.errors.email = "Email є обов'язковим полем.";
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
          this.form.email
        )
      ) {
        this.errors.email = "Будь ласка, введіть дійсну електронну адресу.";
      }

      // Покращена перевірка телефону
      if (!this.form.phone.trim()) {
        this.errors.phone = "Номер телефону є обов'язковим полем.";
      } else if (!/^\+380\d{9}$/.test(this.form.phone)) {
        this.errors.phone =
          "Номер телефону має бути у форматі +380XXXXXXXXX (12 символів).";
      }

      if (!this.form.subject) {
        this.showToast("Оберіть тему звернення", "error");
        return false;
      }

      if (!this.form.subcategory) {
        this.showToast("Оберіть підкатегорію звернення", "error");
        return false;
      }

      if (!this.form.message.trim()) {
        this.errors.message = "Повідомлення є обов'язковим полем.";
      }

      return Object.keys(this.errors).length === 0;
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  font-size: 0.875em;
  display: block;
  margin-top: 0.5em;
}

.input-error {
  border-color: red;
}

/* Стилі для тостів */
.toast {
  position: fixed;
  bottom: 20px;
  right: 20px;
  min-width: 250px;
  max-width: 350px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: slide-in-right 0.3s ease-out forwards;
}

.toast.success {
  background-color: #4caf50;
}

.toast.error {
  background-color: #f44336;
}

.toast-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  color: white;
}

.toast-message {
  flex-grow: 1;
  margin-right: 10px;
}
.map {
  width: 100%;
  border: none;
  border-radius: 12px;
  max-width: 1200px;
}
.toast-close {
  background: transparent;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  padding: 0 5px;
  line-height: 1;
}

.toast-close:hover {
  opacity: 0.8;
}

@keyframes slide-in-right {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
