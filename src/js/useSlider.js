import { ref, computed, nextTick } from 'vue';

export function useSlider(filteredItems, slidesToShow) {
    const currentPage = ref(0);

    const updatePagination = () => {
        const totalSlides = filteredItems.value.length;
        const totalPages = Math.ceil(totalSlides / slidesToShow.value);
        return Array.from({ length: totalPages });
    };

    const paginationDots = computed(() => updatePagination());

    const updateSliderPosition = () => {
        nextTick(() => {
            const sliderWrapper = document.getElementById('slider-wrapper');
            if (sliderWrapper) {
                const offset = -(currentPage.value * 100) / slidesToShow.value;
                sliderWrapper.style.transform = `translateX(${offset}%)`;
            }
        });
    };

    const checkVisibility = () => {
        nextTick(() => {
            const totalSlides = filteredItems.value.length;
            const screenWidth = window.innerWidth;

            if (screenWidth >= 1024) {
                slidesToShow.value = 3;
            } else if (screenWidth >= 768) {
                slidesToShow.value = 2;
            } else {
                slidesToShow.value = 1;
            }

            const totalPages = Math.ceil(totalSlides / slidesToShow.value);
            const buttonsVisible = totalPages > 1;

            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const pagination = document.querySelector('.pagination');

            if (prevBtn) prevBtn.style.display = buttonsVisible ? 'block' : 'none';
            if (nextBtn) nextBtn.style.display = buttonsVisible ? 'block' : 'none';
            if (pagination) pagination.style.display = buttonsVisible ? 'block' : 'none';
        });
    };

    const goToSlide = (index) => {
        currentPage.value = index;
        updateSliderPosition();
    };

    return {
        currentPage,
        paginationDots,
        updateSliderPosition,
        checkVisibility,
        goToSlide
    };
}
