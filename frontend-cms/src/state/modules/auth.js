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
    SET_CURRENT_USER(state, newValue) {
        state.currentUser = newValue;
        saveState('user', newValue.user);
        saveState('token', newValue.token);
        saveState('refreshToken', newValue.refreshToken);
    },

    LOGOUT(state, newValue) {
        saveState('user', newValue);
        saveState('token', newValue);
        saveState('refreshToken', newValue);
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
            const { data: user = null } = await axios.post('/login', {
                email,
                password
            });

            commit('SET_CURRENT_USER', user);

            return user;
        } catch (error) {
            console.error(error);

            throw error;
        }
    },

    async validate({ commit, state }) {
        const token = getSavedState('token');

        try {
            const { data } = await axios.get('/me');

            return data;
        } catch (error) {
            if (error.response && error.response.status === 401) {
                commit('SET_CURRENT_USER', null);
            }

            return null;
        }
    }
};

function getSavedState(key) {
    return JSON.parse(window.localStorage.getItem(key));
}

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state));
}
