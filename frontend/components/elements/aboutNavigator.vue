<template>
    <div>
        <dl>
            <dt v-bind:class="{ active: slug === '' }">
                <nuxt-link :to="localePath(`${defaultPath}`)">{{
                    $t(`mainMenu.${defaultPageName}`)
                }}</nuxt-link>
            </dt>

            <dd
                v-for="item in aboutPages"
                :key="item.name"
                v-bind:class="{ active: item.slug.includes(slug) && slug !== '' }"
            >
                <nuxt-link :to="localePath(`${defaultPath}/${item.slug}`)">{{
                    item.name
                }}</nuxt-link>
            </dd>
        </dl>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    props: {
        slug: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            defaultPath: '/about',
            defaultPageName: 'about'
        };
    },

    computed: {
        ...mapGetters({
            aboutPages: 'about/getAllData'
        })
    }
};
</script>
