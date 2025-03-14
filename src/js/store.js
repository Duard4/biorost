import { createStore } from 'vuex';

export const store = createStore({
    state: {
        slideIndex: 0
    },
    mutations: {
        setSlideIndex(state, index) {
            state.slideIndex = index;
        }
    },
    actions: {
        updateSlideIndex({ commit }, index) {
            commit('setSlideIndex', index);
        }
    },
    getters: {
        slideIndex: state => state.slideIndex
    }
});
