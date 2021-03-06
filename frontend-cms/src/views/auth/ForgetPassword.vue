<template>
  <layout>
    <div v-if="emailSent" class="row justify-content-center">
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
              <p class="text-muted mt-2">
                An email has been sent. Please check for an email from company
                and click on the included link to reset your password.
              </p>
              <router-link
                class="btn btn-block btn-primary waves-effect waves-light mt-3"
                tag="a"
                to="/login"
                >Back to Home</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-pattern">
          <div class="card-body p-4">
            <div class="text-center w-75 m-auto">
              <router-link to="/">
                <span>
                  <img alt height="50" src="@assets/images/logo.png" />
                </span>
              </router-link>
              <p class="text-muted mb-4 mt-3">
                Enter your email address and we'll send you an email with
                instructions to reset your password.
              </p>
            </div>
            <form @submit.stop.prevent="tryToSendLink">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  v-model="email"
                  id="email"
                  class="form-control"
                  :class="{ 'is-invalid': $v.email.$error }"
                  :error-messages="emailErrors"
                  placeholder="Enter Email"
                  type="email"
                  @blur="$v.email.$touch"
                  @input="$v.email.$touch"
                />
                <div v-if="emailErrors.length > 0" class="invalid-feedback">
                  {{ emailErrors[0] }}
                </div>
              </div>
              <button
                class="btn btn-success btn-block waves-effect waves-light"
                type="submit"
              >
                Send Reset Password Link
              </button>
            </form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
        <div class="row mt-3">
          <div class="col-12 text-center">
            <p class="text-white-50">
              Already have account?
              <router-link class="text-white ml-1" tag="a" to="/login">
                <b>Log In</b>
              </router-link>
            </p>
          </div>
          <!-- end col -->
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </layout>
</template>

<script>
import Layout from "../../layouts/auth";
import { authMethods } from "@state/helpers";
import appConfig from "@src/app.config";
import { required, email } from "vuelidate/lib/validators";

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

  validations: {
    email: { required, email },
  },

  components: { Layout },

  data() {
    return {
      email: "",
      emailSent: false,
    };
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email is required.");

      return errors;
    },
  },

  methods: {
    ...authMethods,

    async tryToSendLink() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      try {
        await this.sendResetPasswordLink({
          email: this.email,
        });
        this.email = "";
        this.emailSent = true;
      } catch (err) {
        console.error(err);
        this.$bvToast.toast("Something went wrong!", {
          title: "Error!",
          variant: "danger",
          solid: true,
        });
      }
    },
  },
};
</script>
