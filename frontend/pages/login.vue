<template>
    <div class="container">
        <section class="page-title bg-1">
            <div class="overlay"></div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="block text-center">
                            <h1 class="text-capitalize mb-5 text-md">Login</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="contact-form-wrap section">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <form id="contact-form" class="contact__form">
                            <div class="form-group-2 mb-4">
                                <div class="form-group">
                                    <input
                                        name="email"
                                        id="email"
                                        type="email"
                                        class="form-control"
                                        placeholder="Email"
                                        v-model="formData.email"
                                    />
                                </div>
                            </div>
                            <div class="form-group-2 mb-4">
                                <div class="form-group">
                                    <input
                                        name="subject"
                                        id="subject"
                                        type="password"
                                        class="form-control"
                                        placeholder="Password"
                                        v-model="formData.password"
                                    />
                                </div>
                            </div>

                            <div class="text-center">
                                <button
                                    type="button"
                                    class="btn btn-main btn-round-full"
                                    @click="submitForm"
                                >
                                    LogIn
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    middleware: 'user',

    data() {
        return {
            formData: {
                email: '',
                password: ''
            },
            layout: {
                labelCol: { span: 4 },
                wrapperCol: { span: 14 }
            }
        };
    },
    methods: {
        async submitForm() {
            try {
                const { data: user } = await this.$auth.loginWith('local', {
                    data: {
                        email: this.formData.email,
                        password: this.formData.password
                    }
                });
            } catch (e) {
                console.error(e);
            }
        }
    }
};
</script>
