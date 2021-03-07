import axios from 'axios';

export const state = {
    currentUser: getSavedState('user'),
    refreshToken: getSavedState('refreshToken'),
    token: getSavedState('token')
};

export const getters = {
    loggedIn(state) {
        return !!state.currentUser;
    },

    currentUser: state => state.currentUser
};

export const mutations = {
    SET_CURRENT_USER(state, data) {
        saveState('refreshToken', data.refreshToken);
        saveState('user', data.user);
        saveState('token', data.token);
        state.currentUser = data;
    },

    LOGOUT(state, newValue) {
        localStorage.user = JSON.stringify({});
        localStorage.token = JSON.stringify({});
    }
};

export const actions = {
    init({ state, dispatch }) {
        dispatch('validate');
    },

    async logout({ commit }) {
        commit('LOGOUT', null);
    },

    async login({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) {
            return dispatch('validate');
        }

        try {
            const { data } = await axios.post('/login', {
                email,
                password
            });

            commit('SET_CURRENT_USER', data);

            return data;
        } catch (error) {
            console.error(error);

            throw error;
        }
    },

    async validate({ commit, state }) {
        if (localStorage.token) {
            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + JSON.parse(localStorage.token);
        }

        try {
            const { data } = await axios.get('/me');

            return data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                commit('SET_CURRENT_USER', null);
            }

            return null;
        }
    },

    async recoverPassword({ commit, state }, { email }) {
        await axios.post('/recover-password', { email });
    },

    async resetPassword(
        { commit, state },
        { token, password, passwordRepeat }
    ) {
        await axios.post(`/recover-password/${token}`, {
            password,
            passwordRepeat
        });
    }
};

function getSavedState(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state));
}
