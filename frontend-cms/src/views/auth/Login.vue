<template>
    <div>
        <p class="login-card-description">Sign into your account</p>
        <form @keyup.enter="submitLoginForm">
            <div class="form-group">
                <label for="email" class="sr-only">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    v-model="email"
                    class="form-control"
                    placeholder="Email address"
                    :class="{
                        'is-invalid': $v.email.$error
                    }"
                    @blur="$v.email.$touch()"
                />
            </div>
            <div class="form-group mb-4">
                <label for="password" class="sr-only">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="password"
                    class="form-control"
                    placeholder="password"
                    :class="{
                        'is-invalid': $v.password.$error
                    }"
                    @blur="$v.password.$touch()"
                />
            </div>
            <input
                name="login"
                id="login"
                class="btn btn-block login-btn mb-4"
                type="button"
                value="Login"
                v-on:click="submitLoginForm"
            />
        </form>
        <router-link to="/reset-password" class="forgot-password-link"
            >Forgot password?</router-link
        >
        <!-- <p class="login-card-footer-text">
            Don't have an account?
            <a href="#!" class="text-reset">Register here</a>
        </p> -->
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';

export default {
    validations: {
        email: { required },
        password: { required }
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
                this.$toast.success('Logged in');

                const redirectRoute =
                    this.$route.query.redirectFrom &&
                    this.$route.query.redirectFrom !== '/logout'
                        ? this.$route.query.redirectFrom
                        : { name: 'dashboard' };

                this.$router.push(redirectRoute);
            } catch (error) {
                this.$toast.error(error);
            }
        }
    }
};
</script>
