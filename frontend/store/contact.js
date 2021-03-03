'use strict';

export const defaultState = () => {
    return {};
};

export const state = () => defaultState();

export const getters = {};

export const mutations = {};

export const actions = {
    async sendMessage({ commit }, params) {
        const { data } = await this.$axios.post(`/contact`, params);

        return data;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
