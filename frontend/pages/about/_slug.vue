<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="row align-items-center">
                    <div class="col-md-3 align-self-start">
                        <about-navigator :slug="slug" />
                    </div>
                    <div class="col-md-9 align-self-start">
                        <h1 class="text-color">{{ about.title }}</h1>

                        <div v-html="about.article" />

                        <div v-if="about.certifications" class="row">
                            <div
                                v-for="(item, index) in about.certifications"
                                :key="index"
                                class="col-sm-12 col-md-3"
                            >
                                <a
                                    :href="baseUrl + '/files/' + item.file"
                                    class="nav-link dropdown-toggle"
                                >
                                    <h3 class="text-color text-center">{{ item.description }}</h3>
                                    <img
                                        :src="baseUrl + '/thumbnails/' + item.thumbnail"
                                        class="figure-img img-fluid rounded"
                                        alt=""
                                    />
                                </a>
                            </div>
                        </div>

                        <div v-if="about.sections">
                            <div v-for="item in about.sections" :key="item.key">
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
                                                        alt="Responsive image"
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
                                v-for="(item, imageIndex) in about.gallery"
                                :key="imageIndex"
                                @click="index = imageIndex"
                                class="col-md-4 mt-4"
                            >
                                <img
                                    class="img-fluid img-thumbnail"
                                    :src="baseUrl + '/thumbnails/' + item.thumbnail"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <CoolLightBox
            v-if="about.gallery"
            :items="items"
            :index="index"
            @close="index = null"
            :slideshow="false"
        />
    </div>
</template>
<script>
import AboutNavigator from '~/components/elements/aboutNavigator';
import config from '@/config';

export default {
    components: {
        AboutNavigator
    },

    async asyncData({ app, store, params }) {
        const { slug } = params;
        const { code } = app.i18n.localeProperties;

        try {
            const about = await store.dispatch('about/getOneBySlug', {
                params: { lng: code, slug }
            });

            return { about, slug };
        } catch (error) {
            console.error(error);
        }
    },

    data() {
        return {
            index: null
        };
    },

    computed: {
        baseUrl() {
            return config.mediaBaseUrl;
        },

        items() {
            return this.about.gallery.map(({ file }) => this.baseUrl + '/s720/' + file);
        }
    }
};
</script>
