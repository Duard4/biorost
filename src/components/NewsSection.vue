<template>
    <section class="articles section" id="articles">
        <h1 class="art-title title">Новини і досягнення</h1>
        <div class="container">
            <img src="../../assets/bg-images/news.jpg" alt="" class="art-bg-img">
            <ul class="articles-list">
                <li v-for="article in articleList" :key="article.href" class="article-item">
                    <a :href="article.href" class="nav-link">
                        <img :src="article.image" class="article-item-img" alt="Article Image">
                        <div class="article-text-wrapper">
                            <h3 class="article-item-text points">{{ article.title }}</h3>
                            <p class="article-item-title">{{ article.text }}</p>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'NewsSection',
    data() {
        return {
            articleList: [
                {
                    href: './index#article1',
                    image: '../../assets/images/article1.jpg',
                    text: 'Новина 1',
                    title: 'Заголовок 1'
                },
                {
                    href: './index#article2',
                    image: '../../assets/images/article2.jpg',
                    text: 'Новина 2',
                    title: 'Заголовок 2'
                },
                {
                    href: './index#article3',
                    image: '../../assets/images/article3.jpg',
                    text: 'Новина 3',
                    title: 'Заголовок 3'
                },
                // Add more articles as needed
            ],
        };
    }
}
</script>

<style scoped>
/* ваш CSS для header */
.articles-list {
    width: 100%;
}
.nav-link {
    display: flex;
    align-items: center;
    gap: 1rem;
}
</style>
