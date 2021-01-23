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
        getters.loggedUser &&
        getters.loggedUser.Roles.some(role => role.name === 'admin'),
    isRegularUser: (state, getters) =>
        getters.loggedUser &&
        getters.loggedUser.Roles.some(role => role.name === 'user')
};
