<!-- src/components/HeaderComponent.vue -->
<template>
    <header class="header container">
        <address class="address">
            <a class="address-link" href="http://">
                <svg class="icon " width="24" height="24">
                    <use href="../img/icons.svg#icon-location"></use>
                </svg>
                вул. Сталеварів 17, Запоріжжя</a>
        </address>
        <a href="../index.html">
            <img class="header-logo" src="../assets/content-images/logo.png" alt="logo Biorost" width="240px">
        </a>
        <address class="address">
            <a class="address-link" href="mailto:biorost.org.zp.ua@gmail.com">biorost.org.zp.ua@gmail.com</a>
            <a class="address-link" href="tel:+380687579303">+380687579303</a>
        </address>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent'
}
</script>

<style scoped>
/* ваш CSS для header */
.header {
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-logo {
    max-width: 168px;
    padding: 18px 0;
}

.address,
.address-link {
    display: flex;
    align-items: center;
}

.address {
    flex-direction: column;
}
</style>