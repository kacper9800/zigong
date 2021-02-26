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

export default {
    components: {
        HeaderMain,
        FooterMain
    }
};
</script>
