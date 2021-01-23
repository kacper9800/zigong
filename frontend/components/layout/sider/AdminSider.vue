<template>
    <a-layout-sider width="200">
        <a-menu
            mode="inline"
            :open-keys.sync="openKeys"
            :style="{ height: '80vh', borderRight: 0 }"
        >
            <a-sub-menu v-for="page in pages" :key="page.name">
                <span slot="title"
                    ><a-icon :type="page.icon" />
                    <nuxt-link :to="mainPath + page.path">
                        {{ page.name }}
                    </nuxt-link>
                </span>
                <a-menu-item
                    v-for="subPage in page.subPages"
                    :key="subPage.name"
                >
                    <nuxt-link :to="mainPath + page.path + subPage.path">
                        {{ subPage.name }}
                    </nuxt-link>
                </a-menu-item>
            </a-sub-menu>

            <a-menu-item
                v-for="singlePage in singlePages"
                :key="singlePage.name"
            >
                <nuxt-link :to="mainPath + singlePage.path">
                    <a-icon :type="singlePage.icon" />
                    <span>{{ singlePage.name }}</span>
                </nuxt-link>
            </a-menu-item>
        </a-menu>
    </a-layout-sider>
</template>

<script>
export default {
    layout: 'admin',
    data() {
        return {
            openKeys: ['products'],
            mainPath: '/admin',
            pages: [
                {
                    path: '/about',
                    name: 'About',
                    icon: 'appstore',
                    subPages: [
                        { path: '/powders', name: 'Powders' },
                        { path: 'cemented-carbides', name: 'Cemented Carbides' }
                    ]
                },
                {
                    path: '/products',
                    name: 'Products',
                    icon: 'appstore',
                    subPages: [
                        { path: '/powders', name: 'Powders' },
                        { path: 'cemented-carbides', name: 'Cemented Carbides' }
                    ]
                }
            ],
            singlePages: [
                { path: '/articles', name: 'Articles', icon: 'file-text' },
                { path: '/resources', name: 'Resources', icon: 'file' },
                { path: '/users', name: 'Users', icon: 'team' }
            ]
        };
    }
};
</script>

<style scoped></style>
