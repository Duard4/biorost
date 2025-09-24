<template>
  <div>
    <!-- Фільтр для настільних комп'ютерів -->
    <ul class="product-types-list desktop" @click="filterItems">
      <li
        class="ptl-item searchable"
        v-for="type in types"
        :key="type.id"
        :class="{ active: isActiveType(type.id) }"
        :data-id="type.id"
      >
        {{ type.name }}
      </li>
    </ul>

    <!-- Фільтр для мобільних пристроїв -->
    <select class="product-types-select mobile" @change="filterItems">
      <option
        class="product-option"
        v-for="type in types"
        :key="type.id"
        :value="type.id"
        :selected="isActiveType(type.id)"
      >
        {{ type.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { onMounted, onUnmounted } from "vue";
import { items, types } from "../js/data";
import { eventBus } from "../js/eventBus";

export default {
  name: "ProductFilter",
  props: {
    selectedType: {
      type: [String, Number],
      default: null,
    },
  },
  emits: ["update:selectedType", "update:filteredItems"],
  setup(props, { emit }) {
    const isActiveType = (id) => String(props.selectedType) === String(id);

    const filterItems = (eventOrTypeId) => {
      let typeId;

      if (typeof eventOrTypeId === "object") {
        if (eventOrTypeId.target.tagName === "SELECT") {
          typeId = eventOrTypeId.target.value;
        } else {
          typeId = eventOrTypeId.target.dataset.id;
        }
      } else {
        typeId = eventOrTypeId;
      }

      if (typeId != null) {
        const fI = items.filter((item) => item.type.includes(typeId));
        const extra = items.filter((item) => !item.type.includes(typeId));
        emit("update:filteredItems", fI, extra);
        emit("update:selectedType", typeId);
      }
    };

    onMounted(() => {
      eventBus.on("openType", filterItems);
    });

    onUnmounted(() => {
      eventBus.off("openType", filterItems);
    });

    return {
      types,
      isActiveType,
      filterItems,
    };
  },
};
</script>

<style scoped>
.desktop {
  display: none;
}

.mobile {
  display: block;
}

.product-title {
  margin-bottom: 12px;
}

.product-types-select {
  font-size: 20px;
  color: var(--white);
  margin: 0 auto;
  text-align: center;
  background-color: var(--slateOp);
  backdrop-filter: blur(30px);
  box-shadow: 2px 2px 4px var(--slateOp);
}

.product-option {
  color: var(--slate);
  font-size: 12px;
}

.ptl-item.active {
  font-weight: bold;
  color: var(--accent);
}

@media (min-width: 768px) {
  .desktop {
    display: flex;
  }

  .product-title {
    margin-bottom: 2rem;
  }

  .mobile {
    display: none;
  }
}
</style>
