<template>
    <div class="nav-bar">
        <a-menu mode="horizontal" theme="dark">
            <a-menu-item v-for="page in pagesData" :key="page.name">
                <nuxt-link :to="mainPath + page.path">
                    <a-icon :type="page.icon" />
                    {{ page.name }}
                </nuxt-link>
            </a-menu-item>
            <a-menu-item>
                <nuxt-link :to="mainPath">
                    <a-icon type="flag" />
                    Languages
                </nuxt-link>
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mainPath: '/admin',
            pagesData: [
                { path: '/home', name: 'Home', icon: 'home' },
                { path: '/products', name: 'Products', icon: 'appstore' },
                { path: '/resources', name: 'Resources', icon: 'file' },
                { path: '/articles', name: 'Articles', icon: 'file-text' },
                { path: '/users', name: 'Users', icon: 'bulb' }
            ]
        };
    }
};
</script>
