<template>
    <section class="section about container" id="about-us">
        <div class="text-wrapper">
            <h2 class="about-title title searchable">Про нас</h2>
            <p class="about-text text searchable">
                Компанія ТОВ «Органіка України» ТМ «Біорост» спеціалізується на виробництві органічних та
                органо-мінеральних добрив, а також мікробних препаратів для сільгоспвиробників та приватних господарств.
                <br /><br />
                Наш завод знаходиться в м. Запоріжжі. Компанія виробляє та реалізує свою продукцію, починаючи з 2013
                року. З кожним наступним роком ми постійно вдосконалюємо виробничий процес, активно працюючи над
                створенням нових продуктів, максимально задовольняючи потреби виробників сільськогосподарської
                продукції.
            </p>
            <button type="button" class="certificates-btn btn" @click="openModal">Сертифікати</button>
        </div>

        <div class="bg-img-wrapper">
            <p class="about-age-label"><span class="large">11</span><br /> років<br /> досвіду</p>
            <img src="../assets/bg-images/about.jpg" alt="sprouts" class="about-bg-img" />
        </div>

        <p>
            Продукція ТМ «Біорост» входить в перелік продуктів, дозволених для використання в органічному
            землеробстві згідно реєстрації «ОРГАНІК СТАНДАРТ», що відображається на сайті цієї організації.<br /><br />
            Використовуючи продукцію ТОВ «Органіка України», сільгосптоваровиробники досягають значних переваг,
            отримуючи значні ПОКРАЩЕННЯ:
        </p>

        <ul class="accordion">
            <li v-for="(row, index) in rows" :key="index" :class="{ active: row.active }" @click="toggleRow(index)">
                <h3 class="accordion-title">{{ row.category }}</h3>
                <div class="accordion-content" v-if="row.active" v-html="row.description"></div>
            </li>
        </ul>

        <CertificateModal :showModal="showModal" :images="images" @close="closeModal" />
    </section>
</template>

<script>
import CertificateModal from './CertificateModal.vue';

export default {
    name: 'AboutSection',
    components: {
        CertificateModal,
    },
    data() {
        return {
            showModal: false,
            images: [
                '../assets/content-images/certificate-1.jpg',
                '../assets/content-images/certificate-2.jpg',
            ],
            rows: [
                {
                    category: 'Для ґрунту',
                    description: `
              <strong>Гуміфікація (гумусоутворення)</strong><br>
              Складний повільний біохімічний процес перетворення органічних залишків за допомогою
              мікроорганізмів, що призводить до утворення гумусових речовин – специфічних сполук, які
              мають здатність до полімеризації, тобто ущільненню своїх молекул, що робить їх стійкими до
              розкладу мікроорганізмами.
              <br><br>
              <strong>Деструкція</strong><br>
              Процес мінералізації, тобто розкладання рослинних решток. Мікроорганізми мінералізують ці
              рештки і у процесі вивільнюють багато різних сполук, але самі головні з них – це
              макро/мікроелементи та вуглець.
              <br><br>
              <strong>Оздоровлення і відновлення ґрунту</strong><br>
              Основними причинами втрати родючості є: обробіток важкою технікою, нераціональне
              використання мінеральних добрив, практично повна відсутність органічних добрив. Завдяки
              корисним грибам і бактеріям, які знаходяться в наших препаратах, при внесенні їх у ґрунт
              відбувається його очищення від патогенної флори і фауни, активна його структуризація і
              розкислення.
            `,
                    active: false,
                },
                {
                    category: 'Для рослин',
                    description: `
              <strong>Інокуляція</strong><br>
              Внесення живих мікроорганізмів у ризосферу рослини. Це обробка посівного матеріалу за
              допомогою біопрепаратів, які провокують зерно розвивати більш потужну кореневу систему, а
              відповідно більш розвинену і міцну рослину.
              <br><br>
              <strong>Фізіологічні переваги</strong><br>
              <ul class="marked-list">
                <li>Збільшення і прискорення енергії проростання та схожості насіння.</li>
                <li>Гарний розвиток кореневої системи з більш активним нарощуванням вторинної кореневої
                  системи.</li>
                <li>При фоліарному внесенні наших продуктів поглинання поживних речовин відбувається
                  всією поверхнею надземної частини рослин з подальшим швидким переміщенням їх в
                  ділянки з найбільш інтенсивним проходженням біохімічних процесів.</li>
                <li>Забезпечення повного балансу необхідних речовин, що стимулює гарне плодоношення і
                  збільшення врожайності.</li>
              </ul>
            `,
                    active: false,
                },
                {
                    category: 'Для людини і корисної фауни',
                    description: `
              Всі добрива і препарати компанії «Органіка України» є екологічно чистими і безпечними для
              людини і корисної фауни. Наша місія – забезпечити відновлення ґрунту, що призводить до
              покращення його структури, накопичення вологи, збільшення складу поживних речовин, і як
              наслідок, підвищення виходу продукції.
            `,
                    active: false,
                },
            ],
        };
    },
    mounted() {
        if (window.innerWidth > 768) {
            this.rows.forEach(row => {
                row.active = true;
            });
        }
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
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
            if (window.innerWidth > 768) {
                this.rows.forEach(row => {
                    row.active = true;
                });
            } else {
                this.rows.forEach(row => {
                    row.active = false;
                });
            }
        },
    },
};
</script>

<style scoped>
.about {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
}
.text-wrapper {
    max-width: 572px;
}
.bg-img-wrapper {
    display: none;
    position: relative;
    margin: 0 auto;
}
.improvements {
    display: flex;
    flex-wrap: wrap;
}
.about-age-label {
    display: inline-block;
    text-align: center;
    min-width: 178px;
    padding: 24px;
    border-radius: 10px;
    background-color: rgba(85, 57, 4, 1);
    color: var(--white);
    font-size: 28px;
    transform: translate(50%, -25%);
}
.large {
    font-size: 80px;
}
.about-bg-img {
    max-height: 600px;
    border-top-left-radius: 100px;
}
.certificates-btn {
    margin-top: 24px;
    font-size: 18px;
    min-width: 200px;
}
@media (min-width: 768px) {

}
@media (min-width: 1280px) {
    .bg-img-wrapper {
        display: flex;
        align-items: baseline;
        margin: unset;
    }
}

/* ACCORDION */
.accordion {
    margin: 25px 0;
    width: 100%;
}

.accordion li {
    border-bottom: 1px solid #dddddd;
    cursor: pointer;
}

.accordion-title {
    background-color: var(--gradient-c1); /* More vibrant green */
    color: var(--white);
    padding: 12px 15px;
    font-size: 16px;
    font-family: Arial, sans-serif;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: background-color var(--animation);
}

.accordion-title:hover {
    background-color: var(--gradient-c2); /* Darker green on hover */
}

.accordion-content {
    padding: 12px 15px;
    background-color: var(--white); /* Light green background */
    display: none;
}

.active .accordion-content {
    display: block;
}

.marked-list {
    padding-left: 18px;
}

.marked-list li {
    position: relative;
    margin-bottom: 8px;
    padding-left: 20px;
    font-weight: bold;
    color: #388e3c; /* Vibrant green text */
}

.marked-list li::before {
    content: '✓'; /* Custom mark */
    position: absolute;
    left: 0;
    color: #000000; /* Darker green mark */
    font-size: 16px;
}

@media (max-width: 768px) {
    .accordion-title,
    .accordion-content {
        padding: 10px 12px;
    }
}

@media (max-width: 480px) {
    .accordion-title {
        font-size: 14px;
        padding: 8px 10px;
    }

    .accordion-content {
        padding: 8px 10px;
    }

    .marked-list {
        padding-left: 18px;
    }
}
</style>
