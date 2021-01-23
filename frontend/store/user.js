'use strict';

export const defaultState = () => {
    return {
        user: null,
        userDetails: {},
        isGoldUser: false
    };
};

export const state = () => defaultState();

export const getters = {
    getUser: state => state.user
};

export const mutations = {
    SET_USER(state, user) {
        state.user = user;
    }
};

export const actions = {
    async getData({ commit }, role = null) {
        const { data } = await this.$axios.get(`/me`);

        commit('SET_USER', data);

        return data;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
