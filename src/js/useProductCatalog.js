// Single source of truth for the product catalog UI: category filter,
// active (detail-modal) product, and search. Module-level refs make this a
// shared singleton, so the Nav search and the Products section stay in sync
// without the old global event bus.
import { ref, computed } from "vue";
import { items, types } from "./data";

const ALL = "all";

const selectedType = ref(ALL);
const activeProduct = ref(null);

export const categoryName = (typeStr) => {
  const first = String(typeStr).split(" ")[0];
  return types.find((t) => t.id === first)?.name || "Продукція";
};

const matchesType = (product, typeId) =>
  String(product.type).split(" ").includes(typeId);

const filteredItems = computed(() =>
  selectedType.value === ALL
    ? items
    : items.filter((p) => matchesType(p, selectedType.value))
);

// "All" + the real categories, each with a live product count.
const categories = computed(() => [
  { id: ALL, name: "Усі", count: items.length },
  ...types.map((t) => ({
    id: t.id,
    name: t.name,
    count: items.filter((p) => matchesType(p, t.id)).length,
  })),
]);

function selectType(id) {
  selectedType.value = id;
}

function openProduct(product) {
  activeProduct.value = product;
}

function closeProduct() {
  activeProduct.value = null;
}

function searchProducts(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return items.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      categoryName(p.type).toLowerCase().includes(q)
  );
}

// From the Nav search: jump to a product's category and open its detail.
function focusProduct(product) {
  selectedType.value = String(product.type).split(" ")[0];
  activeProduct.value = product;
}

export function useProductCatalog() {
  return {
    ALL,
    selectedType,
    activeProduct,
    filteredItems,
    categories,
    selectType,
    openProduct,
    closeProduct,
    searchProducts,
    focusProduct,
  };
}
