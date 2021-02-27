<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="row align-items-center">
                    <div class="col-md-3 align-self-start">
                        <navigator :pagesData="pagesData" />
                    </div>

                    <div class="col-md-9 align-self-start">
                        <h1 class="text-color">{{ content.title }}</h1>

                        <div v-html="content.html" />

                        <hr />
                        <div class="row text-center text-lg-left">
                            <div
                                v-for="(image, imageIndex) in items"
                                :key="imageIndex"
                                @click="index = imageIndex"
                                class="col-lg-3 col-md-4 col-6"
                            >
                                <img class="img-fluid img-thumbnail" :src="image" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <CoolLightBox :items="items" :index="index" @close="index = null" :slideshow="false" />
        </section>
    </div>
</template>
<script>
import navigator from '~/components/elements/navigator';

export default {
    components: {
        navigator
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
            items: [
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768'
            ],
            index: null,
            pagesData: [
                {
                    path: '/about',
                    name: 'About',
                    subPages: [
                        { path: '/about/organization', name: 'Organization' },
                        { path: '/about/who-we-are', name: 'Who We Are' },
                        { path: '/about/our-facilities', name: 'Our Facilities' },
                        { path: '/about/capabilities', name: 'Capabilities' },
                        { path: '/about/credentials', name: 'Credentials' },
                        {
                            path: '/about/quality-certification',
                            name: 'quality-certification'
                        }
                    ]
                }
            ]
        };
    }
};
</script>
