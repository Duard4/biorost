import { ref } from 'vue';

export function useFilter(items) {
    const selectedType = ref(null);
    const filteredItems = ref(items);

    const filterItems = (event) => {
        const typeId = parseInt(event.target.dataset.id);
        selectedType.value = typeId;
        if (typeId) {
            filteredItems.value = items.filter(item => item.type === typeId);
        } else {
            filteredItems.value = items;
        }
    };

    const isActiveType = (typeId) => selectedType.value === typeId;

    return {
        selectedType,
        filteredItems,
        filterItems,
        isActiveType
    };
}
