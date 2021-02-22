'use strict';

export const defaultState = () => {
    return {
        files: [],
        totalPages: 0
    };
};

export const state = () => defaultState();

export const getters = {
    getFiles: state => state.files,
    getTotalPages: state => state.totalPages,
    getFileById: state => id => {
        const file = state.files.find(item => item.id === id);

        return file || null;
    }
};

export const mutations = {
    ADD_FILES(state, files) {
        if (state.files) {
            let temp = state.files;

            files.data.map(item => {
                temp.push(item);
            });

            const seen = new Set();
            const filteredArr = temp.filter(el => {
                const duplicate = seen.has(el.id);
                seen.add(el.id);
                return !duplicate;
            });

            state.files = filteredArr;
            state.totalPages = files.totalPages;
        } else {
            state.files = files.data;
            state.totalPages = files.totalPages;
        }
    },

    ADD_SINGLE_FILE(state, file) {
        state.files = [...state.files, file];
    }
};

export const actions = {
    async getFiles({ commit }, { params } = null) {
        const { data } = await this.$axios.get(`/files`, {
            params
        });

        commit('ADD_FILES', data);

        return data;
    },

    async getFileById({ getters, commit }, id) {
        if (!getters.getFileById(id)) {
            const { data } = await this.$axios.get(`/files/${id}`);

            commit('ADD_SINGLE_FILE', data);
        }

        return data;
    },

    async uploadFiles({ commit }, file) {
        console.log(file);
        const { data } = await this.$axios.post(`/files`, file, {
            headers: {
                accept: 'application/json',
                'Content-Type': `multipart/form-data; `
            }
        });

        commit('ADD_SINGLE_FILE', data);

        return data;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
