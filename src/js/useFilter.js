import { ref, computed } from 'vue';

export function useFilter(items) {
    const selectedType = ref('org');

    const filteredItems = computed(() => {
        return items.filter(item => item.type === selectedType.value);
    });

    const filterItems = (event) => {
        const targetId = event.target.dataset.id;
        if (targetId) {
            selectedType.value = targetId;
        }
    };

    const isActiveType = (typeId) => {
        return selectedType.value === typeId;
    };

    const setType = (typeId) => {
        selectedType.value = typeId;
    };

    return {
        selectedType,
        filteredItems,
        filterItems,
        isActiveType,
        setType
    };
}
