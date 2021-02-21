const env = require('dotenv').config();
import enLocale from './assets/locales/en';
import plLocale from './assets/locales/pl';
import ruLocale from './assets/locales/ru';

export default {
    mode: 'universal',
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Zigong website',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    env: {
        appUrl: env.parsed.APP_URL || 'http://localhost:3000',
        apiBaseUrl: env.parsed.API_BASE_URL || 'http://localhost:3001',
        mediaBaseUrl: env.parsed.MEDIA_BASE_URL || 'http://localhost:3001'
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: ['@/assets/design/main.scss', '@/assets/fonts/iconFonts.css'],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: ['@/plugins/antd-ui', '@/plugins/bootstrap'],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],

    primevue: {
        theme: 'saga-blue',
        ripple: true,
        components: ['InputText', 'Button', 'Toast']
    },

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/auth-next',
        '@nuxtjs/axios',
        [
            'nuxt-i18n',
            {
                strategy: 'prefix_except_default',
                defaultLocale: process.env.APP_LOCALE || 'en',
                locales: [process.env.APP_LOCALE || 'en', 'pl', 'ru'],
                detectBrowserLanguage: {
                    useCookie: true,
                    fallbackLocale: 'en'
                },

                vueI18n: {
                    fallbackLocale: 'en',
                    messages: {
                        pl: plLocale,
                        en: enLocale,
                        ru: ruLocale
                    }
                }
            }
        ]
    ],

    auth: {
        localStorage: {
            prefix: 'auth.'
        },

        redirect: {
            login: '/login',
            home: '/',
            callback: false
        },
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: '/login',
                        method: 'post'
                    },
                    user: {
                        url: '/me',
                        method: 'get',
                        propertyName: false,
                        tokenRequired: true,
                        tokenType: 'bearer'
                    }
                },
                tokenRequired: true,
                tokenType: 'bearer'
            }
        }
    },

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: env.parsed.API_BASE_URL
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, ctx) {},
        extractCSS: {
            ignoreOrder: false
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '.',
                name: undefined,
                cacheGroups: {}
            }
        }
    }
};
