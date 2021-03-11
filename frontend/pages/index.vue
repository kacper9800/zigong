<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <client-only>
                    <swiper class="swiper" :options="swiperOption">
                        <swiper-slide v-for="item in content.promotionalImages" :key="item.file">
                            <nuxt-link :to="localePath('/' + item.redirectTo)"
                                ><img
                                    loading="lazy"
                                    :src="baseUrl + '/thumbnails/' + item.thumbnail"
                                    :srcset="`${baseUrl}/s720/${item.file} 720w, ${baseUrl}/s1440/${item.file} 1440w`"
                                    class="img-fluid w-100"
                                    alt="image" /></nuxt-link
                        ></swiper-slide>
                        <div class="swiper-pagination d-none d-sm-block" slot="pagination" />
                        <div class="swiper-button-prev" slot="button-prev" />
                        <div class="swiper-button-next" slot="button-next" />
                    </swiper>
                </client-only>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="row">
                    <div v-for="item in categories" :key="item.categorieId" class="col-md-4">
                        <div class="cube">
                            <div class="middle">
                                <div class="center">
                                    <nuxt-link
                                        :to="localePath('/products/' + item.category.slug)"
                                        class="btn btn-main"
                                        >{{ $t(`global.buttons.learnMore`) }}</nuxt-link
                                    >
                                </div>
                            </div>
                            <div class="cube__face cube__face--front">
                                <div class="vckit-trcflp-icon">
                                    <img
                                        :src="
                                            baseUrl +
                                            '/thumbnails/' +
                                            item.category.homePageCoverImage.thumbnail
                                        "
                                        alt="image"
                                        width="auto"
                                        height="110px"
                                    />
                                </div>
                                <br />
                                <div class="cube-item-name">
                                    {{ item.name }}
                                </div>
                                <div class="cube-item-description">
                                    {{ item.homePageDescription }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="cube">
                            <div class="middle">
                                <div class="center">
                                    <nuxt-link
                                        :to="localePath('/contact-us')"
                                        class="btn btn-main"
                                        >{{ $t(`global.buttons.learnMore`) }}</nuxt-link
                                    >
                                </div>
                            </div>
                            <div class="cube__face cube__face--front">
                                <div class="vckit-trcflp-icon">
                                    <img
                                        src="@/assets/images/contact-us.png"
                                        width="auto"
                                        height="110px"
                                        alt="contact-us"
                                    />
                                </div>
                                <br />
                                <div style="font-size: 17px; color: #244a8b">
                                    {{ $t('products.questions') }}
                                </div>
                                <div style="font-size: 13px; color: #666666">
                                    {{ $t('categories.homePageQuestionsDescription') }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section service-2">
            <div class="container">
                <h1 class="title-color">{{ content.zim.title }}</h1>
                <div class="wpb_wrapper">
                    <div v-html="content.zim.html" />
                </div>
                <br />
                <hr />
            </div>
        </section>

        <section class="section about-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <h2 class="title-color">
                            {{ content.iso.title }}
                        </h2>
                        <div v-html="content.iso.html" />
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <h2 class="title-color">
                            {{ content.iso.locations.title }}
                        </h2>

                        <div v-html="content.iso.locations.html" />
                    </div>
                </div>
            </div>
        </section>

        <section class="section about">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6 align-self-start d-none d-sm-block">
                        <lite-youtube
                            :videoid="YouTubeGetID(content.iso.youtube)"
                            :style="`
                                background-image: url(https://i.ytimg.com/vi/${YouTubeGetID(
                                    content.iso.youtube
                                )}/hqdefault.jpg);
                            `"
                        />
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <h4 class="title-color"></h4>
                        <div class="card">
                            <img
                                loading="lazy"
                                class="card-img-top"
                                :src="baseUrl + '/thumbnails/' + content.news.image.thumbnail"
                                :srcset="`${baseUrl}/s720/${content.news.image.file} 720w, ${baseUrl}/s1440/${content.news.image.file} 1440w`"
                                alt="image"
                            />
                            <div class="card-body">
                                <div v-html="content.news.html" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import { mapGetters } from 'vuex';
import config from '@/config';

export default {
    name: 'home',

    components: {
        Swiper,
        SwiperSlide
    },

    directives: {
        swiper: directive
    },

    async asyncData({ app, store }) {
        const { code } = app.i18n.localeProperties;
        try {
            await store.dispatch('category/getAllCategories', {
                lng: code
            });

            const content = await store.dispatch('content/getContentBySlug', {
                params: { lng: code, slug: 'home-page' }
            });

            return { content };
        } catch (error) {
            console.error(error);
        }
    },

    data() {
        return {
            show: false,
            lng: this.$i18n.locale,
            swiperOption: {
                loop: true,
                spaceBetween: 30,
                centeredSlides: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            }
        };
    },

    head() {
        return {
            title: `Zigong - ${this.$t('mainMenu.home')}`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Description need to be updated'
                }
            ]
        };
    },

    head() {
        return {
            title: `Zigong - ${this.$t('mainMenu.home')}`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Description need to be updated'
                }
            ]
        };
    },

    computed: {
        ...mapGetters({
            categories: 'category/getCategories'
        }),

        baseUrl() {
            return config.mediaBaseUrl;
        }
    },

    mounted() {
        this.show = true;
    },

    methods: {
        YouTubeGetID(url) {
            url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
            return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
        }
    }
};
</script>
