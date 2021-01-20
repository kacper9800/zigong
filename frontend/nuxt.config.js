const env = require('dotenv').config();
import enLocale from './assets/locales/en';

export default {
    mode: 'universal',
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'zigong',
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
    css: [],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        [
            'nuxt-i18n',
            {
                locales: [process.env.APP_LOCALE || 'en'],
                strategy: 'no_prefix',
                defaultLocale: 'en',

                vueI18n: {
                    fallbackLocale: 'en',
                    messages: {
                        en: enLocale
                    }
                }
            }
        ]
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: env.parsed.API_BASE_URL
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, ctx) {},
        extractCSS: true,
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
