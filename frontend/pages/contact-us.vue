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
                                <form id="contact-form" class="contact__form" method="post">
                                    <div class="row">
                                        <div class="col-12">
                                            <div
                                                class="alert alert-success contact__msg"
                                                style="display: none"
                                                role="alert"
                                            >
                                                Your message was sent successfully.
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
                                                    :placeholder="$t('global.firstNameAndLastName')"
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
                                                    :placeholder="$t('global.email')"
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
                                                    :placeholder="$t('contact.messageSubject')"
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
                                                    :placeholder="$t('global.phone')"
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
                                        />
                                    </div>

                                    <div class="text-center">
                                        <input
                                            class="btn btn-main btn-round-full"
                                            name="submit"
                                            type="submit"
                                            :value="$t('global.buttons.send')"
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
export default {
    data() {
        return {};
    }
};
</script>
