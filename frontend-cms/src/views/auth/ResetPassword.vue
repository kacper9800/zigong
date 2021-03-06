<template>
  <layout>
    <div v-if="incorrectToken" class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-pattern">
          <div class="card-body p-4">
            <div class="text-center w-75 m-auto">
              <router-link to="/">
                <span>
                  <!-- <img
                                        alt
                                        height="50"
                                        src="@assets/images/logo.png"
                                    /> -->
                </span>
              </router-link>
            </div>
            <div class="mt-3 text-center">
              <p class="text-muted mt-2">Incorrect Token</p>
              <router-link
                class="btn btn-block btn-primary waves-effect waves-light mt-3"
                tag="a"
                to="/login"
              >
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="passwordChanged" class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-pattern">
          <div class="card-body p-4">
            <div class="text-center w-75 m-auto">
              <router-link to="/">
                <span>
                  <img alt height="50" src="@assets/images/logo.png" />
                </span>
              </router-link>
            </div>
            <div class="mt-3 text-center">
              <p class="text-muted mt-2">
                Password has been changed.
              </p>
              <router-link
                class="btn btn-block btn-primary waves-effect waves-light mt-3"
                tag="a"
                to="/login"
              >
                Back to Home
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row d-flex justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card">
          <div class="card-body">
            <div class="text-center w-75 m-auto">
              <router-link to="/">
                <span>
                  <h3>Chutzlaaretz</h3>
                </span>
              </router-link>
            </div>
            <div class="card-title">Password change</div>
            <div class="custom-modal-text text-left">
              <form @submit.stop.prevent="tryToReset">
                <div class="form-group">
                  <label for="password">New password</label>
                  <input
                    v-model="password"
                    id="password"
                    class="form-control"
                    :class="{
                      'is-invalid': $v.password.$error,
                    }"
                    :error-messages="passwordErrors"
                    placeholder="New password"
                    type="password"
                    @blur="$v.password.$touch"
                    @input="$v.password.$touch"
                  />
                  <div
                    v-if="passwordErrors.length > 0"
                    class="invalid-feedback"
                  >
                    {{ passwordErrors[0] }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="password_confirmation"
                    >Password confirmation</label
                  >
                  <input
                    v-model="password_confirmation"
                    id="password_confirmation"
                    class="form-control"
                    :class="{
                      'is-invalid': $v.password_confirmation.$error,
                    }"
                    :error-messages="passwordConfirmationErrors"
                    placeholder="Password confirmation"
                    type="password"
                    @blur="$v.password_confirmation.$touch"
                    @input="$v.password_confirmation.$touch"
                  />
                  <div
                    v-if="passwordConfirmationErrors.length > 0"
                    class="invalid-feedback"
                  >
                    {{ passwordConfirmationErrors[0] }}
                  </div>
                </div>
                <button
                  class="btn btn-success waves-effect waves-light"
                  type="submit"
                >
                  Change password
                </button>
              </form>
            </div>
          </div>
          <!-- end card-body-->
        </div>
        <!-- end card-->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </layout>
</template>

<script>
import Layout from "@layouts/auth";
import { authMethods } from "@state/helpers";
import appConfig from "@src/app.config";
import { required, sameAs, minLength } from "vuelidate/lib/validators";

export default {
  page: {
    title: "Forget Password",
    meta: [
      {
        name: "description",
        content: `Forget Password to ${appConfig.title}`,
      },
    ],
  },
  components: { Layout },
  data() {
    return {
      token: null,
      password: "",
      password_confirmation: "",
      passwordChanged: false,
      incorrectToken: false,
    };
  },

  validations: {
    password: {
      required,
      minLength: minLength(6),
      containDigit: (v) => {
        return /\d/.test(v);
      },
    },
    password_confirmation: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },

  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("New Password is required.");
      !this.$v.password.minLength &&
        errors.push("New Password cannot contain less than 6 characters!");
      !this.$v.password.containDigit &&
        errors.push("New Password must contain numbers and letters!");

      return errors;
    },

    passwordConfirmationErrors() {
      const errors = [];
      if (!this.$v.password_confirmation.$dirty) return errors;

      !this.$v.password_confirmation.required &&
        errors.push("Password Confirmation is required");
      !this.$v.password_confirmation.sameAsPassword &&
        errors.push("Password confirmation must be equal to New Password");

      return errors;
    },
  },

  mounted() {
    this.checkRoute();
  },

  methods: {
    ...authMethods,

    async checkRoute() {
      try {
        await this.checkPasswordReset({
          token: this.$route.params.token,
        });
        this.incorrectToken = false;
      } catch (err) {
        console.error(err);
        this.incorrectToken = true;
      }
    },

    async tryToReset() {
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }

      try {
        await this.resetPassword({
          token: this.$route.params.token,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });
        this.passwordChanged = true;
      } catch (err) {
        let message = "";

        if (err.response.data.errors) {
          err.response.data.errors.forEach((error) => {
            message += error + ". ";
          });
        } else {
          message = "Something went wrong!";
        }

        this.$bvToast.toast(message, {
          title: "Error!",
          variant: "danger",
          solid: true,
        });
      }
    },
  },
};
</script>
