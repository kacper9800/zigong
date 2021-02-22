'use strict';

export const defaultState = () => {
    return {
        categories: [],
        category: {}
    };
};

export const state = () => defaultState();

export const getters = {
    getCategories: state => state.categories,
    getCategory: state => state.category
};

export const mutations = {
    SET_CATEGORIES(state, categories) {
        state.categories = categories.data;
    },

    SET_CATEGORY(state, data) {
        state.category = data;
    },

    ADD_CATEGORY(state, data) {
        state.category = data;
    }
};

export const actions = {
    async getAllCategories({ commit }) {
        const { data } = await this.$axios.get(`/categories`);
        console.log(data);
        commit('SET_CATEGORIES', data);

        return data;
    },

    async getOneById({ commit }, { params }) {
        const { lng, id } = params;

        const { data } = await this.$axios.get(`/categories/id/${id}`, {
            params: { lng }
        });

        commit('SET_CATEGORY', data);

        return data;
    },

    async getOneBySlug({ commit }, { params }) {
        const { lng, slug } = params;

        const { data } = await this.$axios.get(`/categories/${slug}`, {
            params: { lng }
        });

        commit('SET_CATEGORY', data);

        return data;
    },

    async createOne({ commit }, category) {
        const { data } = await this.$axios.post('/categories', category);

        commit('ADD_CATEGORY', data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
