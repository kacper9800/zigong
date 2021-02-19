'use strict';

export const defaultState = () => {
    return {
        content: {}
    };
};

export const state = () => defaultState();

export const getters = {
    getContent: state => state.content
};

export const mutations = {
    SET_CONTENT(state, content) {
        state.content = content;
    }
};

export const actions = {
    async getContentBySlug({ commit }, { params }) {
        const { lng, slug } = params;

        const { data } = await this.$axios.get(`/content/${slug}`, {
            params: { lng }
        });

        commit('SET_CONTENT', data);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
