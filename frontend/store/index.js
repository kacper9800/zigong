export const actions = {
    nuxtServerInit({ dispatch }) {
        return Promise.all([
            // dispatch('content/index'),
        ]);
    }
};

export const mutations = {};

export const getters = {
    loggedUser: state => state.auth.user,
    iaAdminUser: (state, getters) =>
        getters.loggedUser && getters.loggedUser.type === 'admin',
    isRegularUser: (state, getters) =>
        getters.loggedUser && getters.loggedUser.type === 'user'
};
