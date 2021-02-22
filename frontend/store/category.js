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
    SET_CATEGORIES(state, data) {
        state.categories = data;
    },

    SET_CATEGORY(state, data) {
        state.category = data;
    },

    ADD_CATEGORY(state, data) {
        state.category = data;
    }
};

export const actions = {
    async getAllCategories({ commit }, lng) {
        const { data } = await this.$axios.get(`/categories`, { params: lng });

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
        console.log(category);
        await this.$axios.post('/categories', category);

        return data;
    },

    async deleteOne({commit}, id) {
      console.log(id);
      await this.$axios.delete(`/categories/${id}`);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
