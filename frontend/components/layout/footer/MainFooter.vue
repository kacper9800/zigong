<template>
    <footer class="footer gray-bg" id="sticky-footer">
        <div class="container">
            <div class="footer-btm">
                <div class="row">
                    <div class="col-md-4 col-sm-6">
                        <p>16504 Aldine Westfield Rd., Bldg. A | Houston, TX 77032</p>
                        phone: 281-987-1001 fax: 281-987-1002
                    </div>

                    <div class="col-md-4 col-sm-6">
                        <p>Chardon Road | Willoughby Hills, OH 44094</p>
                        phone: 440-269-8160 fax: 440-269-8174
                    </div>

                    <div class="col-md-4 col-sm-12">
                        <p>
                            Email:
                            <a href="mailto:info@zim-llc.com" style="color: white"
                                >info@zim-llc.com</a
                            >
                            <br />
                            © Zigong International Marketing, LLC
                        </p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-lg-4">
                        <div
                            v-if="isVisible"
                            class="backtop js-scroll-trigger reveal"
                            v-on:click="scrollToTop"
                        >
                            <i class="icofont-long-arrow-up"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer',

    data() {
        return {
            isVisible: false
        };
    },

    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
    },

    methods: {
        scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        onScroll() {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

            if (currentScrollPosition >= 100) {
                this.isVisible = true;
            } else {
                this.isVisible = false;
            }
        }
    }
};
</script>
