'use strict';

export const defaultState = () => {
    return {
        items: [],
        item: {}
    };
};

export const state = () => defaultState();

export const getters = {
    getSinglePage: state => state.item,
    getAllData: state => state.items
};

export const mutations = {
    SET_SINGLE_PAGE(state, about) {
        state.item = about;
    },

    SET_ALL_DATA(state, about) {
        state.items = about.data;
    }
};

export const actions = {
    async getAllAboutData({ commit }, params) {
        const { data } = await this.$axios.get(`/about`, { params });

        commit('SET_ALL_DATA', data);

        return data;
    },

    async getOneById({ commit }, { params }) {
        const { lng, id } = params;

        const { data } = await this.$axios.get(`/about/id/${id}`, {
            params: { lng }
        });

        commit('SET_SINGLE_PAGE', data);

        return data;
    },

    async getOneBySlug({ commit }, { params }) {
        const { lng, slug } = params;

        const { data } = await this.$axios.get(`/about/${slug}`, {
            params: { lng }
        });

        commit('SET_SINGLE_PAGE', data);

        return data;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
