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
                                Questions?
                            </h2>
                            <p style="text-align: center">
                                Do you have questions, need a quote? We have a
                                wide range of products, materials and supplies!
                            </p>
                        </div>
                        <div class="d-flex justify-content-center">
                            <nuxt-link
                                :to="localePath('contact-us')"
                                class="btn btn-main-2 btn-round-full"
                                >Contact US<i
                                    class="icofont-simple-right ml-2"
                                ></i
                            ></nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="row"></div>
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
            await store.dispatch('category/getOneBySlug', {
                params: { lng: code, slug }
            });
        } catch (error) {
            console.error(error);
        }
    },

    data() {
        return {};
    },

    computed: {
        ...mapGetters({
            category: 'category/getCategory'
        }),

        baseUrl() {
            return config.mediaBaseUrl;
        }
    },

    methods: {}
};
</script>
