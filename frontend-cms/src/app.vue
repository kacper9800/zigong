<template>
    <div id="app">
        <layout v-if="layout === 'default'">
            <router-view :key="$route.fullPath" />
        </layout>
        <auth-layout v-if="layout === 'auth'">
            <router-view :key="$route.fullPath" />
        </auth-layout>
    </div>
</template>

<script>
import Layout from './layouts/main';
import AuthLayout from './layouts/auth';
import appConfig from './app.config.json';

export default {
    page: {
        // All subcomponent titles will be injected into this template.
        titleTemplate(title) {
            title = typeof title === 'function' ? title(this.$store) : title;
            return title ? `${title} | ${appConfig.title}` : appConfig.title;
        },

        meta: [{ name: 'description', content: appConfig.description }]
    },

    components: {
        Layout,
        AuthLayout
    },

    data() {
        return {
            layout: 'default',
            authRoutes: ['login', 'reset-password', 'forget-password']
        };
    },

    watch: {
        '$route.fullPath'() {
            let route = this.$route.fullPath.split('/')[1];
            route = route.split('?')[0];

            if (this.authRoutes.includes(route)) {
                this.layout = 'auth';
            } else {
                this.layout = 'default';
            }
        }
    }
};
</script>
