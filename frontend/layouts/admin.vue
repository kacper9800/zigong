<template>
    <a-layout id="components-layout-demo-top-side-2">
        <AdminHeader />
        <a-layout>
            <AdminSider />
            <a-layout style="padding: 0 24px 24px">
                <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>Home</a-breadcrumb-item>
                    <a-breadcrumb-item>List</a-breadcrumb-item>
                    <a-breadcrumb-item>App</a-breadcrumb-item>
                </a-breadcrumb>
                <a-layout-content
                    :style="{
                        background: '#fff',
                        padding: '24px',
                        margin: 0,
                        minHeight: '280px'
                    }"
                >
                    <Nuxt />
                </a-layout-content>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script>
import AdminHeader from '@/components/layout/header/AdminHeader';
import AdminSider from '@/components/layout/sider/AdminSider';

export default {
    data() {
        return {
            collapsed: false
        };
    },
    components: {
        AdminSider,
        AdminHeader
    }
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 28px 16px 0;
    float: left;
}
</style>
