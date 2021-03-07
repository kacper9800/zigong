<template>
    <div>
        <p class="login-card-description">Password recovery</p>
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
            <input
                name="login"
                id="login"
                class="btn btn-block login-btn mb-4"
                type="button"
                value="Login"
                v-on:click="submitRecoveryPassword"
            />
        </form>
        <p class="login-card-footer-text">
            Don't have an account?
            <router-link to="/login" class="text-reset"
                >SingIn here</router-link
            >
        </p>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
    validations: {
        email: { required, email }
    },

    data() {
        return {
            email: ''
        };
    },

    methods: {
        ...mapActions({
            recoverPassword: 'auth/recoverPassword'
        }),

        async submitRecoveryPassword() {
            try {
                await this.recoverPassword({ email: this.email });

                this.$toast.success('Email has been send');

                this.$router.push('/login');
            } catch (error) {
                this.$toast.error(error);
            }
        }
    }
};
</script>
