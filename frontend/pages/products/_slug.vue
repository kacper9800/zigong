<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="row">
                    <div class="col-md-8">
                        <div class="wpb_wrapper">
                            <h1 class="title-color">{{ category.name }}</h1>
                            <div v-html="category.description" />
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
                        v-for="item in products"
                        :key="item.productId"
                        class="col-md-4 col-sm-12 mt-4"
                    >
                        <div v-if="item.product" class="hovereffect">
                            <img
                                class="col-lg-12 col-md-12"
                                :src="baseUrl + '/thumbnails/' + item.product.file.thumbnail"
                                alt=""
                            />
                            <div class="overlay-img">
                                <nuxt-link
                                    :to="localePath('/p/' + item.product.slug)"
                                    class="center"
                                    ><h2>{{ item.name }}</h2></nuxt-link
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
    name: 'products',

    async asyncData({ app, store, params }) {
        const { code } = app.i18n.localeProperties;
        const { slug } = params;

        try {
            const data = await store.dispatch('category/getOneBySlug', {
                params: { lng: code, slug }
            });

            await store.dispatch('products/getProducts', {
                params: { lng: code, category: data.categoryId }
            });

            return { slug };
        } catch (error) {
            console.error(error);
        }
    },

    data() {
        return {};
    },

    computed: {
        ...mapGetters({
            category: 'category/getCategory',
            products: 'products/getProducts'
        }),

        baseUrl() {
            return config.mediaBaseUrl;
        }
    },

    methods: {}
};
</script>
