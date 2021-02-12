<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="carousel-wrapper">
                    <VueSlickCarousel v-bind="slickOptions">
                        <div
                            v-for="image in sliderImages"
                            :key="image"
                            class="img-wrapper"
                        >
                            <img :src="`${image}`" />
                        </div>
                    </VueSlickCarousel>
                </div>
            </div>
        </section>

        <section>
            <div class="container">
                <div class="row" v-for="item in 2" :key="item">
                    <div class="col">
                        <div class="cube">
                            <div class="cube__face cube__face--front">
                                <div class="vckit-trcflp-icon">
                                    <img
                                        src="https://zim-llc.com/wp-content/uploads/2020/06/powder-1.png"
                                        width="auto"
                                        height="110px"
                                    />
                                </div>
                                <div style="font-size: 17px; color: #244a8b">
                                    Powders
                                </div>
                                <div style="font-size: 13px; color: #666666">
                                    Powder products – for cemented carbide
                                    manufacturing, military equipment,
                                    electronic and medical industries.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="cube">
                            <div class="cube__face cube__face--front">
                                <div class="vckit-trcflp-icon">
                                    <img
                                        src="https://zim-llc.com/wp-content/uploads/2020/07/2-cemented-carbides-home-page.png"
                                        width="auto"
                                        height="110px"
                                    />
                                </div>
                                <div style="font-size: 17px; color: #244a8b">
                                    Cemented
                                </div>
                                <div style="font-size: 13px; color: #666666">
                                    Cemented carbides, tungsten and molybdenum
                                    formulated products, powders and finished
                                    tools.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col">
                        <div class="cube">
                            <div class="cube__face cube__face--front">
                                <div class="vckit-trcflp-icon">
                                    <img
                                        src="https://zim-llc.com/wp-content/uploads/2020/06/powder-1.png"
                                        width="auto"
                                        height="110px"
                                    />
                                </div>
                                <div style="font-size: 17px; color: #244a8b">
                                    Powders
                                </div>
                                <div style="font-size: 13px; color: #666666">
                                    Powder products – for cemented carbide
                                    manufacturing, military equipment,
                                    electronic and medical industries.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section service-2">
            <div class="container">
                <h1 class="title-color">Zigong International Marketing</h1>
                <div class="wpb_wrapper">
                    <p>
                        <strong>Zigong International Marketing (ZIM)</strong>
                        was established by Zigong Cemented Carbide Co., LTD
                        (ZGCC) in 2003 for the purpose of distributing Cemented
                        Carbide, Tungsten and Molybdenum
                        <strong
                            ><a href="https://zim-llc.com/products/"
                                >Products</a
                            ></strong
                        >
                        outside The People’s Republic of China. Established in
                        1965, we employ over 3,000 people at our facilities in
                        China. ZGCC and ZIM distribute more than 2,000 metric
                        tons of different products across a span of over 40
                        countries. ZGCC is one of the largest producers of
                        Cemented Carbide, Tungsten and Molybdenum products in
                        China. The company is in the top ten of the world as a
                        producer of these products. With over 50 years of
                        experience, we have built complete production lines from
                        raw materials to downstream products as well as have
                        provided our customers with a full range of materials.
                    </p>
                </div>
                <br />
                <hr />
            </div>
        </section>

        <section class="section about-page">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 col-sm-12">
                        <h2 class="title-color">
                            We are an ISO certified company
                        </h2>
                        <p>
                            <strong>ZGCC</strong> is an
                            <strong
                                ><a
                                    href="https://zim-llc.com/about/quality-certification/"
                                    >ISO Certified company</a
                                ></strong
                            >&nbsp;with ISO 9001, ISO 14001 and OHSAS-18001
                            certifications, providing quality control systems to
                            serve our customers with quality products and
                            services.
                        </p>
                    </div>
                    <div class="col-md-6 col-sm-12">
                        <h2 class="title-color">Locations</h2>

                        <p>
                            ZGCC has two offices in the Unites States of
                            America. One office is in Houston, Texas, and the
                            other in Willoughby Hills, Ohio. Both locations have
                            warehouses that have stock to provide customers with
                            timely delivery service.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="section about">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe
                                class="embed-responsive-item"
                                src="https://www.youtube.com/embed/41VsP5hgFFs?controls=0"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        </div>
                        <div class="section" />
                        <div class="section" />
                    </div>

                    <div class="col-lg-4">
                        <div class="about-content pl-4 mt-4 mt-lg-0">
                            <h4 class="title-color">
                                Zigong International Marketing NEWS
                            </h4>
                            <img
                                src="https://zim-llc.com/wp-content/uploads/2020/10/zigong-texas-1.png"
                                class="img-fluid"
                                alt="Responsive image"
                            />
                            <br />
                            <br />
                            <h3 class="title-color">Houston Location</h3>
                            <p>Dear Clients,</p>
                            <p>We have moved! Our new address is:</p>
                            <p>
                                Zigong International Marketing<br />
                                16504 Aldine Westfield Rd., Bldg. A<br />
                                Houston, TX 77032
                            </p>

                            <p>
                                Thank you for your business. Please feel free to
                                <strong
                                    ><a href="https://zim-llc.com/contact-us/"
                                        >contact us</a
                                    ></strong
                                >
                                with any questions.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'home',

    data() {
        return {
            slickOptions: {
                dots: true,
                dotsClass: 'slick-dots custom-dot-class',
                edgeFriction: 0.35,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                speed: 5000,
                autoplaySpeed: 2000
            },
            sliderImages: [
                'https://zim-llc.com/wp-content/uploads/2020/06/SLIDE1.jpg',
                'https://zim-llc.com/wp-content/uploads/2020/06/SLIDE2.jpg',
                'https://zim-llc.com/wp-content/uploads/2020/06/SLIDE3.jpg',
                'https://zim-llc.com/wp-content/uploads/2020/06/Slider-wmo.jpg',
                'https://zim-llc.com/wp-content/uploads/2020/06/SLIDE5.jpg'
            ]
        };
    },

    methods: {
        async logout() {
            await this.$auth.logout(/* .... */);
        }
    }
};
</script>
