<template>
  <section class="vacancies-section section container" id="vacancies">
    <h2 class="vacancies-title title">
      Вакансії — робота в сфері органічного землеробства
    </h2>
    <h3 class="vacancies-title">
      Долучайтеся до нашої команди в Запоріжжі! Вакансії для аграріїв,
      менеджерів, фахівців з продажу.
    </h3>
    <div class="vacancies-container container">
      <!-- Accordion for job titles -->
      <div class="accordion">
        <div v-for="(job, index) in jobs" :key="index" class="accordion-item">
          <button @click="toggleJob(index)" class="accordion-title">
            {{ job.title }}
          </button>
          <div v-if="activeIndex === index" class="accordion-content">
            <p>{{ job.description }}</p>
            <button @click="applyForJob(job.title)" class="apply-button">
              Подати заявку
            </button>
          </div>
        </div>
      </div>

      <!-- Skills section -->
      <div class="skills-frame">
        <div v-if="activeIndex !== null" class="skills-list">
          <h3>Наші очікування</h3>
          <ul>
            <li v-for="(skill, index) in jobs[activeIndex].skills" :key="index">
              {{ skill }}
            </li>
          </ul>
        </div>
        <div v-else class="encouragement">
          <p>Розвивайте свої навички та подавайтеся на вакансії!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBus } from "../js/eventBus";

export default {
  data() {
    return {
      activeIndex: null,
      jobs: [
        {
          title: "Спеціаліст з наукової роботи",
          description:
            "Наш кандидат повинен буде знаходити необхідні контакти, лабораторії для відправки на аналіз зразків продукції заводу, аналізувати результати. Вміти працювати з пошуковими сайтами в інтернеті, аналізувати і виокремлювати потрібну для роботи інформацію, займатися процесами сертифікації виробництва і продукції, розроблювати рекомендації по правильному і дієвому застосуванню нашої продукції у сільськогосподарському виробництві.",
          skills: [
            "Повна зайнятість (готові взяти студента)",
            "Досвід роботи від 2 років",
            "Вища освіта в галузі хімії, біології, агрономії або захисту рослин",
            "Старанність та дисциплінованість",
            "Допитливість та бажання до розвитку",
            "Творчий підхід до вирішення задач",
          ],
        },
        {
          title: "Менеджер з продажу органічних добрив (B2B-сектор)",
          description:
            "Менеджер з продажу відповідає за просування продукції заводу у закріпленому за ним регіоні, веде супровід клієнтів, дає консультації по застосуванню препаратів і все відображає у системі CRM. Можливі відрядження. Буде добре, якщо у вас є вже напрацьована база клієнтів.",
          skills: [
            "Вища або середня агрономічна освіта (бажано)",
            "Розуміння основ сільскогогосподарської галузі",
            "Досвід у В2В продажах — 1 рік",
            "Вміння або бажання освоїти навики роботи з CRM-системами",
            "Зацікавленість у стратегічному розвитку компанії",
            "Дисциплінованість, порядність, відповідальність",
          ],
        },
      ],
    };
  },
  methods: {
    toggleJob(index) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    applyForJob(jobTitle) {
      // Emit an event with the job title to scroll and set the form data
      eventBus.emit("applyForJob", jobTitle);
      // Scroll to the form section
      const formSection = document.getElementById("form");
      formSection.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.vacancies-section {
  display: flex;
  flex-direction: column;
}

.vacancies-title {
  text-align: center;
  margin-bottom: 3rem;
}
.vacancies-container {
  display: flex;
  width: 100%;
  column-gap: 20px;
}

.accordion {
  flex: 2;
}

.accordion-item {
  margin-bottom: 10px;
}

.accordion-title {
  background-color: #00a65a;
  color: white;
  padding: 10px;
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
}

.accordion-title:hover {
  background-color: #007d43;
}

.accordion-content {
  padding: 10px;
  border-left: 4px solid #00a65a;
  background: #f1f1f1;
}

.apply-button {
  background-color: #007d43;
  color: white;
  padding: 10px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 4px;
}

.apply-button:hover {
  background-color: #005c32;
}

.skills-frame {
  flex: 1;
  padding: 20px;
  border: 2px solid #00a65a;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.skills-list {
  margin-top: 0;
}

.skills-list h3 {
  color: #00a65a;
  margin-bottom: 10px;
}

.skills-list ul {
  list-style-type: none;
  padding-left: 0;
}

.skills-list li {
  padding: 5px 0;
  border-bottom: 1px solid #ddd;
}

.skills-list li:last-child {
  border-bottom: none;
}

.encouragement {
  text-align: center;
  color: #00a65a;
  font-weight: bold;
}

@media (max-width: 768px) {
  .vacancies-container {
    flex-direction: column;
  }

  .skills-frame {
    margin-top: 20px;
  }
}
</style>
