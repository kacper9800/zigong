<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="row align-items-center">
                    <div class="col-md-3 align-self-start">
                        <navigator :pagesData="pagesData" :slug="slug" />
                    </div>

                    <div class="col-md-9 align-self-start">
                        <h1 class="text-color">{{ about.name }}</h1>

                        <div v-html="about.article" />
                        <div v-if="about.sections">
                            <div v-for="item in about.sections" :key="item.key">
                                <div class="row">
                                    <div class="col-sm-12 col-md">
                                        {{ item.article }}
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
                                                            'http://localhost:3001/thumbnails/' +
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
        </section>
        <CoolLightBox :items="items" :index="index" @close="index = null" :slideshow="false" />
    </div>
</template>
<script>
import navigator from '~/components/elements/navigator';

export default {
    components: {
        navigator
    },

    async asyncData({ app, store, params }) {
        const { slug } = params;

        return { slug };
    },

    data() {
        return {
            items: [
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
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
            ],

            about: {
                name: 'Our Organization',
                article: `<img loading="lazy" class="img-fluid" src="https://zim-llc.com/wp-content/uploads/2017/04/Organization-Structure-1.jpg" alt="" width="700" height="872" srcset="https://zim-llc.com/wp-content/uploads/2017/04/Organization-Structure-1.jpg 700w, https://zim-llc.com/wp-content/uploads/2017/04/Organization-Structure-1-241x300.jpg 241w, https://zim-llc.com/wp-content/uploads/2017/04/Organization-Structure-1-241x300@2x.jpg 482w" sizes="(max-width: 700px) 100vw, 700px">`
            }
        };
    }
};
</script>
