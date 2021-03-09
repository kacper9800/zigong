import axios from 'axios';

export const state = {
    content: []
};

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

        const { data } = await axios.get(`/content/${slug}`, {
            params: { lng }
        });

        if (!getters.getContentByKey(slug + '-' + lng)) {
            data.key = slug + '-' + lng;

            commit('ADD_SINGLE_CONTENT_SECTION', data);
        }

        return data;
    },

    async update({ getters, commit }, params) {
        const slug = params.slug;

        const { data } = await axios.put(`/content/${slug}`, params);

        return data;
    }
};
