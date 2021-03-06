<template>
    <div id="wrapper">
        <div class="content-page">
            <div class="content">
                <div class="container-fluid">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: this.$store ? this.$store.state.auth : {} || {}
        };
    },

    methods: {}
};
</script>
