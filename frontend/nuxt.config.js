const env = require('dotenv').config();
import enLocale from './assets/locales/en';
import plLocale from './assets/locales/pl';
import ruLocale from './assets/locales/ru';

export default {
    ssr: true,
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Zigong website',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'ZGCC is one of the largest producers of Cemented Carbide, Tungsten and Molybdenum products in China. The company is in the top ten of the world as a producer of these products. With over 50 years of experience, we have built complete production lines from raw materials to downstream products as well as have provided our customers with a full range of materials.'
            }
        ],
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },

    env: {
        appUrl: env.parsed.APP_URL || 'http://localhost:3000',
        apiBaseUrl: env.parsed.APP_URL + '/api' || 'http://localhost:3001',
        mediaBaseUrl: env.parsed.MEDIA_BASE_URL || 'http://localhost:3001'
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '@/assets/styles/bootstrap.main.scss',
        '@/assets/design/main.scss',
        '@/assets/fonts/iconFonts.css',
        'node_modules/lite-youtube-embed/src/lite-yt-embed.css'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: ['@/plugins/vuelidate', '@/plugins/vue-cool-lightbox', '@/plugins/youtube.client.js'],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: ['@nuxtjs/pwa'],

    pwa: {
        manifest: {
            theme_color: '#4765a6',
            background_color: '#4765a6',
            name: 'Zigong International Marketing',
            short_name: 'Zgcc-eu.com',
            lang: 'en'
        }
    },

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
        prefix: '/api/',
        proxy: true
    },

    proxy: {
        '/api': { target: env.parsed.API_BASE_URL, pathRewrite: { '^/api': '' } },
        '/public': {
            target: env.parsed.API_BASE_URL,
            pathRewrite: { '^/public': '' }
        }
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        vendor: ['vue-pdf'],
        extend(config, { isClient }) {
            config.output.globalObject = 'this';
            if (isClient) {
                config.devtool = '#source-map';
            }
        },
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
    },

    vue: {
        config: {
            ignoredElements: ['stream']
        }
    }
};
