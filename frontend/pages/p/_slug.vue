<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="row align-items-center">
                    <div class="col-md-3 align-self-start">
                        <products-navigator :slug="slug" />
                    </div>

                    <div class="col-md-9 align-self-start">
                        <h1 class="text-color">{{ product.name }}</h1>

                        <div v-html="product.article" />

                        <div v-if="product.sections">
                            <div v-for="item in product.sections" :key="item.key">
                                <div class="row">
                                    <div class="col-sm-12 col-md">
                                        <div v-html="item.article" />
                                    </div>
                                    <div class="flex-column">
                                        <div class="row">
                                            <div
                                                v-for="file in item.files"
                                                :key="file.id"
                                                class="flex-column"
                                            >
                                                <nuxt-link to="/" class="nav-link dropdown-toggle"
                                                    ><img
                                                        class="thumbnailImage"
                                                        :src="
                                                            baseUrl +
                                                            '/thumbnails/' +
                                                            file.thumbnail
                                                        "
                                                        alt="image"
                                                /></nuxt-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                        <hr />
                        <div class="row text-center">
                            <div
                                v-for="(item, imageIndex) in product.gallery"
                                :key="imageIndex"
                                @click="index = imageIndex"
                                class="col-md-4 mt-4"
                            >
                                <img
                                    class="img-fluid img-thumbnail"
                                    :src="baseUrl + '/thumbnails/' + item.thumbnail"
                                    alt="image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CoolLightBox
                v-if="gallery"
                :items="items"
                :index="index"
                @close="index = null"
                :slideshow="false"
            />
        </section>
    </div>
</template>
<script>
import ProductsNavigator from '~/components/elements/productsNavigator';
import config from '@/config';

export default {
    components: {
        ProductsNavigator
    },

    async asyncData({ app, store, params }) {
        const { code } = app.i18n.localeProperties;
        const { slug } = params;

        try {
            const product = await store.dispatch('products/getOneBySlug', {
                params: { lng: code, slug }
            });

            const { categoryId: category } = product;

            await store.dispatch('products/getProducts', {
                params: { lng: code, category }
            });

            return { slug, product };
        } catch (error) {
            console.error(error);
        }
    },

    data() {
        return {
            index: null,
            gallery: []
        };
    },

    computed: {
        baseUrl() {
            return config.mediaBaseUrl;
        },

        items() {
            return this.gallery.map(({ file }) => this.baseUrl + '/s720/' + file);
        }
    }
};
</script>
