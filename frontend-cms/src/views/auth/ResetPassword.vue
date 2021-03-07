<template>
    <div>
        <p class="login-card-description">Password recovery</p>
        <form @keyup.enter="tryToReset">
            <div class="form-group">
                <label for="email" class="sr-only">New Password</label>
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
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch"
                />
                <small
                    v-if="passwordErrors.length > 0"
                    class="invalid-feedback"
                >
                    {{ passwordErrors[0] }}
                </small>

                <label for="email" class="sr-only">Confirm password</label>
                <input
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    v-model="password_confirmation"
                    class="form-control"
                    placeholder="confirm password"
                    :class="{
                        'is-invalid': $v.password_confirmation.$error
                    }"
                    @blur="$v.password_confirmation.$touch()"
                    :error-messages="passwordConfirmationErrors"
                    @input="$v.password_confirmation.$touch"
                />
            </div>
            <small
                v-if="passwordConfirmationErrors.length > 0"
                style="color:red"
            >
                {{ passwordConfirmationErrors[0] }}
            </small>
            <input
                name="login"
                id="login"
                class="btn btn-block login-btn mb-4"
                type="button"
                value="Login"
                v-on:click="tryToReset"
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
import { required, sameAs, minLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            token: null,
            password: '',
            password_confirmation: '',
            passwordChanged: false,
            incorrectToken: false
        };
    },

    validations: {
        password: {
            required,
            minLength: minLength(6),
            containDigit: v => {
                return /\d/.test(v);
            }
        },
        password_confirmation: {
            required,
            sameAsPassword: sameAs('password')
        }
    },

    computed: {
        passwordErrors() {
            const errors = [];
            if (!this.$v.password.$dirty) return errors;
            !this.$v.password.required &&
                errors.push('New Password is required.');
            !this.$v.password.minLength &&
                errors.push(
                    'New Password cannot contain less than 6 characters!'
                );
            !this.$v.password.containDigit &&
                errors.push('New Password must contain numbers and letters!');

            return errors;
        },

        passwordConfirmationErrors() {
            const errors = [];
            if (!this.$v.password_confirmation.$dirty) return errors;

            !this.$v.password_confirmation.required &&
                errors.push('Password Confirmation is required');
            !this.$v.password_confirmation.sameAsPassword &&
                errors.push(
                    'Password confirmation must be equal to New Password'
                );

            return errors;
        }
    },

    methods: {
        ...mapActions({
            resetPassword: 'auth/resetPassword'
        }),

        async tryToReset() {
            this.$v.$touch();

            if (this.$v.$invalid) {
                return;
            }

            try {
                await this.resetPassword({
                    token: this.$route.params.token,
                    password: this.password,
                    passwordRepeat: this.password_confirmation
                });

                this.passwordChanged = true;
                this.$toast.success('Password has been changed');
                this.$router.push('/login');
            } catch (error) {
                this.$toast.error(error);
            }
        }
    }
};
</script>
