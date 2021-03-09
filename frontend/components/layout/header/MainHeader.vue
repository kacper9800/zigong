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
                                    ><svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        class="bi bi-linkedin"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                                        /></svg
                                ></span>
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
            ],
            products: [
                {
                    name: 'Powders',
                    path: '/',
                    subPages: [
                        { name: 'Ammonium Metatungstate (AMT)', path: '/' },
                        { name: 'Tungsten Oxide', path: '/' },
                        { name: 'Tungsten Metal Powders', path: '/' },
                        { name: 'Tungsten Carbide Powder', path: '/' },
                        { name: 'Ready to Press Powder', path: '/' },
                        { name: 'Powder Production of Tungsten', path: '/' }
                    ]
                },
                {
                    name: 'Cemented Carbides',
                    path: '/',
                    subPages: [
                        { name: 'Carbide Inserts', path: '/' },
                        { name: 'Carbide Wear Parts', path: '/' },
                        { name: 'Carbide Precision Parts', path: '/' },
                        { name: 'Cemented Carbide for Mining', path: '/' },
                        { name: 'Carbide Rods and Bars', path: '/' },
                        { name: 'Solid Carbide Tools', path: '/' },
                        { name: 'Mining & Construction Tools', path: '/' }
                    ]
                },
                { name: 'Hardfacing Materials', path: '/' },
                { name: 'W & Mo Products', path: '/' },
                { name: 'Equipment for Carbide Production', path: '/' }
            ]
        };
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
