<template>
    <table class="inj-table">
        <thead>
            <tr>
                <th v-if="isWideScreen">Обробка</th>
                <th>Препарат</th>
                <th>Рекомендації щодо застосування</th>
                <th>Норма на 1 га/т</th>
            </tr>
        </thead>
        <tbody>
            <template v-for="(treatment, index) in treatments" :key="index">
                <tr v-if="isWideScreen">
                    <td :rowspan="treatment.products.length">{{ treatment.name }}</td>
                    <td>{{ treatment.products[0].name }}</td>
                    <td :rowspan="treatment.products.length">{{ treatment.recommendations }}</td>
                    <td>{{ treatment.products[0].rate }}</td>
                </tr>
                <template v-if="isWideScreen">
                    <tr v-for="(product, productIndex) in treatment.products.slice(1)" :key="productIndex">
                        <td>{{ product.name }}</td>
                        <td>{{ product.rate }}</td>
                    </tr>
                </template>
                <tr v-else @click="toggleTreatment(index)">
                    <td colspan="3" class="treatment-title">{{ treatment.name }}</td>
                </tr>
                <template v-if="!isWideScreen && treatment.expanded">
                    <tr>
                        <td>{{ treatment.products[0].name }}</td>
                        <td :rowspan="treatment.products.length">{{ treatment.recommendations }}</td>
                        <td>{{ treatment.products[0].rate }}</td>
                    </tr>
                    <tr v-for="(product, productIndex) in treatment.products.slice(1)" :key="productIndex">
                        <td>{{ product.name }}</td>
                        <td>{{ product.rate }}</td>
                    </tr>
                </template>
            </template>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        treatments: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            isWideScreen: window.innerWidth >= 768,
        };
    },
    mounted() {
        window.addEventListener('resize', this.checkScreenWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.checkScreenWidth);
    },
    methods: {
        checkScreenWidth() {
            this.isWideScreen = window.innerWidth >= 768;
        },
        toggleTreatment(index) {
            this.treatments[index].expanded = !this.treatments[index].expanded;
        },
    },
};
</script>
<style scoped>
.inj-table {
    --bg-color: #f0fff0;
    --header-bg-color: #c8e6c9;
    --header-text-color: #2e7d32;
    --row-bg-color: #e8f5e9;
    --alt-row-bg-color: #f1f8e9;
    --hover-bg-color: #c5e1a5;
    --text-color: #1b5e20;
    --border-color: #81c784;
    --treatment-bg-color: #c8e6c9;
    --treatment-hover-bg-color: #aed581;
    --treatment-text-color: #2e7d32;
    font-size: 16px
}

.inj-table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--bg-color);
    color: var(--text-color);
    font-family: Arial, sans-serif;
}

.inj-table thead th {
    background-color: var(--header-bg-color);
    color: var(--header-text-color);
    font-weight: bold;
    padding: 12px;
    border-bottom: 2px solid var(--border-color);
}

.inj-table tbody td {
    padding: 10px;
    border-bottom: 1px solid var(--border-color);
}

.inj-table tbody tr:nth-child(even) {
    background-color: var(--alt-row-bg-color);
}

.inj-table tbody tr:hover {
    background-color: var(--hover-bg-color);
}

.treatment-title {
    background-color: var(--row-bg-color);
    color: var(--treatment-text-color);
    padding: 10px;
    font-weight: bold;
    text-align: left;
}

.treatment-title:hover {
    background-color: var(--treatment-hover-bg-color);
    color: var(--text-color);
}

.inj-table tbody td[rowspan] {
    vertical-align: middle;
    text-align: center;
    background-color: var(--row-bg-color);
}

@media (max-width: 767px) {

    .inj-table thead th,
    .inj-table tbody td {
        text-align: left;
        padding: 8px;
    }

    .inj-table {
        font-size: 14px
    }
}
</style>
