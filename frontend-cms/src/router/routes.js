import store from '@state/store';

let crudRoutes = ['products'];

crudRoutes = crudRoutes.flatMap(route => [
    {
        path: `/${route}`,
        name: route,
        component: () => import(`@views/${route}/`),
        meta: {
            authRequired: true
        }
    },
    {
        path: `/${route}/add`,
        name: `${route}Add`,
        component: () => import(`@views/${route}/AddEdit`),
        meta: {
            authRequired: true
        }
    },
    {
        path: `/${route}/:id/:lng/edit`,
        name: `${route}Edit`,
        component: () => import(`@views/${route}/AddEdit`),
        meta: {
            authRequired: true
        }
    }
]);

export default [
    ...crudRoutes,

    {
        path: '/login',
        name: 'login',
        component: () => lazyLoadView(import('@views/auth/Login')),
        props: { layout: 'auth' },
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'dashboard' });
                } else {
                    // Continue to the login page
                    next();
                }
            }
        }
    },
    {
        path: '/logout',
        name: 'logout',
        meta: {
            authRequired: true,
            beforeResolve(routeTo, routeFrom, next) {
                store.dispatch('auth/logout');

                const authRequiredOnPreviousRoute = routeFrom.matched.some(
                    route => route.meta.authRequired
                );
                // Navigate back to previous page, or home as a fallback
                next(
                    authRequiredOnPreviousRoute
                        ? { name: 'dashboard' }
                        : { ...routeFrom }
                );
            }
        }
    },
    {
        path: '/reset-password/:token',
        name: 'reset-password',
        component: () => lazyLoadView(import('@views/auth/ResetPassword')),
        props: route => ({ token: route.params.token }),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                if (store.getters['auth/loggedIn']) {
                    next({ name: 'dashboard' });
                } else {
                    next();
                }
            }
        }
    },
    {
        path: '/reset-password',
        name: 'forgot-password',
        component: () => lazyLoadView(import('@views/auth/ForgetPassword')),
        meta: {
            beforeResolve(routeTo, routeFrom, next) {
                // If the user is already logged in
                if (store.getters['auth/loggedIn']) {
                    // Redirect to the home page instead
                    next({ name: 'dashboard' });
                } else {
                    // Continue to the login page
                    next();
                }
            }
        }
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@views/Dashboard'),
        meta: {
            authRequired: true
        }
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import('@views/categories/'),
        meta: {
            authRequired: true
        }
    },
    {
        path: '/content/home-page/:lng',
        name: 'home-page',
        component: () => import('@views/content/HomePage'),
        meta: {
            authRequired: true
        }
    },
    {
        path: '/content/about-page/:lng',
        name: 'about-page',
        component: () => import('@views/content/AboutPage'),
        meta: {
            authRequired: true
        }
    },

    {
        path: '/content/resources/:lng',
        name: 'resources',
        component: () => import('@views/content/Resources'),
        meta: {
            authRequired: true
        }
    },

    {
        path: '/content/products-page/:lng',
        name: 'products-page',
        component: () => import('@views/content/ProductsPage'),
        meta: {
            authRequired: true
        }
    }
];

function lazyLoadView(AsyncView) {
    const AsyncHandler = () => ({
        component: AsyncView,
        delay: 400,
        timeout: 10000
    });

    return Promise.resolve({
        functional: true,
        render(h, { data, children }) {
            return h(AsyncHandler, data, children);
        }
    });
}
