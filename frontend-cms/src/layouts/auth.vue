<template>
    <main class="d-flex align-self-center min-vh-100 py-3 py-md-5">
        <div class="container">
            <div class="card login-card">
                <div class="row no-gutters">
                    <div class="col-md-5">
                        <img
                            :src="require('../assets/images/login-bg.webp')"
                            alt="login"
                            class="login-card-img"
                        />
                    </div>
                    <div class="col-md-7">
                        <div class="card-body">
                            <div class="brand-wrapper">
                                <!-- <img src="" alt="logo" class="logo" /> -->
                            </div>
                            <slot />
                            <nav class="login-card-footer-nav"></nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
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
