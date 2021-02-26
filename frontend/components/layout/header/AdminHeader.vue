<template>
    <a-layout-header class="header">
        <a-menu
            theme="dark"
            mode="horizontal"
            :default-selected-keys="['2']"
            :style="{ lineHeight: '64px' }"
        >
            <a-menu-item v-for="page in pagesData" :key="page.name">
                <nuxt-link :to="page.path">
                    <a-icon :type="page.icon" />
                    <span class="nav-text"> {{ page.name }}</span>
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
                { path: '/logout', name: 'Logout', icon: 'logout' }
            ]
        };
    }
};
</script>
