export const actions = {
    nuxtServerInit({ dispatch }, { app }) {
        const { code } = app.i18n.localeProperties;

        return Promise.all([
            dispatch('about/getAllAboutData', {
                lng: code
            })
        ]);
    }
};

export const mutations = {};

export const getters = {
    loggedUser: state => state.auth.user,
    isAdminUser: (state, getters) =>
        getters.loggedUser && getters.loggedUser.Roles.some(role => role.name === 'admin'),
    isRegularUser: (state, getters) =>
        getters.loggedUser && getters.loggedUser.Roles.some(role => role.name === 'user')
};
