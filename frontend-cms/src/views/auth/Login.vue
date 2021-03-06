<template>
    <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-form-item label="email">
            <a-input v-model="email" />
        </a-form-item>
        <a-form-item label="password">
            <a-input v-model="password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button
                v-on:click="submitLoginForm"
                type="primary"
                html-type="button"
            >
                Submit
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    page: {
        title: 'Log in',
        meta: [{ name: 'description', content: `Log in to zigong` }]
    },

    data() {
        return {
            email: '',
            password: ''
        };
    },

    methods: {
        ...mapActions({
            login: 'auth/login'
        }),
        async submitLoginForm() {
            try {
                await this.login({
                    email: this.email,
                    password: this.password
                });

                const redirectRoute =
                    this.$route.query.redirectFrom &&
                    this.$route.query.redirectFrom !== '/logout'
                        ? this.$route.query.redirectFrom
                        : { name: 'dashboard' };

                this.$router.push(redirectRoute);
            } catch (error) {
                console.error(error);
            }
        }
    }
};
</script>
