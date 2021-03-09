<template>
    <div class="container">
        <section class="section service-2">
            <div class="col-sm-12 col-md-8 offset-md-2" style="margin-top: 100px">
                <client-only>
                    <vuePdf
                        :src="src"
                        :page="currentPage"
                        @num-pages="pageCount = $event"
                        @page-loaded="currentPage = $event"
                    />
                </client-only>
                <div v-if="mounted">{{ currentPage }} / {{ pageCount }}</div>
                <button
                    v-if="backIsVisible"
                    class="btn-back btn-main"
                    type="button"
                    v-on:click="back()"
                >
                    <img src="@/assets/images/previous.svg" />
                </button>
                <button
                    v-if="nextIsVisible"
                    class="btn-next btn-main"
                    type="button"
                    v-on:click="next()"
                >
                    <img src="@/assets/images/next.svg" />
                </button>
                <a v-if="mounted" :href="src" class="btn btn-main" download> Download </a>
                <div v-if="!mounted" class="d-flex justify-content-center">
                    <img src="@/assets/images/loading.gif" width="30" height="30" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
var vuePdf;
if (process.browser) {
    vuePdf = require('vue-pdf').default;
}
import config from '@/config';

export default {
    components: {
        vuePdf
    },

    async asyncData({ params }) {
        const { slug } = params;
        const src = config.mediaBaseUrl + '/files/' + slug;

        return { src };
    },

    data() {
        return {
            currentPage: 1,
            pageCount: 1,
            mounted: false
        };
    },

    watch: {
        pageCount(e) {
            if (e) {
                this.mounted = true;
            }
        }
    },

    computed: {
        backIsVisible() {
            if (this.currentPage > 1 && this.currentPage <= this.pageCount) {
                return true;
            }

            return false;
        },

        nextIsVisible() {
            if (this.currentPage >= 1 && this.currentPage < this.pageCount) {
                return true;
            }

            return false;
        }
    },

    methods: {
        next() {
            this.currentPage += 1;
        },
        back() {
            this.currentPage -= 1;
        }
    }
};
</script>
<style scoped>
.btn-back {
    position: absolute;
    left: 0;
    top: 50%;
}
.btn-next {
    position: absolute;
    right: 0;
    top: 50%;
}
</style>
