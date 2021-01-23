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
            <div class="col-8">
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
                                <form
                                    id="contact-form"
                                    class="contact__form"
                                    method="post"
                                    action="mail.php"
                                >
                                    <div class="row">
                                        <div class="col-12">
                                            <div
                                                class="alert alert-success contact__msg"
                                                style="display: none"
                                                role="alert"
                                            >
                                                Your message was sent
                                                successfully.
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input
                                                    name="name"
                                                    id="name"
                                                    type="text"
                                                    class="form-control"
                                                    :placeholder="
                                                        $t(
                                                            'global.firstNameAndLastName'
                                                        )
                                                    "
                                                />
                                            </div>
                                        </div>

                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input
                                                    name="email"
                                                    id="email"
                                                    type="email"
                                                    class="form-control"
                                                    :placeholder="
                                                        $t('global.email')
                                                    "
                                                />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input
                                                    name="subject"
                                                    id="subject"
                                                    type="text"
                                                    class="form-control"
                                                    :placeholder="
                                                        $t(
                                                            'contact.messageSubject'
                                                        )
                                                    "
                                                />
                                            </div>
                                        </div>
                                        <div class="col-lg-6">
                                            <div class="form-group">
                                                <input
                                                    name="phone"
                                                    id="phone"
                                                    type="text"
                                                    class="form-control"
                                                    :placeholder="
                                                        $t('global.phone')
                                                    "
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="form-group-2 mb-4">
                                        <textarea
                                            name="message"
                                            id="message"
                                            class="form-control"
                                            rows="8"
                                            :placeholder="$t('contact.meaasge')"
                                        ></textarea>
                                    </div>

                                    <div class="text-center">
                                        <input
                                            class="btn btn-main btn-round-full"
                                            name="submit"
                                            type="submit"
                                            :value="$t('global.send')"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <div class="col-4">
                <section class="contact-form-wrap section">
                    <div class="row justify-content-center">
                        <div class="col-lg-10">
                            <div class="section-title text-center">
                                <p class="mb-5">
                                    Laboriosam exercitationem molestias beatae
                                    eos pariatur, similique, excepturi mollitia
                                    sit perferendis maiores ratione aliquam?
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
