<template>
    <div>
        <h1 class="page-header" style="color: #9e9e9e">
            Home page - {{ lng }}
            <img
                src="@assets/images/flags/en.png"
                @click="$router.push(`/content/${slug}/en`)"
                class="px-2"
            />
            <img
                src="@assets/images/flags/pl.png"
                @click="$router.push(`/content/${slug}/pl`)"
            />
            <img
                src="@assets/images/flags/ru.png"
                @click="$router.push(`/content/${slug}/ru`)"
                class="px-2"
            />
        </h1>

        <br />
        <a-row type="flex" v-if="mounted">
            <div class="col-md-9" style="padding: 10px">
                <content-section :data="content.zim" class="mt-3 mb-3" />
                <content-section :data="content.iso" />
                <content-section
                    :data="content.iso.locations"
                    class="mt-3 mb-3"
                />
                <content-section :data="content.news" class="mt-3 mb-3" />
            </div>
            <div class="col-md-3 align-self-start">
                <a-button
                    type="primary"
                    v-on:click="save()"
                    style="width:100%; margin-bottom:8px"
                >
                    Save
                </a-button>
                <br />
                <a-input
                    v-model="content.iso.youtube"
                    placeholder="YouTube URL"
                    allow-clear
                />
            </div>
        </a-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import ContentSection from '@components/elements/contentSection';

export default {
    components: {
        ContentSection
    },

    data() {
        return {
            lng: 'en',
            content: {},
            mounted: false,
            slug: 'home-page'
        };
    },

    async mounted() {
        const { lng } = this.$route.params;

        if (lng) {
            const data = await this.getContentBySlug({
                params: { lng, slug: this.slug }
            });

            this.content = JSON.parse(JSON.stringify(data));
            this.lng = lng;
        }
        this.mounted = true;
    },

    methods: {
        ...mapActions({
            getContentBySlug: 'content/getContentBySlug',
            update: 'content/update'
        }),

        save() {
            try {
                this.update({
                    lng: this.lng,
                    slug: this.slug,
                    value: JSON.stringify(this.content)
                });

                this.$toast.success('Content successful updated');
            } catch (error) {
                this.$toast.error(error);
            }
        }
    }
};
</script>
