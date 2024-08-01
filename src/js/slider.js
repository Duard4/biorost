import { ref, watch } from 'vue';

export function useSlider(items, slidesToShow) {
    const currentPage = ref(0);
    const paginationDots = ref([]);

    const updateSliderPosition = () => {
        const wrapper = document.getElementById('slider-wrapper');
        if (wrapper) {
            const slideWidth = wrapper.clientWidth / slidesToShow.value;
            wrapper.style.transform = `translateX(-${currentPage.value * slideWidth}px)`;
        }
    };

    const checkVisibility = () => {
        slidesToShow.value = window.innerWidth >= 768 ? 3 : 1;
        updateSliderPosition();
    };

    const goToSlide = (index) => {
        currentPage.value = index;
        updateSliderPosition();
    };

    watch(items, () => {
        const totalPages = Math.ceil(items.value.length / slidesToShow.value);
        paginationDots.value = new Array(totalPages).fill(0);
        currentPage.value = 0;
        updateSliderPosition();
    });

    return {
        currentPage,
        paginationDots,
        updateSliderPosition,
        checkVisibility,
        goToSlide
    };
}
