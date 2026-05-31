<script setup>
import { ref, watch, nextTick } from "vue";
import { useProductCatalog, categoryName } from "../../js/useProductCatalog";

const { activeProduct, closeProduct } = useProductCatalog();
const dialog = ref(null);

// Drive the native <dialog> from shared state (focus-trap + Esc come free).
watch(activeProduct, async (product) => {
  await nextTick();
  const el = dialog.value;
  if (!el) return;
  if (product && !el.open) el.showModal();
  else if (!product && el.open) el.close();
});

// Keep state in sync when closed via Esc / backdrop / close button.
function onClose() {
  if (activeProduct.value) closeProduct();
}

function onBackdropClick(event) {
  if (event.target === dialog.value) closeProduct();
}
</script>

<template>
  <dialog
    ref="dialog"
    class="modal"
    aria-labelledby="product-modal-title"
    @close="onClose"
    @click="onBackdropClick"
  >
    <div v-if="activeProduct" class="modal__panel">
      <button
        type="button"
        class="modal__close"
        aria-label="Закрити"
        @click="closeProduct"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
          />
        </svg>
      </button>

      <figure class="modal__media">
        <img
          :src="activeProduct.backImage || activeProduct.frontImage"
          :alt="`${activeProduct.title} — склад та рекомендації із застосування`"
        />
      </figure>

      <div class="modal__info">
        <p class="modal__cat">{{ categoryName(activeProduct.type) }}</p>
        <h2 id="product-modal-title" class="modal__title">
          {{ activeProduct.title }}
        </h2>
        <p v-if="activeProduct.description" class="modal__desc">
          {{ activeProduct.description }}
        </p>
        <a class="modal__cta" href="#form" @click="closeProduct">
          Замовити цей продукт
        </a>
      </div>
    </div>
  </dialog>
</template>

<style scoped>
.modal {
  width: min(960px, 100vw - 2rem);
  max-height: min(88dvh, 900px);
  padding: 0;
  border: none;
  border-radius: var(--radius-lg);
  background: var(--surface);
  color: var(--ink);
  box-shadow: var(--shadow-2);
  overflow: hidden;
}

.modal::backdrop {
  background: oklch(0.2 0.03 150 / 0.55);
  backdrop-filter: blur(2px);
}

.modal[open] {
  animation: modal-in var(--dur) var(--ease-out-quart);
}
.modal[open]::backdrop {
  animation: fade-in var(--dur) var(--ease-out-quart);
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
}

.modal__panel {
  display: grid;
  grid-template-rows: auto 1fr;
  max-height: inherit;
}

.modal__close {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  z-index: 1;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: none;
  border-radius: var(--radius-full);
  background: color-mix(in oklch, var(--surface) 80%, transparent);
  color: var(--ink);
  cursor: pointer;
  box-shadow: var(--shadow-1);
}
.modal__close:hover {
  background: var(--surface-sunk);
}
.modal__close:focus-visible {
  outline: 3px solid var(--accent);
  outline-offset: 2px;
}

.modal__media {
  margin: 0;
  background: var(--surface-sunk);
  overflow-y: auto;
  max-height: 50dvh;
}
.modal__media img {
  display: block;
  width: 100%;
  height: auto;
}

.modal__info {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
  overflow-y: auto;
}

.modal__cat {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--brand);
  margin: 0;
}

.modal__title {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: 700;
  line-height: 1.1;
  color: var(--brand-ink);
  margin: 0;
  text-wrap: balance;
}

.modal__desc {
  font-size: var(--text-base);
  line-height: 1.6;
  color: var(--ink);
  margin: 0;
  max-width: 65ch;
  text-wrap: pretty;
}

.modal__cta {
  align-self: flex-start;
  margin-top: var(--space-2);
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-full);
  background: var(--accent);
  color: var(--on-accent);
  font-weight: 700;
  text-decoration: none;
  transition: transform var(--dur) var(--ease-out-quart),
    box-shadow var(--dur) var(--ease-out-quart);
}
.modal__cta:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-1);
}
.modal__cta:focus-visible {
  outline: 3px solid var(--brand);
  outline-offset: 2px;
}

/* Desktop: spec sheet beside the copy */
@media (min-width: 768px) {
  .modal__panel {
    grid-template-rows: none;
    grid-template-columns: 1fr 1fr;
  }
  .modal__media {
    max-height: inherit;
  }
}

@media (prefers-reduced-motion: reduce) {
  .modal[open],
  .modal[open]::backdrop {
    animation: none;
  }
  .modal__cta {
    transition: none;
  }
  .modal__cta:hover {
    transform: none;
  }
}
</style>
