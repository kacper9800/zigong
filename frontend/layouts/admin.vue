<template>
    <div class="app">
        <!--  ToDo @Kacper-->
        //implement some of this layouts https://ant.design/components/layout/
        <AdminHeader />
        <div class="main">
            <Nuxt />
        </div>
    </div>
</template>

<script>
import AdminHeader from '@/components/layout/header/AdminHeader';

export default {
    components: {
        AdminHeader
    }
};

</script>
