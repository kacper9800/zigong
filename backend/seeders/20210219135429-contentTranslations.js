const di = require("../di");
const contentRepository = di.get("repositories.content");
const languageRepository = di.get("repositories.language");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const contentSlugs = await contentRepository.findAll();
    const pl = await languageRepository.findOne({
      where: { code: "pl" },
    });
    const en = await languageRepository.findOne({
      where: { code: "en" },
    });
    const ru = await languageRepository.findOne({
      where: { code: "ru" },
    });

    const homePage = findContentId(contentSlugs, "home-page");
    const productsPage = findContentId(contentSlugs, "products-page");
    const aboutPage = findContentId(contentSlugs, "about-page");
    const resources = findContentId(contentSlugs, "resources");

    const pages = {
      "home-page-pl": {
        languageId: pl.id,
        contentId: homePage,
        content: {
          promotionalImages: [
            {
              id: 1,
              thumbnail: "zzXU0U8vaFNaWi2LALV0oGbHX.webp",
              name: "SLIDE1.jpg",
              file: "bj1o1314i7LPDJInsXxpfQ6Tj.webp",
              mimetype: "jpeg",
              redirectTo: "products/powders",
            },
            {
              id: 2,
              thumbnail: "DS2BbhpV7CJrqeNz1DK25lQPq.webp",
              name: "SLIDE2.jpg",
              file: "6u60MeTjB8Mf1XPGVahQrkEoS.webp",
              mimetype: "jpeg",
              redirectTo: "products/cemented-carbides",
            },
            {
              id: 3,
              thumbnail: "5MIlZxVytmU89SG2gc2Kc0vEf.webp",
              name: "SLIDE3.jpg",
              file: "e1vMFwm4F2u9LZrN64QqdOJe8.webp",
              mimetype: "jpeg",
              redirectTo: "products/equipment-for-carbide-production",
            },
            {
              id: 4,
              thumbnail: "4tI5bBvirPi15hcRwKpoJfKF2.webp",
              name: "SLIDE5.jpg",
              file: "iZm3ChAxVq4dEH9HxEsOBYpHo.webp",
              mimetype: "jpeg",
              redirectTo: "products/hardfacing-materials",
            },
            {
              id: 5,
              thumbnail: "M6DxaUDNZiAvcvepMIC6iSiw5.webp",
              name: "Slider-wmo.jpg",
              file: "spDudw8tKWKzapw9XUPPbEJaI.webp",
              mimetype: "jpeg",
              redirectTo: "products/w-mo-products",
            },
          ],
          zim: {
            title: "Zigong International Marketing",
            html: `<p><strong>Zigong International Marketing (ZIM)</strong> została założona przez Zigong Cemented Carbide Co., LTD (ZGCC) w 2003 r. w celu dystrybucji produktów z węglika spiekanego, wolframu i molibdenu poza Chińską Republiką Ludową. 
            Założona w 1965 roku zatrudniamy ponad 3000 osób w naszych zakładach w Chinach. ZGCC i ZIM dystrybuują ponad 2000 ton metrycznych różnych produktów w ponad 40 krajach. ZGCC jest jednym z największych producentów wyrobów z węglika spiekanego, wolframu i molibdenu w Chinach. Firma znajduje się w pierwszej dziesiątce świata jako producent tych produktów. 
            Dzięki ponad 50-letniemu doświadczeniu zbudowaliśmy kompletne linie produkcyjne od surowców po produkty końcowe, a także zapewniliśmy naszym klientom pełną gamę materiałów.</p>`,
          },
          iso: {
            title: "Jesteśmy firmą posiadającą certyfikat ISO",
            html: `<p><strong>ZGCC</strong> to firma z <strong><a href="https://zim-llc.com/about/quality-certification/">certyfikatem ISO</a></strong>, posiadająca certyfikaty ISO 9001, ISO 14001 i OHSAS-18001,
             zapewniająca systemy kontroli jakości w celu zapewnienia naszym klientom wysokiej jakości produktów i usług.
        </p>`,
            locations: {
              title: "Lokalizacje",
              html: `<p>
              ZGCC ma dwa biura w Stanach Zjednoczonych Ameryki. Jedno biuro znajduje się w Houston w Teksasie, a drugie w Willoughby Hills w stanie Ohio. Obie lokalizacje mają magazyny, które mają zapasy, aby zapewnić klientom terminową obsługę dostaw.
          </p>`,
            },
            youtube: "https://www.youtube.com/embed/41VsP5hgFFs",
          },
          news: {
            title: "Zigong International Marketing AKTUALNOŚCI",
            html: `<div><h3 class="title-color">Houston Location</h3>
            <p>Dear Clients,</p> <p>Przeprowadziliśmy się! Nasz nowy adres to:</p> 
            <p>Zigong International Marketing<br>
            16504 Aldine Westfield Rd., Bldg. A<br>
            Houston, TX 77032</p> 
            <p>W przypadku jakichkolwiek pytań prosimy o
            <strong><a href="./contact-us">kontakt</a></strong>.</p>
            </div>`,
            image: {
              id: 6,
              thumbnail: "G1ASjM2JelgQhfROKB6yJTkNj.webp",
              name: "zigong-texas-1.png",
              file: "seya9EDRNFuyrMfid1TQ7ZsuS.webp",
              mimetype: "png",
            },
          },
        },
      },
      "home-page-en": {
        languageId: en.id,
        contentId: homePage,
        content: {
          promotionalImages: [
            {
              id: 1,
              thumbnail: "zzXU0U8vaFNaWi2LALV0oGbHX.webp",
              name: "SLIDE1.jpg",
              file: "bj1o1314i7LPDJInsXxpfQ6Tj.webp",
              mimetype: "jpeg",
              redirectTo: "products/powders",
            },
            {
              id: 2,
              thumbnail: "DS2BbhpV7CJrqeNz1DK25lQPq.webp",
              name: "SLIDE2.jpg",
              file: "6u60MeTjB8Mf1XPGVahQrkEoS.webp",
              mimetype: "jpeg",
              redirectTo: "products/cemented-carbides",
            },
            {
              id: 3,
              thumbnail: "5MIlZxVytmU89SG2gc2Kc0vEf.webp",
              name: "SLIDE3.jpg",
              file: "e1vMFwm4F2u9LZrN64QqdOJe8.webp",
              mimetype: "jpeg",
              redirectTo: "products/equipment-for-carbide-production",
            },
            {
              id: 4,
              thumbnail: "4tI5bBvirPi15hcRwKpoJfKF2.webp",
              name: "SLIDE5.jpg",
              file: "iZm3ChAxVq4dEH9HxEsOBYpHo.webp",
              mimetype: "jpeg",
              redirectTo: "products/hardfacing-materials",
            },
            {
              id: 5,
              thumbnail: "M6DxaUDNZiAvcvepMIC6iSiw5.webp",
              name: "Slider-wmo.jpg",
              file: "spDudw8tKWKzapw9XUPPbEJaI.webp",
              mimetype: "jpeg",
              redirectTo: "products/w-mo-products",
            },
          ],
          zim: {
            title: "Zigong International Marketing",
            html: `<p><strong>Zigong International Marketing (ZIM)</strong> was established by Zigong Cemented Carbide Co., LTD (ZGCC) in 2003 for the purpose of distributing Cemented Carbide, Tungsten and Molybdenum <strong><a href="https://zim-llc.com/products/">Products</a></strong> outside The People’s Republic of China. Established in 1965, we employ over 3,000 people at our facilities in China. ZGCC and ZIM distribute more than 2,000 metric tons of different products across a span of over 40 countries. ZGCC is one of the largest producers of Cemented Carbide, Tungsten and Molybdenum products in China. The company is in the top ten of the world as a producer of these products. With over 50 years of experience, we have built complete production lines from raw materials to downstream products as well as have provided our customers with a full range of materials.</p>`,
          },
          iso: {
            title: "We are an ISO certified company",
            html: `<p><strong>ZGCC</strong> is an
            <strong><a href="https://zim-llc.com/about/quality-certification/">ISO Certified company</a></strong>&nbsp;with ISO 9001, ISO 14001 and OHSAS-18001
            certifications, providing quality control systems to
            serve our customers with quality products and
            services.
        </p>`,
            locations: {
              title: "Locations",
              html: `<p>
              ZGCC has two offices in the Unites States of
              America. One office is in Houston, Texas, and the
              other in Willoughby Hills, Ohio. Both locations have
              warehouses that have stock to provide customers with
              timely delivery service.
          </p>`,
            },
            youtube: "https://www.youtube.com/embed/41VsP5hgFFs",
          },
          news: {
            title: "Zigong International Marketing NEWS",
            html: `<div><h3 class="title-color">Houston Location</h3>
            <p>Dear Clients,</p> <p>We have moved! Our new address is:</p> 
            <p>Zigong International Marketing<br>
            16504 Aldine Westfield Rd., Bldg. A<br>
            Houston, TX 77032</p> 
            <p>Thank you for your business. Please feel free to
            <strong><a href="https://zim-llc.com/contact-us/">contact us</a></strong>
            with any questions.</p>
            </div>`,
            image: {
              id: 6,
              thumbnail: "G1ASjM2JelgQhfROKB6yJTkNj.webp",
              name: "zigong-texas-1.png",
              file: "seya9EDRNFuyrMfid1TQ7ZsuS.webp",
              mimetype: "png",
            },
          },
        },
      },
      "home-page-ru": {
        languageId: ru.id,
        contentId: homePage,
        content: {
          promotionalImages: [
            {
              id: 1,
              thumbnail: "zzXU0U8vaFNaWi2LALV0oGbHX.webp",
              name: "SLIDE1.jpg",
              file: "bj1o1314i7LPDJInsXxpfQ6Tj.webp",
              mimetype: "jpeg",
              redirectTo: "products/powders",
            },
            {
              id: 2,
              thumbnail: "DS2BbhpV7CJrqeNz1DK25lQPq.webp",
              name: "SLIDE2.jpg",
              file: "6u60MeTjB8Mf1XPGVahQrkEoS.webp",
              mimetype: "jpeg",
              redirectTo: "products/cemented-carbides",
            },
            {
              id: 3,
              thumbnail: "5MIlZxVytmU89SG2gc2Kc0vEf.webp",
              name: "SLIDE3.jpg",
              file: "e1vMFwm4F2u9LZrN64QqdOJe8.webp",
              mimetype: "jpeg",
              redirectTo: "products/equipment-for-carbide-production",
            },
            {
              id: 4,
              thumbnail: "4tI5bBvirPi15hcRwKpoJfKF2.webp",
              name: "SLIDE5.jpg",
              file: "iZm3ChAxVq4dEH9HxEsOBYpHo.webp",
              mimetype: "jpeg",
              redirectTo: "products/hardfacing-materials",
            },
            {
              id: 5,
              thumbnail: "M6DxaUDNZiAvcvepMIC6iSiw5.webp",
              name: "Slider-wmo.jpg",
              file: "spDudw8tKWKzapw9XUPPbEJaI.webp",
              mimetype: "jpeg",
              redirectTo: "products/w-mo-products",
            },
          ],
          zim: {
            title: "Zigong International Marketing",
            html: `<p> <strong> Zigong International Marketing (ZIM) </strong> была основана компанией Zigong Cemented Carbide Co., LTD (ZGCC) в 2003 году с целью сбыта цементированного карбида, вольфрама и молибдена <strong> <a href = " https://zim-llc.com/products/">Products </a> </strong> за пределами Китайской Народной Республики. Основанная в 1965 году, на наших предприятиях в Китае работает более 3000 человек. ZGCC и ZIM распространяют более 2000 метрических тонн различной продукции в более чем 40 странах. ZGCC - один из крупнейших производителей цементированного карбида, вольфрама и молибдена в Китае. Компания входит в десятку мировых лидеров по производству данной продукции. Обладая более чем 50-летним опытом, мы построили полные производственные линии от сырья до последующих продуктов, а также предоставили нашим клиентам полный спектр материалов. </p>`,
          },
          iso: {
            title: "Мы сертифицированная ISO компания",
            html: `<p> <strong> ZGCC </strong> - это
            <strong> <a href="https://zim-llc.com/about/quality-certification/"> Сертифицированная компания ISO </a> </strong> & nbsp; с ISO 9001, ISO 14001 и OHSAS-18001
            сертификаты, обеспечивающие системы контроля качества для
            обслуживать наших клиентов качественной продукцией и
            Сервисы.
        </p>`,
            locations: {
              title: "Локации",
              html: `<p>
              ZGCC имеет два офиса в США.
              Америка. Один офис находится в Хьюстоне, штат Техас, и
              другой в Уиллоуби-Хиллз, штат Огайо. В обоих местах есть
              склады, у которых есть запасы для обеспечения клиентов
              своевременная доставка.
          </p>`,
            },
            youtube: "https://www.youtube.com/embed/41VsP5hgFFs",
          },
          news: {
            title: "НОВОСТИ Zigong International Marketing",
            html: `<div> <h3 class = "title-color"> Местоположение Хьюстон </h3>
            <p> Уважаемые клиенты, </p> <p> Мы переехали! Наш новый адрес: </p>
            <p> Международный маркетинг Zigong <br>
            16504 Aldine Westfield Rd., Bldg. А <br>
            Хьюстон, Техас 77032 </p>
            <p> Спасибо за ваш бизнес. Пожалуйста, не стесняйтесь
            <strong> <a href="https://zim-llc.com/contact-us/"> свяжитесь с нами </a> </strong>
            с любыми вопросами. </p>
            </div>`,
            image: {
              id: 6,
              thumbnail: "G1ASjM2JelgQhfROKB6yJTkNj.webp",
              name: "zigong-texas-1.png",
              file: "seya9EDRNFuyrMfid1TQ7ZsuS.webp",
              mimetype: "png",
            },
          },
        },
      },

      "products-page-pl": {
        languageId: pl.id,
        contentId: productsPage,
        content: {
          title: "Produkty",
          html: `<h6 class="title-color"><em><br>
        ZGCC jest jednym z największych producentów wyrobów z węglika spiekanego, wolframu i molibdenu w Chinach. 
        Firma znajduje się w pierwszej dziesiątce świata jako producent tych produktów.<br></em></h6><p>
        Dzięki ponad 50-letniemu doświadczeniu zbudowaliśmy kompletne linie produkcyjne od surowców po produkty końcowe, a także zapewnialiśmy naszym klientom pełną gamę materiałów.
       </p><p><em><strong>Zachęcamy do <a href="/pl/contact-us" class="">kontaktu</a> w celu uzyskania dalszych informacji na temat poniższych produktów.
       </strong></em></p>`,
        },
      },
      "products-page-en": {
        languageId: en.id,
        contentId: productsPage,
        content: {
          title: "Products",
          html: `<h6 class="title-color"><em><br>
         ZGCC is one of the largest producers of
         Cemented Carbide, Tungsten and Molybdenum
         products in China. The company is in the top
         ten of the world as a producer of these
         products.<br></em></h6><p>
         With over 50 years of experience we have built
         complete production lines from raw materials to
         downstream products as well as have provided our
         customers with a full range of materials.
        </p><p><em><strong>Feel free to
         <a href="/contact-us" class="">contact us</a>
          for more information on the products
          below.</strong></em></p>`,
        },
      },
      "products-page-ru": {
        languageId: ru.id,
        contentId: productsPage,
        content: {
          title: "Товары",
          html: `<h6 class="title-color"><em><br>
        ZGCC - один из крупнейших производителей
        Цементированный карбид, вольфрам и молибден
        товары в Китае. Компания в топе
        десять стран мира как производитель этих
        товары.<br></em></h6><p>
        Обладая более чем 50-летним опытом, мы построили
        полные производственные линии от сырья до
        последующие продукты, а также предоставили наши
        Заказчики с полным спектром материалов.
        </p><p><em><strong>Не стесняйтесь обращаться к нам для получения дополнительной информации о продуктах ниже.</strong></em></p>`,
        },
      },

      "about-page-pl": {
        languageId: pl.id,
        contentId: aboutPage,
        content: {
          title: "O nas",
          html: `<div class = "wpb_wrapper">
          <p> <strong> Zigong International Marketing (ZIM) </strong> została założona przez Zigong Cemented Carbide Co., LTD (ZGCC) w 2003 r. w celu dystrybucji węglika spiekanego, wolframu i molibdenu <strong> <a href = " https://zim-llc.com/products/">Products </a> </strong> poza Chińską Republiką Ludową. Założona w 1965 roku zatrudniamy ponad 3000 osób w naszych zakładach w Chinach. ZGCC i ZIM dystrybuują ponad 2000 ton metrycznych różnych produktów w ponad 40 krajach. ZGCC jest jednym z największych producentów wyrobów z węglika spiekanego, wolframu i molibdenu w Chinach. Firma znajduje się w pierwszej dziesiątce świata jako producent tych produktów. Dzięki ponad 50-letniemu doświadczeniu zbudowaliśmy kompletne linie od surowców do produktów końcowych, a także zapewniliśmy naszym klientom pełną gamę materiałów. </p>
          <p> ZGCC jest <strong> <a href="https://zim-llc.com/about/quality-certification/"> firmą z certyfikatem ISO </a> </strong> z ISO 9001, ISO 14001 i Certyfikaty OHSAS-18001, zapewniające systemy kontroli jakości, aby służyć naszym klientom wysokiej jakości produktami i usługami. </p>
          <p> ZIM ma <a href="https://zim-llc.com/contact-us/"> <strong> dwa biura </strong> </a> w Stanach Zjednoczonych. Jedno biuro znajduje się w Houston w Teksasie, a drugie w Willoughby Hills w stanie Ohio. Obie lokalizacje mają magazyny, które mają zapasy, aby zapewnić klientom terminową dostawę. </p>
          </div>`,
        },
      },

      "about-page-en": {
        languageId: en.id,
        contentId: aboutPage,
        content: {
          title: "About Us",
          html: `<div class="wpb_wrapper">
          <p><strong>Zigong International Marketing (ZIM)</strong> was established by Zigong Cemented Carbide Co., LTD (ZGCC) in 2003 for the purpose of distributing Cemented Carbide, Tungsten and Molybdenum <strong><a href="https://zim-llc.com/products/">Products</a></strong> outside The People’s Republic of China. Established in 1965, we employ over 3,000 people at our facilities in China. ZGCC and ZIM distribute more than 2,000 metric tons of different products across a span of over 40 countries. ZGCC is one of the largest producers of Cemented Carbide, Tungsten and Molybdenum products in China. The company is in the top ten of the world as a producer of these products. With over 50 years of experience, we have built complete lines from raw materials to downstream products as wll as have provided our customers with a full range of materials.</p>
          <p>ZGCC is an <strong><a href="https://zim-llc.com/about/quality-certification/">ISO Certified company</a></strong> with ISO 9001, ISO 14001 and OHSAS-18001 certifications, providing quality control systems to serve our customers with quality products and services.</p>
          <p>ZIM has <a href="https://zim-llc.com/contact-us/"><strong>two offices</strong></a> in the United States of America. One office is in Houston, Texas, and the other in Willoughby Hills, Ohio. Both locations have warehouses that have stock to provide customers with timely delivery service.</p>
          </div>`,
        },
      },

      "about-page-ru": {
        languageId: ru.id,
        contentId: aboutPage,
        content: {
          title: "О нас",
          html: `<div class = "wpb_wrapper">
          <p> <strong> Zigong International Marketing (ZIM) </strong> была основана Zigong Cemented Carbide Co., LTD (ZGCC) в 2003 году с целью сбыта цементированного карбида, вольфрама и молибдена <strong> <a href = "https: //zim-llc.com/products/">Products </a> </strong> за пределами Китайской Народной Республики. Основанная в 1965 году, на наших предприятиях в Китае работает более 3000 человек. ZGCC и ZIM распространяют более 2000 метрических тонн различной продукции в более чем 40 странах. ZGCC - один из ведущих производителей цементированного карбида, вольфрама и молибдена в Китае. Компания входит в десятку лидеров по производству данной продукции. Обладая более чем 50-летним опытом, мы построили полные линии от сырья до продуктов, а также предоставили нашим клиентам полный спектр материалов. </p>
          <p> ZGCC является <strong> <a href="https://zim-llc.com/about/quality-certification/"> сертифицированной компанией ISO </a> </strong> с ISO 9001, ISO 14001 и Сертификаты OHSAS-18001, обеспечивающие системы контроля качества для предоставления нашим клиентам качественных продуктов и услуг. </p>
          <p> ZIM имеет <a href="https://zim-llc.com/contact-us/"> <strong> два офиса </strong> </a> в США. Один офис находится в Хьюстоне, штат Техас, а другой в Уиллоуби-Хиллз, штат Огайо. В обоих филиалах есть склады, на которых можно обеспечить своевременную доставку. </p>
          </div>`,
        },
      },

      "resources-pl": {
        languageId: pl.id,
        contentId: resources,
        content: {
          title: "Zasoby",
          html: `Przeczytaj więcej o naszych produktach i usługach, które oferujemy, wraz ze szczegółowymi informacjami o produktach za pośrednictwem naszej biblioteki i plików PDF do pobrania. Zachęcamy do skorzystania z łącza do naszej sekcji Produkty, aby zapoznać się z pełną gamą produktów i usług. Broszurę dotyczącą możliwości naszej firmy można znaleźć tutaj.`,
        },
      },
      "resources-en": {
        languageId: en.id,
        contentId: resources,
        content: {
          title: "Resources",
          html: `Read more about our products and services that we offer along with specific product detailing through our library and downloadable PDF files. Feel free to follow the link to our Products section for our full range of products and services. Our company capability brochure can be Found Here.          `,
        },
      },
      "resources-ru": {
        languageId: ru.id,
        contentId: resources,
        content: {
          title: "Ресурсы",
          html: `Узнайте больше о наших продуктах и услугах, которые мы предлагаем, а также о конкретных продуктах в нашей библиотеке и загружаемых файлах PDF. Не стесняйтесь перейти по ссылке в наш раздел «Продукты», чтобы ознакомиться с полным спектром наших продуктов и услуг. Брошюру о возможностях нашей компании можно найти здесь.`,
        },
      },
    };

    const contents = getContents(pages);

    return queryInterface.bulkInsert("ContentTranslations", contents, {});
  },

  down: (queryInterface, Sequelize) => {},
};

const findContentId = (array, slug) => {
  return array.find((element) => element.slug == slug).id;
};

const getContents = (pages) => {
  const contents = [];

  for (const [key, value] of Object.entries(pages)) {
    const content = {
      contentId: value.contentId,
      languageId: value.languageId,
      value: JSON.stringify(value.content),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    contents.push(content);
  }

  return contents;
};
