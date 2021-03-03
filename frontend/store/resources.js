'use strict';

export const defaultState = () => {
    return {
        resources: []
    };
};

export const state = () => defaultState();

export const getters = {
    getResources: state => state.products
};

export const mutations = {
    SET_RESOURCES(state, resources) {
        state.resources = resources.data;
    }
};

export const actions = {
    async getResources({ commit }, { params }) {
        const { data } = await this.$axios.get(`/resources`, { params });

        commit('SET_RESOURCES', data);

        return data;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
