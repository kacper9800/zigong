<template>
    <div>
        <dl v-for="page in pagesData" :key="page.name">
            <dt v-bind:class="{ active: slug === '' }">
                <nuxt-link :to="localePath(`${page.path}`)">{{ page.name }}</nuxt-link>
            </dt>
            <dd
                v-for="subpage in page.subPages"
                :key="subpage.name"
                v-bind:class="{ active: subpage.path.includes(slug) && slug !== '' }"
            >
                <nuxt-link :to="localePath(`${subpage.path}`)">{{ subpage.name }}</nuxt-link>
            </dd>
        </dl>
    </div>
</template>
<script>
export default {
    props: {
        pagesData: {
            type: Array
        },
        slug: {
            type: String,
            default: ''
        }
    },

    data() {
        return {};
    }
};
</script>
