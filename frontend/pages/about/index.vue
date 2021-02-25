<template>
    <div>
        <section class="section service-2">
            <div class="container" style="margin-top: 100px">
                <div class="row align-items-center">
                    <div class="col-md-3 align-self-start">
                        <navigator :pagesData="pagesData" />
                    </div>

                    <div class="col-md-9 align-self-start">
                        <h1 class="text-color">{{ about.name }}</h1>

                        <div v-html="about.article" />
                        <div v-if="about.sections">
                            <div v-for="item in about.sections" :key="item.key">
                                <div class="row">
                                    <div class="col-sm-12 col-md">
                                        {{ item.article }}
                                    </div>
                                    <div class="flex-column">
                                        <div class="row">
                                            <div
                                                v-for="file in item.files"
                                                :key="file.id"
                                                class="flex-column"
                                            >
                                                <nuxt-link to="/" class="nav-link dropdown-toggle"
                                                    ><img
                                                        class="thumbnailImage"
                                                        :src="
                                                            'http://localhost:3001/thumbnails/' +
                                                            file.thumbnail
                                                        "
                                                        alt="Responsive image"
                                                /></nuxt-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import navigator from '~/components/elements/navigator';

export default {
    components: {
        navigator
    },

    data() {
        return {
            items: [
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768',
                'https://pix10.agoda.net/hotelImages/1199068/-1/09cb9a2780bf41ad1e8f8a3d2e074754.jpg?s=1024x768'
            ],
            index: null,
            pagesData: [
                {
                    path: '/about',
                    name: 'About',
                    subPages: [
                        { path: '/about/organization', name: 'Organization' },
                        { path: '/about/who-we-are', name: 'Who We Are' },
                        { path: '/about/our-facilities', name: 'Our Facilities' },
                        { path: '/about/capabilities', name: 'Capabilities' },
                        { path: '/about/credentials', name: 'Credentials' },
                        {
                            path: '/about/quality-certification',
                            name: 'quality-certification'
                        }
                    ]
                }
            ],

            about: {
                name: 'About Us',
                article: `<div class="wpb_wrapper">
                            <p>
                                <strong>Zigong International Marketing (ZIM)</strong> was
                                established by Zigong Cemented Carbide Co., LTD (ZGCC) in 2003 for
                                the purpose of distributing Cemented Carbide, Tungsten and
                                Molybdenum
                                <strong
                                    ><a href="https://zim-llc.com/products/">Products</a></strong
                                >
                                outside The People’s Republic of China. Established in 1965, we
                                employ over 3,000 people at our facilities in China. ZGCC and ZIM
                                distribute more than 2,000 metric tons of different products across
                                a span of over 40 countries. ZGCC is one of the largest producers of
                                Cemented Carbide, Tungsten and Molybdenum products in China. The
                                company is in the top ten of the world as a producer of these
                                products. With over 50 years of experience, we have built complete
                                lines from raw materials to downstream products as wll as have
                                provided our customers with a full range of materials.
                            </p>
                            <p>
                                ZGCC is an
                                <strong
                                    ><a href="https://zim-llc.com/about/quality-certification/"
                                        >ISO Certified company</a
                                    ></strong
                                >
                                with ISO 9001, ISO 14001 and OHSAS-18001 certifications, providing
                                quality control systems to serve our customers with quality products
                                and services.
                            </p>
                            <p>
                                ZIM has
                                <a href="https://zim-llc.com/contact-us/"
                                    ><strong>two offices</strong></a
                                >
                                in the United States of America. One office is in Houston, Texas,
                                and the other in Willoughby Hills, Ohio. Both locations have
                                warehouses that have stock to provide customers with timely delivery
                                service.
                            </p>
                        </div>`,
                sections: [
                    {
                        key: '401e6553-f244-453e-92c6-a0578deeae17',
                        article: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
                        files: [
                            {
                                id: 51,
                                thumbnail: '1R1q6aiV3WHrMyMY6bDxBCP8s.png',
                                name: 'ZIM-Logo1.jpg',
                                description: null,
                                file: '6QqEc52ZiO7i7laaiHnBIKrrV.jpeg',
                                mimetype: 'jpeg'
                            }
                        ]
                    },
                    {
                        key: '401e6553-f244-453e-92c6-a0578deeae14',
                        article: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
                        files: [
                            {
                                id: 39,
                                thumbnail: 'gkDUYIG01YZN0tLM1zTh26YGs.png',
                                name: 'proforma_invoice.pdf',
                                description: null,
                                file: 'sQhQY6DEZqRKUa9cJtAaIYBHA.pdf',
                                mimetype: 'pdf'
                            }
                        ]
                    }
                ]
            }
        };
    }
};
</script>
