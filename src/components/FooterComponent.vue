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
            <li class="footer-address-item">
              <strong>Юридична адреса:</strong>
              TM «BIOROST» ТОВ «Органіка України», 69083, Україна, м. Запоріжжя,
              вул. Луганська, 29а
            </li>

            <li class="footer-address-item">
              <strong>Адреса виробництва:</strong>
              69031, Україна, м. Запоріжжя, вул. Дослідна станція, 45
            </li>

            <li class="footer-address-item">
              <strong>Телефон:</strong>
              <a href="tel:+380687579303" class="hover">+380687579303</a>
            </li>
            <li class="footer-address-item">
              <strong>Email:</strong>
              <a class="hover" href="mailto:a0687579303@gmail.com">
                a0687579303@gmail.com</a
              >
            </li>
            <li class="footer-address-item">
              <strong>Instagram: </strong>
              <a
                class="hover"
                href="https://www.instagram.com/biorost_zp/"
                target="_blank"
                >biorost_zp</a
              >
            </li>
          </ul>
        </address>
      </div>
      <div class="footer-links">
        <h3>Корисні посилання</h3>
        <ul class="footer-link-list">
          <li class="footer-link-item hover">
            <a href="#about-us">Про нас</a>
          </li>
          <li class="footer-link-item hover">
            <a href="#products">Продукція</a>
          </li>
          <li class="footer-link-item hover">
            <a href="#inj-maps">Карти внесення</a>
          </li>
          <li class="footer-link-item hover"><a href="#articles">Статті</a></li>
          <li class="footer-link-item hover">
            <a href="#vacancies">Вакансії</a>
          </li>
          <li class="footer-link-item hover">
            <a href="#contact-us">Контакти</a>
          </li>
          <!-- <li class="footer-link-item"></li> -->
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
.footer-link-list,
.footer-address-list {
  margin-top: 0.8rem;
  display: grid;
  gap: 0.5rem;
}
</style>
