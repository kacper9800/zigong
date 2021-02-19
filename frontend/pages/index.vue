<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <a-carousel autoplay v-if="show">
                    <div
                        v-for="item in content.promotionalImages"
                        :key="item.file"
                    >
                        <nuxt-link :to="localePath(item.redirectTo)"
                            ><img
                                :src="baseUrl + '/s1440/' + item.file"
                                class="img-fluid"
                                alt="Responsive image"
                        /></nuxt-link>
                    </div>
                </a-carousel>
                <div v-else class="d-flex justify-content-center">
                    <a-spin>
                        <a-icon
                            slot="indicator"
                            type="loading"
                            style="font-size: 50px"
                            spin
                        />
                    </a-spin>
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="row">
                    <div
                        v-for="item in categories"
                        :key="item.categorieId"
                        class="col-md-4"
                    >
                        <div class="cube">
                            <div class="cube__face cube__face--front">
                                <div class="vckit-trcflp-icon">
                                    <img
                                        :src="
                                            baseUrl +
                                            '/thumbnails/' +
                                            item.category.homePageCoverImage
                                                .thumbnail
                                        "
                                        width="auto"
                                        height="110px"
                                    />
                                </div>
                                <div style="font-size: 17px; color: #244a8b">
                                    {{ item.name }}
                                </div>
                                <div style="font-size: 13px; color: #666666">
                                    {{ item.homePageDescription }}
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
                    <div class="col-md-6 col-sm-12">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe
                                class="embed-responsive-item"
                                :src="content.iso.youtube"
                                frameborder="0"
                            />
                        </div>
                        <div class="section" />
                        <div class="section" />
                        <div class="section" />
                    </div>

                    <div class="col-md-6 col-sm-12">
                        <div>
                            <h4 class="title-color">
                                {{ content.news.title }}
                            </h4>
                            <img
                                src="https://zim-llc.com/wp-content/uploads/2020/10/zigong-texas-1.png"
                                class="img-fluid"
                                alt="Responsive image"
                            />
                            <br />
                            <br />
                            <div v-html="content.news.html" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import config from '@/config';

export default {
    name: 'home',

    async asyncData({ app, store }) {
        const { code } = app.i18n.localeProperties;
        try {
            await store.dispatch('category/getData', {
                lng: code
            });

            await store.dispatch('content/getContentBySlug', {
                params: { lng: code, slug: 'home-page' }
            });
        } catch (error) {
            console.error(error);
        }
    },

    data() {
        return {
            show: false
        };
    },

    computed: {
        ...mapGetters({
            categories: 'category/getCategories',
            content: 'content/getContent'
        }),

        baseUrl() {
            return config.mediaBaseUrl;
        },

        availableLocales() {
            return this.$i18n.locale;
        }
    },

    mounted() {
        this.show = true;
    },

    methods: {}
};
</script>
