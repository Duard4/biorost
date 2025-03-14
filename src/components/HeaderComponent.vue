<!-- src/components/HeaderComponent.vue -->
<template>
  <header class="header container">
    <address class="address">
      <a class="address-link" href="http://">
        <svg class="icon" width="24" height="24">
          <use href="../assets/icons.svg#icon-location"></use>
        </svg>
        вул. Сталеварів 17, Запоріжжя</a
      >
    </address>
    <a class="header-logo" href="../index.html">
      <img
        src="../assets/content-images/logo.png"
        alt="logo Biorost"
        width="240px"
      />
    </a>
    <address class="address">
      <a class="address-link" href="mailto:Biorost.zap@gmail.com"
        >Biorost.zap@gmail.com</a
      >
      <a class="address-link" href="tel:+380687579303">+380687579303</a>
    </address>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>
