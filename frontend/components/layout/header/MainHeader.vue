<template>
    <header class="fixed-top">
        <div v-if="isVisible" class="header-top-bar">
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-6">
                        <ul class="top-bar-info list-inline-item pl-0 mb-0">
                            <li class="list-inline-item">The Subsidiary of Zigong Poland</li>
                        </ul>
                    </div>
                    <div class="col-6">
                        <div class="top-right-bar">
                            <a
                                href="https://www.linkedin.com/company/zigong-international-marketing"
                            >
                                <span
                                    ><img src="@/assets/images/linkedIn.svg" alt="linkedIn"
                                /></span>
                            </a>
                            <nuxt-link
                                v-for="locale in availableLocales"
                                :key="locale.name"
                                :to="switchLocalePath(locale.path)"
                            >
                                <span>{{ locale.name }}</span>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <nav class="navbar navbar-expand-lg navigation" id="navbar">
            <div class="container">
                <nuxt-link :to="localePath('/')" class="navbar-brand">
                    <img class="img-fluid" src="@/assets/images/logo.png" alt="logo" />
                </nuxt-link>

                <button
                    class="navbar-toggler collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarmain"
                    aria-controls="navbarmain"
                    aria-expanded="true"
                    aria-label="Toggle navigation"
                    @click="toggleNavBar"
                >
                    <span class="icofont-navigation-menu"></span>
                </button>

                <div
                    class="collapse navbar-collapse"
                    id="navbarmain"
                    v-bind:class="{ show: showMobileMenu }"
                >
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item active">
                            <nuxt-link :to="localePath('/')" class="nav-link dropdown-toggle">{{
                                $t(`mainMenu.home`)
                            }}</nuxt-link>
                        </li>

                        <li class="nav-item dropdown">
                            <nuxt-link :to="localePath('/about')" class="nav-link dropdown-toggle"
                                >{{ $t(`mainMenu.about`) }} <i class="icofont-thin-down"
                            /></nuxt-link>
                            <ul class="dropdown-menu" aria-labelledby="dropdown05">
                                <li v-for="subpage in aboutSubpagesConvert" :key="subpage.name">
                                    <nuxt-link
                                        :to="localePath('/about/' + subpage.path)"
                                        class="dropdown-item"
                                    >
                                        {{ subpage.name }}
                                    </nuxt-link>
                                </li>
                            </ul>
                        </li>

                        <li class="nav-item dropdown products-dropdown" style="position: initial">
                            <nuxt-link
                                :to="localePath('/products')"
                                class="nav-link dropdown-toggle"
                                >{{ $t(`mainMenu.products`) }} <i class="icofont-thin-down"
                            /></nuxt-link>

                            <div class="mega-sub-menu">
                                <div class="container-fluid d-flex justify-content-center">
                                    <ul v-for="page in resources" :key="page.name">
                                        <nuxt-link
                                            :to="localePath('/products/' + page.slug)"
                                            class="col text-justify"
                                        >
                                            {{ page.categoryTranslation.name }}
                                        </nuxt-link>
                                        <li
                                            v-for="subPage in page.resource"
                                            :key="subPage.id"
                                            class=""
                                        >
                                            <nuxt-link :to="localePath('/p/' + subPage.slug)">
                                                {{ subPage.name }}
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        <li class="nav-item active">
                            <nuxt-link
                                :to="localePath('/resources')"
                                class="nav-link dropdown-toggle"
                                >{{ $t(`mainMenu.resources`) }}</nuxt-link
                            >
                        </li>

                        <li class="nav-item active">
                            <nuxt-link
                                :to="localePath('/contact-us')"
                                class="nav-link dropdown-toggle"
                                >{{ $t(`mainMenu.contactUs`) }}</nuxt-link
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
            isVisible: true,
            showMobileMenu: false,
            availableLocales: [
                { name: 'EN', flag: '', path: 'en' },
                { name: 'PL', flag: '', path: 'pl' },
                { name: 'RU', flag: '', path: 'ru' }
            ]
        };
    },

    watch: {
        '$route.fullPath'() {
            this.showMobileMenu = false;
        }
    },

    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    },

    computed: {
        ...mapGetters({
            isAdminUser: 'isAdminUser',
            aboutSubpages: 'about/getAllData',
            resources: 'resources/getResources'
        }),

        mainBannerContent() {
            const { mainBanner } = this.getContent('home-page');

            return mainBanner;
        },

        aboutSubpagesConvert() {
            return this.aboutSubpages.map(item => {
                return { path: item.slug, name: item.name };
            });
        }
    },

    methods: {
        toggleNavBar() {
            this.showMobileMenu = !this.showMobileMenu;
        },

        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },

        onScroll() {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollPosition >= 50) {
                this.isVisible = false;
            } else {
                this.isVisible = true;
            }
        }
    }
};
</script>

<style scoped></style>
