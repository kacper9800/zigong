<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="row">
                    <div class="col-md-8">
                        <div class="wpb_wrapper">
                            <h1 class="title-color">{{ content.title }}</h1>
                            <div v-html="content.html" />
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="wpb_wrapper" style="margin-top: 30px">
                            <h2 style="text-align: center" class="title-color">Questions?</h2>
                            <p style="text-align: center">
                                Do you have questions, need a quote? We have a wide range of
                                products, materials and supplies!
                            </p>
                        </div>
                        <div class="d-flex justify-content-center">
                            <nuxt-link
                                :to="localePath('/contact-us')"
                                class="btn btn-main-2 btn-round-full"
                                >Contact US<i class="icofont-simple-right ml-2"></i
                            ></nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- @todo - upgrade styles for this element -->
                    <div v-for="item in categories" :key="item.categorieId" class="col-md-4">
                        <div class="cube">
                            <div class="middle">
                                <div class="center">
                                    <nuxt-link
                                        :to="localePath('/products/' + item.category.slug)"
                                        class="btn btn-main"
                                        >Learn More</nuxt-link
                                    >
                                </div>
                            </div>
                            <div class="cube__face cube__face--front">
                                <div class="vckit-trcflp-icon">
                                    <img
                                        :src="
                                            baseUrl +
                                            '/thumbnails/' +
                                            item.category.coverImage.thumbnail
                                        "
                                        width="auto"
                                        height="110px"
                                    />
                                </div>
                                <br />
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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import config from '@/config';

export default {
    async asyncData({ app, store }) {
        const { code } = app.i18n.localeProperties;

        try {
            await store.dispatch('category/getAllCategories', {
                lng: code
            });

            const content = await store.dispatch('content/getContentBySlug', {
                params: { lng: code, slug: 'products-page' }
            });

            return { content };
        } catch (error) {
            console.error(error);
        }
    },

    data() {
        return {};
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

    methods: {}
};
</script>
