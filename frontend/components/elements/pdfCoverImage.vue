<template>
    <div
        v-if="item"
        class="row"
        :class="[item.files.length === 2 ? 'col-sm-12 col-md-6' : 'col-sm-12 col-md-3']"
    >
        <div
            v-for="pdf in item.files"
            :key="pdf.id"
            :class="[
                'align-self-start',
                item.files.length === 2 ? 'col-sm-6 col-md-6 px-1' : 'col-sm-12 col-md-12 px-0'
            ]"
        >
            <div v-if="pdf.thumbnail" class="hovereffect11">
                <img
                    class="col-lg-12 col-md-12"
                    :src="baseUrl + '/thumbnails/' + pdf.thumbnail"
                    alt="image"
                />

                <div
                    v-if="pdf.mimetype === 'pdf'"
                    class="overlay-img"
                    v-on:click="$router.push('/file/' + pdf.file)"
                />
                <div v-else class="overlay-img" />
                <div class="effect-caption">
                    <h2>> Read More</h2>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import config from '@/config';

export default {
    props: {
        item: {
            type: Object,
            default: {}
        }
    },

    computed: {
        baseUrl() {
            return config.mediaBaseUrl;
        }
    }
};
</script>
