<template></template>

<script>
export default {
    name: 'resources',
    async asyncData({ app, store, redirect }) {
        const { code } = app.i18n.localeProperties;
        // const { code } = app.i18n.localeProperties;
        // try {
        //     await store.dispatch('content/getContentBySlug', {
        //         params: { lng: code, slug: 'products-page' }
        //     });
        // } catch (error) {
        //     console.error(error);
        // }

        return redirect(`/${code}/error`);
    }
};
</script>
