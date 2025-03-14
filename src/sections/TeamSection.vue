<template>
  <h2 class="title ms-title">Наші менеджери</h2>
  <swiper
    :spaceBetween="20"
    :loop="true"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    }"
    :breakpoints="{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1280: { slidesPerView: 3 },
    }"
    class="mySwiper"
  >
    <swiper-slide
      v-for="(manager, index) in managers"
      :key="index"
      class="m-card"
    >
      <img :src="manager.image" alt="" class="m-img" />
      <div class="m-text-wrapper">
        <h3 class="m-title">{{ manager.name }}</h3>
        <p class="m-text">{{ manager.contact }}</p>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore from "swiper/core";
import { Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { managers } from "../js/data";

SwiperCore.use([Autoplay]);

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      managers,
    };
  },
};
</script>
<style scoped>
.ms-title {
  text-align: center;
  margin-top: 32px;
  font-size: 2rem;
}

.mySwiper {
  width: 406px;
  max-width: 90%;
  padding-right: 1rem;
  height: 100%;
  border-radius: 12px;
  padding-top: 1rem;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.m-card {
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  height: 100%;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin: 0 auto;
}

.m-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1);
}

.m-card:hover .m-text-wrapper {
  transform: translateY(-50%);
}

.m-img {
  width: 100%;
  height: 362px;
  object-fit: cover;
  border-bottom: 2px solid #e6f2e9;
}

.m-img {
  max-height: 100%;
  object-fit: cover;
}

.m-text-wrapper {
  padding: 16px;
  background-color: #f9fdfb;
  width: 100%;
  text-align: top;
  transition: transform var(--animation);
  flex: 1;
}

.m-title {
  font-size: 20px;
  color: #2b5d34;
  margin-bottom: 8px;
}

.m-text {
  font-size: 16px;
  color: #3e8e41;
}

@media (min-width: 768px) {
  .m-card {
    flex-direction: row;
  }

  .mySwiper {
    max-width: unset;
    width: calc(100% - 2.4rem);
  }

  .ms-title {
    margin-top: 50px;
  }

  .m-img {
    max-width: 200px;
  }

  .m-card:hover .m-text-wrapper {
    transform: unset;
  }
}

@media (min-width: 1280px) {
  .mySwiper {
    width: calc(1220px - 3rem);
  }

  .ms-title {
    margin-top: 72px;
  }
}
</style>
