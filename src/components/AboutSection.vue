<!-- src/components/HeaderComponent.vue -->
<template>
    <section class="section about container" id="about-us">
        <div class="text-wrapper">
            <h2 class="about-title title searchable">Трохи про нас</h2>
            <p class="abuot-text text searchable">Ми завод, що спеціалізується на виробництві та продажу органічних мікродобрив з високовуглецевим гуматом калію на основі курячого посліду - багатого  джерела  клітинного матеріалу. У наших препаратах, у збалансованому вигляді містяться всі необхідні мікроелементи в тих же формах, сполуках та пропорціях, як і в клітинах, що зростають.</p>
            <button type="button" class="certificates-btn btn" @click="openModal">Сертифікати</button>
        </div>
        <div class="bg-img-wrapper">
            <p class="about-age-label"><span class="large">9</span><br> років<br> досвіду</p>
            <img src="../../assets/bg-images/about.jpg" alt="sprouts" class="about-bg-img">
        </div>

        <!-- Modal Component -->
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
                '/src/assets/content-images/certificate-1.jpg',
                '/src/assets/content-images/certificate-2.jpg',
                '/src/assets/content-images/certificate-3.jpg',
                '/src/assets/content-images/certificate-4.jpg',
                '/src/assets/content-images/certificate-5.jpg'
                // Add more certificate images as needed
            ],
        };
    },
    methods: {
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
    },
};
</script>

<style scoped>
/* ваш CSS для header */
</style>