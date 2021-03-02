<template>
    <div>
        <dl>
            <dt v-bind:class="{ active: slug === '' }">
                <nuxt-link :to="localePath(`${defaultPath}`)">{{
                    $t(`mainMenu.${defaultPageName}`)
                }}</nuxt-link>
            </dt>

            <dd
                v-for="item in productsPages"
                :key="item.name"
                v-bind:class="{ active: item.product.slug.includes(slug) && slug !== '' }"
            >
                <nuxt-link :to="localePath(`/p/${item.product.slug}`)">{{ item.name }}</nuxt-link>
            </dd>
        </dl>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        categorySlug: {
            type: String,
            default: ''
        },
        slug: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            defaultPath: '/products',
            defaultPageName: 'products'
        };
    },

    computed: {
        ...mapGetters({
            productsPages: 'products/getProducts'
        })
    }
};
</script>
