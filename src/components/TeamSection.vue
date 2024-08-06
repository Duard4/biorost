<template>
    <section class="team container">
        <h2 class="team-title">Наші менеджера</h2>
        <ul class="m-list">
            <li class="m-item">
                <img src="" alt="" class="m-img">
                <div class="m-text-wrapper">
                    <h3 class="m-title"></h3>
                    <p class="m-text"></p>
                </div>
            </li>
            <li class="m-item m1">
                <div class="m-text-wrapper">
                    <h3 class="m-title">Станіслав</h3>
                    <p class="m-text">+38 067 617 1488 +38 095 900 1876 biorost.zap@gmail.com</p>
                </div>

            </li>
            <li class="m-item m2">
                <div class="m-text-wrapper">
                    <h3 class="m-title">Оксана Сиваш</h3>
                    <p class="team-item-text">oksana@biorost.ua
                        +38 (066)-47-22-955
                        +38(068)-30-55-704</p>
                </div>
            </li>
            <li class="m-item">
                <img src="" alt="" class="m-img">
                <h3 class="m-title"></h3>
                <p class="m-text"></p>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'TeamSection',
    mounted() {
        const slider = document.querySelector('.m-list');
        let intervalId;

        function startSlider() {
            intervalId = setInterval(() => {
                const firstItem = slider.querySelector('.m-item:first-child');
                slider.appendChild(firstItem);
            }, 3000); // Change slides every 3 seconds
        }

        function stopSlider() {
            clearInterval(intervalId);
        }

        slider.addEventListener('mouseenter', stopSlider);
        slider.addEventListener('mouseleave', startSlider);

        startSlider();
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.team {
    --white: rgba(251, 251, 251, 1);
    margin: 75px auto 0;
    --grey: #040306;
    --black: #1b414b;

    font-family: "Inter", sans-serif;
    display: flex;
    flex-direction: column;
}

ul {
    list-style: none;
}

img {
    display: block;
}

.team-title {
    color: var(--white);
    max-width: 320px;
    font-size: 28px;
    line-height: 28px;
    font-weight: 500;
    letter-spacing: -0.02em;
    text-align: center;
    margin: 0 auto;
}

.m-list {
    overflow-x: hidden;
    display: flex;
    gap: 32px;
    height: 400px;
    margin: 40px auto;
}

.m-item {
    width: calc((100% - 24px) / 2);
    border-radius: 24px;
    padding: 16px;
    background-color: var(--white);
    flex-shrink: 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-clip: content-box;
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    text-shadow: 2px 2px 4px var(--black);

}

.m1 {
    background-image: url(../assets/content-images/m1.jpg);
    background-position: bottom left 25%;
}

.m2 {
    background-image: url(../assets/content-images/m2.jpg);
    background-position: top 5% center;
}

.m-text-wrapper {
    padding: 32px 16px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: self-start;
    flex-wrap: wrap;
}

.m-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    letter-spacing: -0.045em;
    margin-bottom: 12px;
    color: var(--white);
}

.m-title {
    display: inline;
}

.hid-text {
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 160px;
    white-space: nowrap;
}

.m-text:before {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: solid 1px rgba(4, 3, 6, 0.1);
    position: absolute;
    left: 0;
    top: -1rem;
}

@media (min-width: 768px) {
    .m-list {
        margin: 40px auto 50px;
        width: 704px;
    }

    .team-title {
        width: 645px;
    }

    .m-title {
        font-size: 16px;
    }

    .m-item {
        width: calc((100% - 24px) / 2);
    }
}

@media (min-width: 1280px) {
    .m-list {
        width: 1180px;
        gap: 24px;
    }

    .m-item {
        width: calc((100% - 24px) / 3);
    }

    .hid-text {
        max-width: 180px;
    }
}
</style>
