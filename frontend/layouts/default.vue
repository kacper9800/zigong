<template>
    <div>
        <header-main />
        <nuxt />
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
