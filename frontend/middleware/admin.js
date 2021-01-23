export default async function ({ store, redirect }) {
    if (store.state.auth.loggedIn) {
        const roles = store.state.auth.user.Roles;
        const isAdmin = roles.some(role => role.name === 'admin');
        if (!isAdmin) {
            return redirect('/');
        }
    } else {
        return redirect('/login');
    }
}
