<template>
    <section class="section contact-us" id="contact-us">
        <div class="container">
            <div class="contact-info">
                <p class="contact-pre-text">Адреса та контактна інформація</p>
                <h1 class="contact-us-title title">Контакти</h1>
                <address class="contact-address">
                    <ul class="contact-adress-list">
                        <li class="address-point-item">
                            <h3 class="adress-point">Наше місцезнаходження</h3>
                            <p class="adress-point-info">вул. Сталеварів 17</p>
                        </li>
                        <li class="address-point-item">
                            <h3 class="adress-point">Телефон</h3>
                            <p class="adress-point-info">
                                Головний технолог та вiддiл продажу Денис Георгiйович +380687579303
                            </p>
                        </li>
                        <li class="address-point-item">
                            <h3 class="adress-point">E-mail</h3>
                            <p class="adress-point-info">biorost.org.zp.ua@gmail.com</p>
                        </li>
                    </ul>
                </address>
            </div>
            <div class="form-wrapper">
                <h3>Зв'яжіться з нами</h3>
                <form @submit.prevent="sendEmail" class="form">
                    <label for="name">Ваше ім'я:
                        <input id="name" type="text" v-model="form.name" :class="{'input-error': errors.name}" placeholder="ПІБ" required />
                        <span v-if="errors.name" class="error">{{ errors.name }}</span>
                    </label>
                    <label for="farm">Господарство:
                        <input id="farm" type="text" v-model="form.farm" :class="{'input-error': errors.farm}" placeholder="Товариство"  />
                        <span v-if="errors.farm" class="error">{{ errors.farm }}</span>
                    </label>
                    <label for="phone">Номер телефону:
                        <input id="phone" type="tel" v-model="form.phone" :class="{'input-error': errors.phone}" placeholder="+380" value="+380" required />
                        <span v-if="errors.phone" class="error">{{ errors.phone }}</span>
                    </label>
                    <label for="email">Електронна адреса:
                        <input id="email" type="email" v-model="form.email" :class="{'input-error': errors.email}" placeholder="Email"  />
                        <span v-if="errors.email" class="error">{{ errors.email }}</span>
                    </label>
                    <div class="dropdown-wrapper">
                        <label for="subject">Питання за яким звертаєтесь:<br>
                            <select id="subject" v-model="form.subject" @change="updateSubcategories">
                                <option value="" disabled>Оберіть тему</option>
                                <option v-for="(subcategories, category) in categories" :key="category" :value="category">{{ category }}</option>
                            </select>
                        </label>

                        <label v-if="form.subject" for="subcategory">
                            <select id="subcategory" v-model="form.subcategory">
                                <option value="" disabled>Оберіть підкатегорію</option>
                                <option v-for="subcategory in subcategories" :key="subcategory" :value="subcategory">{{ subcategory }}</option>
                            </select>
                        </label>
                    </div>
                    <label for="message" class="textarea">Розкрийте ваш запит:
                        <textarea id="message" v-model="form.message" placeholder="Розкрийте ваш запит" required></textarea>
                    </label>
                    <button class="submit-btn" type="submit">Надіслати</button>
                </form>
            </div>
        </div>
    </section>
    <section class="section location">
        <div class="container">
            <div class="google-map">
                <h2 class="title">Ми на карті</h2>
                <iframe class="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2677.789536412718!2d35.118602781722814!3d47.84367050796446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40dc67327f8ac38b%3A0xe8cce331823af74a!2z0YPQuy4g0KHRgtCw0LvQtdCy0LDRgNC-0LIsIDE3LCDQl9Cw0L_QvtGA0L7QttGM0LUsINCX0LDQv9C-0YDQvtC20YHQutCw0Y8g0L7QsdC70LDRgdGC0YwsIDY5MDAw!5e0!3m2!1sru!2sua!4v1721818233308!5m2!1sru!2sua"
                    width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    </section>
</template>

<script>
import emailjs from 'emailjs-com';

export default {
    name: 'ContactSection',
    data() {
        return {
            form: {
                name: '',
                farm: '',
                phone: '+380',
                email: '',
                subject: '',
                subcategory: '',
                message: ''
            },
            categories: {
                Покупка: ['Мінеральне', 'Біологічне', 'Сезонне'],
                Питання: ['З приводу товара', 'Використання', 'Доставка'],
                Звернення: ['Скарга', 'Пропозиція', 'Подяка']
            },
            subcategories: [],
            errors: {}
        };
    },
    methods: {
        sendEmail() {
            if (this.validateForm()) {
                const serviceID = 'service_0s5tufy';
                const templateID = 'template_adyqat3';
                const userID = 'Vd66fwOsrwsqYN0AR';

                const templateParams = {
                    name: this.form.name,
                    farm: this.form.farm,
                    phone: this.form.phone,
                    email: this.form.email,
                    subject: `${this.form.subject} - ${this.form.subcategory}`,
                    message: this.form.message
                };

                emailjs.send(serviceID, templateID, templateParams, userID)
                    .then((response) => {
                        alert('Email sent successfully!');
                        this.resetForm();
                    }, (error) => {
                        alert('Failed to send email. Please try again later.');
                        console.error('EmailJS Error:', error);
                    });
            }
        },
        resetForm() {
            this.form.name = '';
            this.form.farm = '';
            this.form.phone = '+380';
            this.form.email = '';
            this.form.subject = '';
            this.form.subcategory = '';
            this.form.message = '';
            this.errors = {};
        },
        updateSubcategories() {
            this.subcategories = this.categories[this.form.subject];
            this.form.subcategory = ''; 
        },
        validateForm() {
            this.errors = {};

            const nameRegex = /^[А-ЯA-Z][а-яa-z]+$/;
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const phoneRegex = /^\+380\d{9}$/;

            if (!nameRegex.test(this.form.name)) {
                this.errors.name = 'Ім\'я має починатися з великої літери і містити тільки літери.';
            }

            if (!emailRegex.test(this.form.email) || this.form.email.endsWith('.ru')) {
                this.errors.email = 'Електронна адреса має бути дійсною і не містити домен .ru.';
            }

            if (!phoneRegex.test(this.form.phone)) {
                this.errors.phone = 'Номер телефону має складатись з 10 цифр і починатись з +380.';
            }

            return Object.keys(this.errors).length === 0;
        }
    }
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
</style>
