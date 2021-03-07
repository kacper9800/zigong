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
                            <h2 style="text-align: center" class="title-color">
                                {{ $t('products.questions') }}
                            </h2>
                            <p style="text-align: center">
                                {{ $t('products.questionSection') }}
                            </p>
                        </div>
                        <div class="d-flex justify-content-center">
                            <nuxt-link
                                :to="localePath('/contact-us')"
                                class="btn btn-main-2 btn-round-full"
                                >{{ $t('global.buttons.contactUs')
                                }}<i class="icofont-simple-right ml-2"></i
                            ></nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div
                        v-for="item in categories"
                        :key="item.categorieId"
                        class="col-md-4 col-sm-12 mt-4"
                    >
                        <div class="hovereffect">
                            <img
                                class="col-lg-12 col-md-12"
                                :src="baseUrl + '/thumbnails/' + item.category.coverImage.thumbnail"
                                alt="image"
                            />
                            <div class="overlay-img">
                                <nuxt-link
                                    :to="localePath('/products/' + item.category.slug)"
                                    class="center"
                                    ><h2>{{ item.name }}</h2></nuxt-link
                                >
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-sm-12 mt-4">
                        <div class="hovereffect">
                            <img
                                class="col-lg-12 col-md-12"
                                src="@/assets/images/contact-us.png"
                                alt="image"
                            />
                            <div class="overlay-img">
                                <nuxt-link :to="localePath('/contact-us')" class="center"
                                    ><h2>{{ $t('products.cardQuestion') }}</h2></nuxt-link
                                >
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

    head() {
        return {
            title: `Zigong - ${this.content.title}`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'My custom description'
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

    methods: {}
};
</script>
