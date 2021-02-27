<template>
    <a-layout id="components-layout-demo-fixed-sider">
        <AdminSider />
        <a-layout :style="{ marginLeft: '200px' }">
            <a-layout-header :style="{ background: '#fff', padding: 0 }">
                <AdminHeader />
            </a-layout-header>
            <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
                <div
                    :style="{
                        padding: '24px',
                        background: '#fff'
                    }"
                >
                    <Nuxt />
                </div>
            </a-layout-content>
            <AdminFooter />
        </a-layout>
    </a-layout>
</template>

<script>
import AdminHeader from '~/components/layout/header/AdminHeader';
import AdminSider from '~/components/layout/sider/AdminSider';
import AdminFooter from '~/components/layout/footer/AdminFooter';
export default {
    data() {
        return {
            collapsed: false
        };
    },
    components: {
        AdminFooter,
        AdminSider,
        AdminHeader
    }
};
</script>

<style scoped>
#components-layout-demo-fixed-sider .logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
}
</style>
