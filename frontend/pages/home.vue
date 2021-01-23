<template>
    <div>
        <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Home"
        />
        <a-button type="primary" @click="logout"> logout </a-button>
    </div>
</template>

<script>
export default {
    name: 'home',
    layout: 'admin',
    middleware: 'admin',

    methods: {
        async logout() {
            await this.$auth.logout(/* .... */);
        }
    }
};
</script>

<style scoped></style>
