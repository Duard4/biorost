<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-section">
                <div class="footer-logo">
                    <img src="../assets/content-images/logo.png" alt="Biorost Logo" />
                </div>
                <address class="footer-contact">
                    <h3>Контакти</h3>
                    <ul class="footer-address-list">
                        <li class="footer-address-item"><strong>Адреса:</strong> вул. Сталеварів 17, Запоріжжя</li>
                        <li class="footer-address-item"><strong>Телефон:</strong> +380687579303</li>
                        <li class="footer-address-item">
                            <strong>Email:</strong>
                            <a href="mailto:biorost.org.zp.ua@gmail.com"> biorost.org.zp.ua@gmail.com</a>
                        </li>
                    </ul>
                </address>
            </div>
            <div class="footer-links">
                <h3>Корисні посилання</h3>
                <ul class="footer-link-list">
                    <li class="footer-link-item"><a href="#about-us">Про нас</a></li>
                    <li class="footer-link-item"><a href="#products">Продукція</a></li>
                    <li class="footer-link-item"><a href="#inj-maps">Карти внесення</a></li>
                    <li class="footer-link-item"><a href="#articles">Статті</a></li>
                    <li class="footer-link-item"><a href="#contact-us">Контакти</a></li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Biorost. Всі права захищені.</p>
        </div>
    </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-link-list, .footer-address-list {
    margin-top: 0.8rem;
    display: grid;
    gap: 0.5rem;
}

</style>