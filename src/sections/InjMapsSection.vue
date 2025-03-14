<template>
  <section class="section container inj-maps" id="inj-maps">
    <h2 class="inj-maps-title title">
      Карти внесення добрив для ефективного вирощування культур
    </h2>
    <h3>
      Рекомендації з внесення добрив ТМ «Біорост» для пшениці, ріпаку та інших
      культур
    </h3>
    <div class="button-container">
      <button @click="setTable('wheat')">Озима пшениця</button>
      <button @click="setTable('canola')">Озимий ріпак</button>
    </div>
    <InjTableComponent :treatments="currentTreatments" />
  </section>
</template>

<script>
import InjTableComponent from "../components/InjTableComponent.vue";
export default {
  components: {
    InjTableComponent,
  },
  data() {
    return {
      currentTable: "wheat",
      treatmentsWheat: [
        {
          name: "Осіння обробка пожнивних залишків",
          recommendations: "Внесення обприскувачем",
          products: [
            { name: "Біорост «БАКТЕРОС»", rate: "10 л" },
            { name: "Біорост «ТРИХОДЕРМІН»", rate: "5 л" },
            {
              name: "Біорост «МЕТАРИЗИН» або Біорост «КВАРТОЦИД»",
              rate: "5 л",
            },
          ],
          expanded: false,
        },
        {
          name: "Обробка посівного матеріалу із розрахунку на 1 тонну (у випадку, якщо не застосовуються хімічні протруйники)",
          recommendations: "Обробка в інкрустаторі (у протруювальній машині)",
          products: [
            { name: "Біорост «СТАРТ»", rate: "3 л" },
            { name: "Біорост «ТРИХОДЕРМІН»", rate: "1 л" },
            { name: "Біорост «АУКСИН»", rate: "1 л" },
            { name: "Біорост «СИМБІОЗ-БАР-ФОЛІАР»", rate: "1 л" },
            { name: "Біорост «КВАРТОЦИД»", rate: "1 л" },
          ],
          expanded: false,
        },
        {
          name: "Обробка посівного матеріалу із розрахунку на 1 тонну (у випадку застосування хімічних протруйників)",
          recommendations: "Обробка в інкрустаторі (у протруювальній машині)",
          products: [
            { name: "Біорост «СТАРТ»", rate: "5 л" },
            { name: "Біорост «АУКСИН»", rate: "1 л" },
          ],
          expanded: false,
        },
        {
          name: "Осінній посів (у комплексі з мінеральними добривами)*",
          recommendations: "Внесення сівалкою при сівбі",
          products: [
            { name: "Мікродобриво гранульоване «БІОРОСТ»", rate: "100 кг" },
            { name: "Біорост «АУКСИН»", rate: "1 л" },
          ],
          expanded: false,
        },
        {
          name: "Осіння листова обробка сходів (кріопротекція)",
          recommendations:
            "Обробка обприскувачем по сходах за 10 днів до морозів",
          products: [
            { name: "Біорост «ІМУНІТЕТ»", rate: "4 л" },
            { name: "Біорост «ЗИМА»", rate: "3 л" },
          ],
          expanded: false,
        },
        {
          name: "Весняна листова обробка у фазу кущення",
          recommendations: "Обробка обприскувачем по листу",
          products: [{ name: "Біорост «СИМБІОЗ-БАР-ФОЛІАР»", rate: "8 л" }],
          expanded: false,
        },
        {
          name: "Листова обробка у фазу виходу в трубку",
          recommendations: "Обробка обприскувачем по листу",
          products: [
            { name: "Біорост «СИМБІОЗ-БАР-ФОЛІАР»", rate: "5 л" },
            { name: "Біорост «ТРИХОДЕРМІН»", rate: "2 л" },
            { name: "Біорост «МАГНІЙ+»", rate: "2 л" },
          ],
          expanded: false,
        },
        {
          name: "Листова обробка у фазу цвітіння-колосіння",
          recommendations: "Обробка обприскувачем по листу",
          products: [
            { name: "Біорост «СИМБІОЗ-БАР-ФОЛІАР»", rate: "2 л" },
            { name: "Біорост «УЛЬТРА-БОР-АЗОТ»", rate: "2 л" },
            { name: "Біорост «СІРКА+»", rate: "2 л" },
            { name: "Біорост «СТАРТ»", rate: "2 л" },
            { name: "Біорост «СУМІШ ДЛЯ НАЛИВУ»", rate: "2 л" },
          ],
          expanded: false,
        },
      ],
      treatmentsCanola: [
        {
          name: "Літньо-осіння обробка пожнивних залишків",
          recommendations:
            "Внесення обприскувачем з подальшим загортанням під культивацію, оранку",
          products: [
            { name: "Біорост «БАКТЕРОС»", rate: "10 л" },
            { name: "Біорост «ТРИХОДЕРМІН»", rate: "5 л" },
            {
              name: "Біорост «МЕТАРИЗИН» або Біорост «КВАРТОЦИД»",
              rate: "5 л",
            },
          ],
          expanded: false,
        },
        {
          name: "Мікродобриво гранульоване «БІОРОСТ»",
          recommendations:
            "Внесення розкидачем з подальшим загортанням під культивацію, оранку",
          products: [
            { name: "Мікродобриво гранульоване «БІОРОСТ»", rate: "200 кг" },
          ],
          expanded: false,
        },
        {
          name: "Обробка посівного матеріалу із розрахунку на 1 тонну",
          recommendations: "Обробка в інкрустаторі (у протруювальній машині)",
          products: [
            { name: "Біорост «СТАРТ»", rate: "4 л" },
            { name: "Біорост «ТРИХОДЕРМІН»", rate: "2 л" },
            { name: "Біорост «АУКСИН»", rate: "1 л" },
            { name: "Біорост «БАКТЕРОС»", rate: "1 л" },
          ],
          expanded: false,
        },
        {
          name: "Обробка посівного матеріалу із розрахунку на 1 тонну (варіант 2)",
          recommendations: "Обробка в інкрустаторі (у протруювальній машині)",
          products: [
            { name: "Біорост «СТАРТ»", rate: "2 л" },
            { name: "Біорост «СИМБІОЗ-БАР-ФОЛІАР»", rate: "4 л" },
            { name: "Біорост «КВАРТОЦИД»", rate: "1 л" },
          ],
          expanded: false,
        },
        {
          name: "Обробка посівного матеріалу із розрахунку на 1 тонну (варіант 3)",
          recommendations:
            "Засипати в мішок і ретельно перемішати (із розрахунку на 1 п.о.)",
          products: [{ name: "Біорост «ІНОКУЛЯНТ»", rate: "0,15 кг" }],
          expanded: false,
        },
        {
          name: "Осінній посів (у комплексі з мінеральними добривами)",
          recommendations: "Внесення сівалкою при сівбі",
          products: [
            { name: "Мікродобриво гранульоване «БІОРОСТ»", rate: "100 кг" },
          ],
          expanded: false,
        },
        {
          name: "Осіння листова обробка у фазу 2-4 справжніх листів (якщо немає загущеності посівів)",
          recommendations: "Внесення обприскувачем по листу",
          products: [
            { name: "Біорост «УНІВЕРСАЛ»", rate: "2 л" },
            { name: "Біорост «СІРКА+»", rate: "3 л" },
            { name: "Біорост «БОР+»", rate: "1 л" },
            { name: "Біорост «ГАУПСИН»", rate: "3 л" },
          ],
          expanded: false,
        },
        {
          name: "Осіння листова обробка у фазу 5-6 справжніх листків",
          recommendations: "Обробка обприскувачем по листу",
          products: [
            { name: "Біорост «СИМБІОЗ-БАР-ФОЛІАР»", rate: "2 л" },
            { name: "Біорост «ЗИМА» = Біорост «СТАРТ»", rate: "2 л" },
            { name: "Біорост «ТРИХОДЕРМІН»", rate: "2 л" },
            { name: "Біорост «БІТОКСИБАЦИЛІН»", rate: "2 л" },
          ],
          expanded: false,
        },
        {
          name: "Весняне підживлення у фазі розетки-стеблування (у комплексі з азотними добривами)",
          recommendations: "Внесення обприскувачем",
          products: [
            {
              name: "Біорост «ІМУНІТЕТ» або Біорост «УНІВЕРСАЛ»",
              rate: "10 л",
            },
            { name: "Біорост «ГАУПСИН»", rate: "2 л" },
          ],
          expanded: false,
        },
        {
          name: "Весняна листова обробка у фази стеблування-бутонізації",
          recommendations: "Внесення обприскувачем по листу",
          products: [
            { name: "Біорост «СИМБІОЗ-БАР-ФОЛІАР»", rate: "3 л" },
            { name: "Біорост «ТРИХОДЕРМІН»", rate: "1 л" },
            { name: "Біорост «БІТОКСИБАЦИЛІН»", rate: "1 л" },
            { name: "Біорост «СТАРТ»", rate: "2 л" },
            { name: "Біорост «УЛЬТРА-БОР-АЗОТ»", rate: "1 л" },
            { name: "Біорост «АУКСИН»", rate: "1 л" },
            { name: "Біорост «СІРКА+»", rate: "2 л" },
            { name: "Біорост «МАГНІЙ+»", rate: "1 л" },
          ],
          expanded: false,
        },
        {
          name: "Листова обробка у фазу цвітіння",
          recommendations: "Внесення обприскувачем по листу",
          products: [
            { name: "Біорост «СИМБІОЗ-БАР-ФОЛІАР»", rate: "4 л" },
            { name: "Біорост «ТРИХОДЕРМІН»", rate: "1 л" },
            { name: "Біорост «БІТОКСИБАЦИЛІН»", rate: "1 л" },
            { name: "Біорост «УНІВЕРСАЛ»", rate: "1 л" },
            { name: "Біорост «УЛЬТРА-БОР-АЗОТ»", rate: "0,5 л" },
          ],
          expanded: false,
        },
        {
          name: "Листова обробка у фазу утворення стручків",
          recommendations: "Обробка обприскувачем по листу",
          products: [
            { name: "Біорост «СУМІШ ДЛЯ НАЛИВУ»", rate: "3 л" },
            { name: "Біорост «СТАРТ»", rate: "3 л" },
            { name: "Біорост «СИМБІОЗ-БАР-ФОЛІАР»", rate: "2 л" },
            { name: "Біорост «ГАУПСИН»", rate: "2 л" },
          ],
          expanded: false,
        },
      ],
    };
  },
  computed: {
    currentTreatments() {
      return this.currentTable === "wheat"
        ? this.treatmentsWheat
        : this.treatmentsCanola;
    },
  },
  methods: {
    setTable(table) {
      this.currentTable = table;
    },
  },
};
</script>
<style scoped>
.button-container {
  margin-bottom: 20px;
  display: flex;
}

button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #81c784;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #66bb6a;
}
</style>
