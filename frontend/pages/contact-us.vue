<template>
    <div class="container">
        <section class="page-title bg-1">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="block text-center">
                            <h2 class="text-capitalize mb-5 text-lg"></h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div class="row">
            <div class="col-md-8 col-sm-12">
                <section class="contact-form-wrap section">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-10">
                                <div class="section-title text-center">
                                    <h2 class="text-md mb-2">
                                        {{ $t('contact.heading') }}
                                    </h2>
                                    <div class="divider mx-auto my-4"></div>
                                    <p class="mb-5">
                                        {{ $t('contact.tip') }}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <form id="contact-form" class="contact__form">
                                    <div class="row">
                                        <div class="col-12">
                                            <div
                                                v-if="showSuccessMessage"
                                                class="alert alert-success contact__msg"
                                                role="alert"
                                            >
                                                {{ $t('global.messageSent') }}
                                            </div>

                                            <div
                                                v-if="showErrorMessage"
                                                class="alert alert-danger contact__msg"
                                                role="alert"
                                            >
                                                {{ message }}
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input
                                                    v-model="formData.firstAndLastName"
                                                    type="text"
                                                    class="form-control"
                                                    :placeholder="$t('global.firstNameAndLastName')"
                                                    :class="{
                                                        'is-invalid':
                                                            $v.formData.firstAndLastName.$error
                                                    }"
                                                    @blur="$v.formData.firstAndLastName.$touch()"
                                                />
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input
                                                    v-model="formData.email"
                                                    type="email"
                                                    class="form-control"
                                                    :placeholder="$t('global.email')"
                                                    :class="{
                                                        'is-invalid': $v.formData.email.$error
                                                    }"
                                                    @blur="$v.formData.email.$touch()"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input
                                                    v-model="formData.topic"
                                                    type="text"
                                                    class="form-control"
                                                    :placeholder="$t('contact.messageSubject')"
                                                    :class="{
                                                        'is-invalid': $v.formData.topic.$error
                                                    }"
                                                    @blur="$v.formData.topic.$touch()"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <masked-input
                                                    v-model="formData.phone"
                                                    :mask="[
                                                        /\d/,
                                                        /\d/,
                                                        /\d/,
                                                        '-',
                                                        /\d/,
                                                        /\d/,
                                                        /\d/,
                                                        '-',
                                                        /\d/,
                                                        /\d/,
                                                        /\d/
                                                    ]"
                                                    class="form-control"
                                                    type="tel"
                                                    :placeholder="$t('global.phone')"
                                                    :class="{
                                                        'is-invalid': $v.formData.phone.$error
                                                    }"
                                                    @blur="$v.formData.phone.$touch()"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group-2 mb-4">
                                        <textarea
                                            v-model="formData.message"
                                            class="form-control"
                                            rows="8"
                                            :placeholder="$t('contact.meaasge')"
                                            :class="{
                                                'is-invalid': $v.formData.message.$error
                                            }"
                                            @blur="$v.formData.message.$touch()"
                                        />
                                    </div>

                                    <div class="text-center">
                                        <input
                                            class="btn btn-main btn-round-full"
                                            name="submit"
                                            type="button"
                                            :value="$t('global.buttons.send')"
                                            @click="sendMessage()"
                                            :disabled="$v.$invalid"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-md-4 col-sm-12">
                <section class="contact-form-wrap section">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="section-title">
                                <div class="wpb_wrapper">
                                    <div class="wpb_wrapper">
                                        <h2 class="title-color text-center">Houston</h2>
                                        <p class="text-justify">
                                            16504 Aldine Westfield Rd., Bldg. A Houston, TX 77032
                                        </p>
                                        <p class="text-center">
                                            <strong>phone:</strong>
                                            <a href="">281-987-1001</a>
                                        </p>
                                        <p class="text-center">
                                            <strong>fax:</strong>
                                            <a href="">281-987-1002</a>
                                        </p>

                                        <p class="text-center">
                                            <strong
                                                ><a href="mailto:info@zim-llc.com"
                                                    >info@zim-llc.com</a
                                                ></strong
                                            >
                                        </p>
                                    </div>

                                    <div class="wpb_text_column wpb_content_element">
                                        <div class="wpb_wrapper">
                                            <h2 class="text-center">Cleveland</h2>
                                            <p class="text-justify">
                                                38500 Chardon Road Willoughby Hills, OH 44094
                                            </p>
                                            <p class="text-center">
                                                <strong
                                                    >phone:
                                                    <a href="tel:440-269-8160">440-269-8160</a>
                                                </strong>
                                            </p>

                                            <p class="text-center">
                                                <strong
                                                    >fax:
                                                    <a href="tel:440-269-8160">440-269-8174</a>
                                                </strong>
                                            </p>
                                            <p class="text-center">
                                                <strong
                                                    ><a href="mailto:info@zim-llc.com"
                                                        >info@zim-llc.com</a
                                                    ></strong
                                                >
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import MaskedInput from 'vue-text-mask';
import { mapActions } from 'vuex';

export default {
    components: {
        MaskedInput
    },

    validations: {
        formData: {
            firstAndLastName: { required, minLength: minLength(4) },
            email: { required, email },
            topic: { required, minLength: minLength(4) },
            phone: { required },
            message: { required, minLength: minLength(10) }
        }
    },

    data() {
        return {
            formData: {},
            showSuccessMessage: false,
            showErrorMessage: false,
            message: ''
        };
    },

    methods: {
        ...mapActions({
            send: 'contact/sendMessage'
        }),

        async sendMessage() {
            try {
                await this.send(this.formData);
                this.showSuccessMessage = true;
            } catch (error) {
                this.showErrorMessage = true;
                this.message = error;
                console.error(error);
            }
        }
    }
};
</script>
