<template>
    <header class="fixed-top">
        <div class="header-top-bar">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <ul class="top-bar-info list-inline-item pl-0 mb-0">
                            <li class="list-inline-item">
                                The Subsidiary of Zigong Cemented Carbide Co.,
                                Ltd. in the US.
                            </li>
                        </ul>
                    </div>
                    <div class="col-lg-6">
                        <div class="text-lg-right top-right-bar mt-2 mt-lg-0">
                            <a href="">
                                <span>LinkedIn</span>
                            </a>
                            <nuxt-link
                                v-for="locale in availableLocales"
                                :key="locale"
                                :to="switchLocalePath(locale)"
                                >{{ locale }}
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav
            class="navbar navbar-expand-lg navigation"
            id="navbar"
            style="background-color: #254b8b"
        >
            <div class="container">
                <nuxt-link to="/" class="navbar-brand">
                    <img class="img-fluid" src="@/assets/images/logo.png" />
                </nuxt-link>

                <button
                    class="navbar-toggler collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarmain"
                    aria-controls="navbarmain"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="icofont-navigation-menu"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarmain">
                    <ul class="navbar-nav ml-auto">
                        <div v-for="page in pagesData" :key="page.name">
                            <li v-if="!page.subPages" class="nav-item active">
                                <nuxt-link
                                    :to="page.path"
                                    class="nav-link dropdown-toggle"
                                    >{{ page.name }}</nuxt-link
                                >
                            </li>

                            <li v-else class="nav-item dropdown">
                                <nuxt-link
                                    :to="page.path"
                                    class="nav-link dropdown-toggle"
                                    >{{ page.name }}
                                    <i class="icofont-thin-down"></i
                                ></nuxt-link>
                                <ul
                                    class="dropdown-menu"
                                    aria-labelledby="dropdown05"
                                >
                                    <li
                                        v-for="subpage in page.subPages"
                                        :key="subpage.name"
                                    >
                                        <nuxt-link
                                            :to="page.path + subpage.path"
                                            class="dropdown-item"
                                        >
                                            {{ subpage.name }}</nuxt-link
                                        >
                                    </li>
                                </ul>
                            </li>
                        </div>
                        <li v-if="iaAdminUser" class="nav-item active">
                            <nuxt-link
                                to="/admin"
                                class="nav-link dropdown-toggle"
                                >Admin</nuxt-link
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Header',

    data() {
        return {
            availableLocales: ['pl', 'en', 'ru'],
            pagesData: [
                { path: '/', name: 'Home' },
                {
                    path: '/about',
                    name: 'About',
                    subPages: [
                        { path: '/organization', name: 'Organization' },
                        { path: '/who-we-are', name: 'Who We Are' },
                        { path: '/our-facilities', name: 'Our Facilities' },
                        { path: '/capabilities', name: 'Capabilities' },
                        { path: '/credentials', name: 'Credentials' },
                        {
                            path: '/quality-certification',
                            name: 'quality-certification'
                        }
                    ]
                },
                {
                    path: '/products',
                    name: 'Products',
                    subPages: [{ path: '/powders', name: 'Powders' }]
                },
                { path: '/resources', name: 'Resources' },
                { path: '/contact-us/', name: 'Contact US' }
            ]
        };
    },

    computed: {
        ...mapGetters({
            iaAdminUser: 'iaAdminUser'
        }),

        mainBannerContent() {
            const { mainBanner } = this.getContent('home-page');

            return mainBanner;
        }
    }
};
</script>

<style scoped></style>
