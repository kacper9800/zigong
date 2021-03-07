<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="row align-items-center">
                    <div class="col-md-3 align-self-start">
                        <about-navigator />
                    </div>

                    <div class="col-md-9 align-self-start">
                        <h1 class="text-color">{{ content.title }}</h1>

                        <div v-html="content.html" />

                        <hr />

                        <div class="row text-center">
                            <div
                                v-for="(item, imageIndex) in gallery"
                                :key="imageIndex"
                                @click="index = imageIndex"
                                class="col-md-4 mt-4"
                            >
                                <img
                                    class="img-fluid img-thumbnail"
                                    :src="baseUrl + '/thumbnails/' + item.thumbnail"
                                    :alt="item.name"
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
import AboutNavigator from '~/components/elements/aboutNavigator';
import config from '@/config';

export default {
    components: {
        AboutNavigator
    },

    async asyncData({ app, store }) {
        const { code } = app.i18n.localeProperties;
        try {
            const content = await store.dispatch('content/getContentBySlug', {
                params: { lng: code, slug: 'about-page' }
            });

            return { content };
        } catch (error) {
            console.error(error);
        }
    },

    data() {
        return {
            gallery: [
                {
                    id: 18,
                    file: 'nkmHixBTYe4WYWpZZwXz2lHZr.webp',
                    name: 'pobrane (1).jpeg',
                    thumbnail: 'QXNQ8G6SIONhzO6C9sQdLEPZY.webp'
                },
                {
                    id: 19,
                    file: 'vBWYwZFmVkF8yuZJFYN5IYGkW.webp',
                    name: 'pobrane (2).jpeg',
                    thumbnail: '2VQFv6crxewmNG6QeahjpiiOK.webp'
                },
                {
                    id: 20,
                    file: 'DsZJSqLPOBD6IpnvJQQNT9oPY.webp',
                    name: 'pobrane (3).jpeg',
                    thumbnail: 'nxuFMFi6BhGHGrQnkfX4QbO1K.webp'
                }
            ],
            index: null
        };
    },

    head() {
        return {
            title: `Zigong - ${this.content.title}`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'About'
                }
            ]
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
