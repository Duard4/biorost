<template>
  <section class="managers-section">
    <div class="section-container">
      <h2 class="section-title">Наші менеджери</h2>
      <div class="managers-grid">
        <div
          v-for="(manager, index) in managers"
          :key="index"
          class="manager-card"
        >
          <div class="card-image-wrapper">
            <img :src="manager.image" :alt="manager.name" class="card-image" />
          </div>

          <div class="card-content">
            <h3 class="manager-name">{{ manager.name }}</h3>

            <p class="manager-role">{{ manager.description }}</p>

            <div class="contact-info">
              <div class="contact-item">
                <span class="contact-icon-mail">✉</span>
                <a :href="`mailto:${manager.contact.split(' ')[0]}`">
                  {{ manager.contact.split(" ")[0] }}
                </a>
              </div>
              <div class="contact-phones">
                <span class="contact-icon-phone">📞</span>
                <div class="phones">
                  <a
                    v-for="(phone, i) in getPhones(manager.contact)"
                    :key="i"
                    :href="`tel:${phone}`"
                    class="phone-link"
                  >
                    {{ phone }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { managers } from "../js/data";

export default {
  setup() {
    const getPhones = (contact) => {
      const parts = contact.split(" ");
      return parts.filter((p) => p.startsWith("+"));
    };

    return {
      managers,
      getPhones,
    };
  },
};
</script>

<style scoped>
.managers-section {
  width: 100%;
  padding: 60px 20px;
}

.section-container {
  max-width: 1220px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a4620;
  margin-bottom: 60px;
  letter-spacing: -0.5px;
}

.managers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
}

.manager-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(26, 70, 32, 0.08);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  display: flex;
  flex-direction: column;
  max-width: 380px;
  margin: 0 auto;
  border: 1px solid rgba(106, 184, 118, 0.1);
}

.manager-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(26, 70, 32, 0.15);
  border-color: rgba(106, 184, 118, 0.3);
}

.card-image-wrapper {
  width: 100%;
  height: 320px;
  overflow: hidden;
  background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
  position: relative;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.manager-card:hover .card-image {
  transform: scale(1.05);
}

.card-content {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.manager-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a4620;
  margin: 0;
  line-height: 1.3;
}

.manager-role {
  font-size: 0.95rem;
  color: #4a7c4e;
  margin: 0;
  line-height: 1.6;
  font-weight: 500;
}

.contact-info {
  display: flex;
  flex-direction: column;
  margin-top: auto;
  padding-top: 10px;
  gap: 12px;
  border-top: 2px solid rgba(106, 184, 118, 0.15);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.1rem;
}

.contact-phones {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.phones {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.contact-icon-mail {
  margin-top: -5px;
  font-size: 1.9rem;
  color: #6ab876;
  flex-shrink: 0;
}
.contact-icon-phone {
  font-size: 1.2rem;
  margin-top: 12px;
  color: #6ab876;
  flex-shrink: 0;
}

.contact-item a,
.phone-link {
  color: #1a4620;
  text-decoration: none;
  transition: color 0.3s ease;
  font-weight: 500;
  word-break: break-word;
}

.contact-item a:hover,
.phone-link:hover {
  color: #6ab876;
}

@media (max-width: 768px) {
  .managers-section {
    padding: 40px 16px;
  }

  .section-title {
    font-size: 1.8rem;
    margin-bottom: 40px;
  }

  .managers-grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .card-content {
    padding: 24px;
    gap: 12px;
  }

  .manager-name {
    font-size: 1.3rem;
  }

  .card-image-wrapper {
    height: 280px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.5rem;
    margin-bottom: 30px;
  }

  .card-content {
    padding: 20px;
  }

  .contact-info {
    gap: 10px;
  }

  .contact-item,
  .contact-phones {
    font-size: 0.85rem;
  }
}
</style>
