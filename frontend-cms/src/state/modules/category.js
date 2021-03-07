import axios from 'axios';

export const state = {
    categories: [],
    category: {},
    pagination: {}
};

export const getters = {
    getCategories: state => state.categories,
    getCategory: state => state.category,
    getPagination: state => state.pagination
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
    },

    UPDATE_CATEGORY(state, data) {
        const index = state.categories.findIndex(
            element => element.id == data.id
        );
        state.categories.splice(index, 1, data);
    }
};

export const actions = {
    async getAllCategories({ commit }, params) {
        const { data } = await axios.get(`/categories`, { params });

        commit('SET_CATEGORIES', data);

        return data;
    },

    async getOneById({ commit }, { params }) {
        const { lng, id } = params;

        const { data } = await axios.get(`/categories/id/${id}`, {
            params: { lng }
        });

        commit('SET_CATEGORY', data);

        return data;
    },

    async getOneBySlug({ commit }, { params }) {
        const { lng, slug } = params;

        const { data } = await axios.get(`/categories/${slug}`, {
            params: { lng }
        });

        commit('SET_CATEGORY', data);

        return data;
    },

    async createOne({ commit }, category) {
        const { data } = await axios.post('/categories', category);

        commit('ADD_CATEGORY', data);

        return data;
    },

    async updateOne({ commit }, category) {
        const { categoryId } = category;
        const { data } = await axios.put(`/categories/${categoryId}`, category);

        commit('UPDATE_CATEGORY', data);

        return data;
    },

    async deleteOne({ commit }, id) {
        await axios.delete(`/categories/${id}`);
    }
};