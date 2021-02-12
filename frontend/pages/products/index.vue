<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="row">
                    <div class="col-md-8">
                        <div class="wpb_wrapper">
                            <h1 class="title-color">Products</h1>
                            <h6 class="title-color">
                                <em
                                    ><br />
                                    ZGCC is one of the largest producers of
                                    Cemented Carbide, Tungsten and Molybdenum
                                    products in China. The company is in the top
                                    ten of the world as a producer of these
                                    products.<br />
                                </em>
                            </h6>
                            <p>
                                With over 50 years of experience we have built
                                complete production lines from raw materials to
                                downstream products as well as have provided our
                                customers with a full range of materials.
                            </p>
                            <p>
                                <em
                                    ><strong
                                        >Feel free to
                                        <nuxt-link
                                            :to="localePath('contact-us')"
                                            >contact us</nuxt-link
                                        >
                                        for more information on the products
                                        below.</strong
                                    ></em
                                >
                            </p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="wpb_wrapper" style="margin-top: 30px">
                            <h2 style="text-align: center" class="title-color">
                                Questions?
                            </h2>
                            <p style="text-align: center">
                                Do you have questions, need a quote? We have a
                                wide range of products, materials and supplies!
                            </p>
                        </div>
                        <div class="d-flex justify-content-center">
                            <nuxt-link
                                :to="localePath('contact-us')"
                                class="btn btn-main-2 btn-round-full"
                                >Contact US<i
                                    class="icofont-simple-right ml-2"
                                ></i
                            ></nuxt-link>
                        </div>
                    </div>
                </div>
                <div class="row"></div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'products'
};
</script>
