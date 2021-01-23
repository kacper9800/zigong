<template>
    <a-layout-header class="header">
        <div class="logo" />
        <a-menu mode="horizontal" theme="dark">
            <a-menu-item v-for="page in pagesData" :key="page.name">
                <nuxt-link :to="page.path">
                    <a-icon :type="page.icon" />
                    {{ page.name }}
                </nuxt-link>
            </a-menu-item>
        </a-menu>
    </a-layout-header>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            pagesData: [
                { path: '/', name: 'Back to Home Page', icon: 'home' },
                { path: '/logout', name: 'Logout', icon: 'info-circle' }
            ]
        };
    }
};
</script>
