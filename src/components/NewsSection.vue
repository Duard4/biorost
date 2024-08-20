<template>
    <section class="articles section" id="articles">
        <h1 class="art-title title">Новини і досягнення</h1>
        <div class="container">
            <!-- Large image and text section -->
            <div class="featured-article" :style="{ backgroundImage: 'url(' + selectedArticle.image + ')' }">
                <div class="featured-text">
                    <h2 class="featured-title">{{ selectedArticle.title }}</h2>
                    <p class="featured-description">{{ selectedArticle.text }}</p>
                </div>

                <!-- Articles links over the image -->
                <ul class="articles-overlay">
                    <li v-for="article in articleList" :key="article.href" class="article-item-overlay">
                        <a href="#" @click.prevent="selectArticle(article)" class="nav-link-overlay">
                            <img :src="article.image" class="article-item-img-overlay" alt="Article Image">
                            <div class="article-text-wrapper-overlay">
                                <h3 class="article-item-text-overlay">{{ article.title }}</h3>
                                <p class="article-item-title-overlay">{{ article.text }}</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>


<script>
export default {
    name: 'NewsSection',
    data() {
        return {
            // List of articles
            articleList: [
                { href: './index#article1', image: '../../assets/images/article1.jpg', text: 'Новина 1', title: 'Заголовок 1' },
                { href: './index#article2', image: '../../assets/images/article2.jpg', text: 'Новина 2', title: 'Заголовок 2' },
                { href: './index#article3', image: '../../assets/images/article3.jpg', text: 'Новина 3', title: 'Заголовок 3' },
                // Add more articles as needed
            ],
            // Selected article
            selectedArticle: {
                image: '../../assets/images/article1.jpg', text: 'Новина 1', title: 'Заголовок 1'
            }
        };
    },
    methods: {
        selectArticle(article) {
            this.selectedArticle = article;
        }
    }
}
</script>

<style scoped>
.articles {
    text-align: center;
}
.container {
    position: relative;
}

.featured-article {
    margin-bottom: 2rem;
    text-align: center;
    height: 480px;
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1rem;
    color: white;
    position: relative;
}

.featured-text {
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background for text */
    padding: 1rem;
    border-radius: 8px;
    width: 100%;
    margin-bottom: 1rem;
}

.featured-title {
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
}

.featured-description {
    font-size: 1.2rem;
    color: #fff;
}

.articles-overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    position: absolute;
    top: 1rem;
    right: 0;
    padding: 0 1rem;
}

.article-item-overlay {
    width: 12rem;
}

.nav-link-overlay {
    display: flex;
    align-items: center;
    text-align: center;
    gap: 0.3rem;
    padding: 0.5rem;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.2); /* Semi-transparent */
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
}

.nav-link-overlay:hover {
    background-color: rgba(255, 255, 255, 0.5); /* More visible on hover */
    transform: scale(1.05);
}

.article-item-img-overlay {
    width: 100%;
    border-radius: 4px;
    object-fit: cover;
}

.article-item-text-overlay {
    font-size: 0.875rem;
    font-weight: bold;
    color: white;
}

.article-item-title-overlay {
    font-size: 0.75rem;
    color: white;
}
</style>
