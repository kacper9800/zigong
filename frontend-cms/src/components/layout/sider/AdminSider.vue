<template>
    <a-layout-sider
        :style="{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0
        }"
    >
        <div class="logo">
            <img
                class="img-fluid"
                src=""
                width="120"
                style="margin: 20px 0px 10px 30px"
            />
        </div>

        <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            mode="inline"
            theme="dark"
        >
            <a-sub-menu v-for="page in pages" :key="page.name">
                <span slot="title"
                    ><a-icon :type="page.icon" />
                    {{ page.name }}
                </span>
                <a-menu-item
                    v-for="subPage in page.subPages"
                    :key="subPage.name"
                >
                    <router-link :to="page.path + subPage.path">
                        {{ subPage.name }}
                    </router-link>
                </a-menu-item>
            </a-sub-menu>

            <a-menu-item
                v-for="singlePage in singlePages"
                :key="singlePage.name"
            >
                <router-link :to="singlePage.path">
                    <a-icon :type="singlePage.icon" />
                    <span>{{ singlePage.name }}</span>
                </router-link>
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
            pages: [
                {
                    path: '/content',
                    name: 'Content',
                    icon: 'appstore',
                    subPages: [
                        { path: '/home-page/en', name: 'Home page' },
                        { path: '/about-page/en', name: 'About page' },
                        {
                            path: '/products-page/en',
                            name: 'Products '
                        },
                        { path: '/resources/en', name: 'Resources' },
                        { path: '/contact-us/en', name: 'Contact US ' }
                    ]
                }
            ],
            singlePages: [
                { path: '/about', name: 'About', icon: 'appstore' },
                { path: '/categories', name: 'Categories', icon: 'container' },
                { path: '/products', name: 'Products', icon: 'appstore' },
                { path: '/files', name: 'Files', icon: 'file' },
                { path: '/users', name: 'Users', icon: 'team' }
            ]
        };
    }
};
</script>
<style scoped></style>
