<template>
    <div>
        <header-main />
        <div id="page-content">
            <nuxt />
        </div>
        <footer-main />
    </div>
</template>
<script>
import HeaderMain from '@/components/layout/header/MainHeader';
import FooterMain from '@/components/layout/footer/MainFooter';
import { mapActions } from 'vuex';

export default {
    components: {
        HeaderMain,
        FooterMain
    },

    watch: {
        '$i18n.locale'() {
            this.getAllAboutData({ lng: this.$i18n.locale });
            this.getAllResources({ lng: this.$i18n.locale, perPage: '10', order: 'ASC' });
        }
    },

    methods: {
        ...mapActions({
            getAllAboutData: 'about/getAllAboutData',
            getAllResources: 'resources/getResources'
        })
    }
};
</script>
