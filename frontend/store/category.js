'use strict';

export const defaultState = () => {
    return {
        categories: {}
    };
};

export const state = () => defaultState();

export const getters = {
    getCategories: state => state.categories
};

export const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories;
    }
};

export const actions = {
    async getData({ commit }, lng) {
        const { data } = await this.$axios.get(`/categories`, { params: lng });

        commit('SET_CATEGORIES', data);

        return data;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
