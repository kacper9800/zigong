'use strict';

export const defaultState = () => {
    return {
        content: []
    };
};

export const state = () => defaultState();

export const getters = {
    getContent: state => state.content,
    getContentByKey: state => key => {
        const content = state.content.find(item => item.key === key);

        return content || null;
    }
};

export const mutations = {
    ADD_SINGLE_CONTENT_SECTION(state, content) {
        state.content = [...state.content, content];
    }
};

export const actions = {
    async getContentBySlug({ getters, commit }, { params }) {
        const { lng, slug } = params;

        const { data } = await this.$axios.get(`/content/${slug}`, {
            params: { lng }
        });

        if (!getters.getContentByKey(slug + '-' + lng)) {
            data.key = slug + '-' + lng;

            commit('ADD_SINGLE_CONTENT_SECTION', data);
        }

        return data;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
