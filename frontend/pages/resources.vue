<template>
    <div class="container">
        <section class="page-title bg-2">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="block text-center">
                            <h2 class="text-capitalize mb-5 text-lg"></h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="row">
            <div class="col-md-12 col-sm-12">
                <section class="contact-form-wrap section">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-10">
                                <div class="section-title text-center">
                                    <h2 class="text-md mb-2">{{ $t('mainMenu.resources') }}</h2>
                                    <div class="divider mx-auto my-4"></div>
                                    <div v-html="content.html" />
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-12 col-md-12 col-sm-12">
                            <div class="row">
                                <div
                                    v-for="item in resources.data"
                                    :key="item.id"
                                    class="col-md-4 col-sm-12 mt-4"
                                >
                                    <div class="resources-card card-body h-100">
                                        <h4>&nbsp;{{ item.categoryTranslation.name }}</h4>
                                        <div class="links">
                                            <p v-for="element in item.resource" :key="element.id">
                                                <nuxt-link
                                                    :to="localePath('/file/' + element.pdf.file)"
                                                    class="default-link"
                                                    >→ {{ element.name }}</nuxt-link
                                                >
                                            </p>
                                        </div>
                                        <div class="d-flex justify-content-center mt-3">
                                            <nuxt-link
                                                :to="localePath('/products/' + item.slug)"
                                                class="btn btn-main"
                                                >{{ $t(`global.buttons.learnMore`) }}</nuxt-link
                                            >
                                        </div>
                                    </div>
                                </div>

                                <div class="col-md-4 col-sm-12 mt-4">
                                    <div class="resources-card card-body h-100">
                                        <h4>&nbsp;Media</h4>

                                        <div class="embed-responsive embed-responsive-16by9">
                                            <iframe
                                                class="embed-responsive-item"
                                                src="https://www.youtube.com/embed/41VsP5hgFFs?controls=0"
                                                allowfullscreen
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import config from '@/config';

export default {
    async asyncData({ app, store }) {
        const { code } = app.i18n.localeProperties;
        try {
            const resources = await store.dispatch('resources/getResources', {
                lng: code,
                perPage: '10'
            });

            const content = await store.dispatch('content/getContentBySlug', {
                params: { lng: code, slug: 'resources' }
            });

            return { resources, content };
        } catch (error) {
            console.error(error);
        }
    },

    data() {
        return {};
    },

    head() {
        return {
            title: `Zigong - ${this.$t('mainMenu.resources')}`,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Description need to be updated'
                }
            ]
        };
    },

    computed: {
        baseUrl() {
            return config.mediaBaseUrl;
        }
    }
};
</script>
