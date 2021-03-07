const di = require("../di");
const aboutRepository = di.get("repositories.about");
const languageRepository = di.get("repositories.language");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const about = await aboutRepository.findAll();
    const pl = await languageRepository.findOne({
      where: { code: "pl" },
    });
    const en = await languageRepository.findOne({
      where: { code: "en" },
    });
    const ru = await languageRepository.findOne({
      where: { code: "ru" },
    });

    const organization = findAboutId(about, "organization");
    const whoWeAre = findAboutId(about, "who-we-are");
    const ourFacilities = findAboutId(about, "our-facilities");
    const capabilities = findAboutId(about, "capabilities");
    const credentials = findAboutId(about, "credentials");
    const qualityCertification = findAboutId(about, "quality-certification");
    const conflictFreeMinerals = findAboutId(about, "conflict-free-minerals");

    const gallery1 = [
      {
        id: 18,
        thumbnail: "QXNQ8G6SIONhzO6C9sQdLEPZY.webp",
        name: "pobrane (1).jpeg",
        file: "nkmHixBTYe4WYWpZZwXz2lHZr.webp",
        mimetype: "jpeg",
      },
      {
        id: 19,
        thumbnail: "2VQFv6crxewmNG6QeahjpiiOK.webp",
        name: "pobrane (2).jpeg",
        file: "vBWYwZFmVkF8yuZJFYN5IYGkW.webp",
        mimetype: "jpeg",
      },
      {
        id: 20,
        thumbnail: "nxuFMFi6BhGHGrQnkfX4QbO1K.webp",
        name: "pobrane (3).jpeg",
        file: "DsZJSqLPOBD6IpnvJQQNT9oPY.webp",
        mimetype: "jpeg",
      },
    ];

    const gallery2 = [
      {
        id: 21,
        thumbnail: "0eD2nz5MGIOwCIJTs8iBbZnNZ.webp",
        name: "pobrane (1).jpeg",
        file: "MaC2A5L4WSK1vkxXHfXyyTOvg.webp",
        mimetype: "jpeg",
      },
      {
        id: 22,
        thumbnail: "iCYM2zE9Gf2wYANU0QBRZwvIF.webp",
        name: "pobrane (2).jpeg",
        file: "0NeOUqAQtHXaIh19hTF15myzO.webp",
        mimetype: "jpeg",
      },
      {
        id: 23,
        thumbnail: "sNXEkQrEZcWhowYhJ3wD3Q0sj.webp",
        name: "pobrane (3).jpeg",
        file: "Oi27eIf51BD1yJerU6XV9pF8d.webp",
        mimetype: "jpeg",
      },
      {
        id: 26,
        thumbnail: "FGgbwsGiTqIF5G5iUrXmcoRN2.webp",
        name: "pobrane (4).jpeg",
        file: "wm282jpArZmFBR1rOay701gXj.webp",
        mimetype: "jpeg",
      },
      {
        id: 27,
        thumbnail: "hs4ytt8R4yZWhwenA8fEw3rBS.webp",
        name: "pobrane (5).jpeg",
        file: "9USPWJ0fLoTVXjylQUN8ec8Hh.webp",
        mimetype: "jpeg",
      },
      {
        id: 24,
        thumbnail: "i2Udl04q0Gxi9rT6xVyahGZhV.webp",
        name: "pobrane (6).jpeg",
        file: "SM7MiX1jvqdClyll5HWZ9Eo3k.webp",
        mimetype: "jpeg",
      },
      {
        id: 29,
        thumbnail: "eWcvUuZ7Ck5nYcTwTjo54IoNt.webp",
        name: "pobrane (7).jpeg",
        file: "7kuZrYN2ZJa3zv8ArnebP0YjH.webp",
        mimetype: "jpeg",
      },
      {
        id: 25,
        thumbnail: "IpLQaObCrXBZJ34vrqN9aZfbW.webp",
        name: "pobrane (8).jpeg",
        file: "rCrTtH00o7jX9z33ZJknJRcfD.webp",
        mimetype: "jpeg",
      },
      {
        id: 28,
        thumbnail: "EYWpzlJo6tK6cN3RcakpWk0br.webp",
        name: "pobrane.jpeg",
        file: "uXAHiYZlEnjOwiNUC5FE4wBYX.webp",
        mimetype: "jpeg",
      },
    ];

    const certifications = [
      {
        id: 31,
        thumbnail: "hnJbTg33RBpgMhtQ5qd4YpiYl.webp",
        name: "CNAS-1-1.pdf",
        description: "CNAS",
        file: "JGzM98fs0qrxXItGTcpnLFpng.pdf",
        mimetype: "pdf",
      },
      {
        id: 30,
        thumbnail: "gZruu7TmZgpBEXfX5eHiW7aJj.webp",
        name: "ISO-9001-1.pdf",
        description: "ISO-9001",
        file: "M3bSlHoZ1fqOzpppIiVrv7fro.pdf",
        mimetype: "pdf",
      },
      {
        id: 33,
        thumbnail: "Y1ehJrAY4BWnwFKogsOh9l2tF.webp",
        name: "ISO-14001-2.pdf",
        description: "ISO-14001",
        file: "tLRAJWlqmzOXYsGi6wETDZF2Q.pdf",
        mimetype: "pdf",
      },
      {
        id: 32,
        thumbnail: "gIdWVSS72WuU2qyHlZfN04pda.webp",
        name: "ISO-45001-1.pdf",
        description: "ISO-45001",
        file: "5I3mLvVmTDx5MO52vQ1F9ptzi.pdf",
        mimetype: "pdf",
      },
    ];

    const pages = {
      "organization-pl": {
        languageId: pl.id,
        aboutId: organization,
        name: "Organizacja",
        jsonData: {
          title: "Nasza organizacja",
          article:
            '<img class="img-fluid" src="http://localhost:3001/s720/muXYiOSIFbnGOplvHROGE0WVF.webp">',
        },
      },
      "organization-en": {
        languageId: en.id,
        aboutId: organization,
        name: "Organization",
        jsonData: {
          title: "Our Organization",
          article:
            '<img class="img-fluid" src="http://localhost:3001/s720/muXYiOSIFbnGOplvHROGE0WVF.webp">',
        },
      },
      "organization-ru": {
        languageId: ru.id,
        aboutId: organization,
        name: "Oрганизация",
        jsonData: {
          title: "Наша организация",
          article:
            '<img class="img-fluid" src="http://localhost:3001/s720/muXYiOSIFbnGOplvHROGE0WVF.webp">',
        },
      },

      "who-we-are-pl": {
        languageId: pl.id,
        aboutId: whoWeAre,
        name: "Kim jesteśmy",
        jsonData: {
          title: "Kim jesteśmy",
          article:
            '<div>\n  <div class = "wpb_wrapper">\n<p>\n<span style = "color: # af2828"> → </span> Zigong International Marketing to\n      spółka zależna Zigong Cemented Carbide Co., Ltd.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> ZGCC jest głównym członkiem Chin\n      Minmetals Group, która jest jedną z 500 największych firm na świecie.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> To był pierwszy projekt i\n      zbudował duże przedsiębiorstwa produkujące węgliki spiekane w Chinach.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> Jesteśmy niezawodnym dostawcą\n      materiały twarde o zaawansowanych światowych poziomach i ich zastosowaniu\n      usługi.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> ZGCC zajmuje pozycję lidera\n      u producenta produktów wolframu i molibdenu w Chinach.\n    </p>\n  </div>\n</div>\n<div>\n  <div class = "wpb_wrapper">\n    <h1 class="text-color"> Obsługa klienta </h1>\n    <p>\n      <span style = "color: # af2828"> → </span> <strong> WSPARCIE: </strong> Nasz\n      Profesjonalny zespół sprzedaży i zespół obsługi technicznej pozostają w kontakcie\n      nasi klienci. Zapewniamy niezbędne wsparcie, aby spełnić Twoje wymagania\n      wymagania dotyczące produktu.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> <strong> INWENTARYZACJA: </strong> Zachowujemy\n      niezbędne zapasy i mamy centra dystrybucyjne w każdej głównej\n      rynek regionalny, aby zapewnić naszym klientom szybkie zmiany.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span>\n      <strong> SUKCES + WZROST: </strong> Nasi różnorodni kluczowi klienci odgrywają ważną rolę\n      ważną rolę w każdej globalnej dziedzinie gospodarczej. Współpracujemy z Tobą, aby Ci pomóc\n      rozwijasz swoją firmę. <strong> <br /> </strong>\n    </p>\n  </div>\n</div>\n<div>\n  <div class = "wpb_wrapper">\n    <h2 class="text-color"> Co zapewniamy naszym klientom </h2>\n    <p>\n      <em> <silny> Naszymi klientami są nasi klienci. Dążymy do ustanowienia długoterminowej\n          relacje z naszymi klientami i uczynienie ZGCC / ZIM ich pierwszym\n          wybór naszych produktów. </ strong> </ em>\n    </p>\n    <p>\n      Naszą misją jest dostarczanie naszym klientom wysokiej jakości produktów i usług.\n      Współpracujemy z naszymi klientami, aby pomóc im osiągnąć ich cele i zapewnić im wsparcie\n      cały proces produkcyjny. Jako odpowiedzialne przedsiębiorstwo pracujemy dla\n      zmaksymalizuj swój potencjał biznesowy i cele biznesowe. Naszym celem jest\n      stać się wiodącym producentem i dostawcą wszystkich materiałów cementowanych\n      Artykuły z węglika, wolframu i molibdenu na całym świecie pod kierownictwem\n      China Minmentals Group.\n    </p>\n    <p>\n      Naszym celem jest uczynienie ZGCC wiodącego dostawcy usług naukowych i badawczych\n      postęp w nowej dziedzinie materiałów i utrzymanie ZGCC jako wykwalifikowanego\n      dostawca skutecznych rozwiązań dla naszych klientów. Patrzymy w przyszłość\n      i dążymy do przyszłego postępu i stale dążą do jego utrzymania\n      nasza pozycja lidera w dziedzinie węglików spiekanych, materiałów napawanych,\n      Produkty wolframu i molibdenu i ich rynek. Nasz przyszły sukces\n      spoczywa na fundamencie zbudowanym przez naszych pracowników. Dokładamy wszelkich starań, aby\n      stworzyć środowisko, w którym mogą osiągnąć swoje cele i nagrodzić\n      ich sukcesy. Utrzymujemy również ZGCC jako przedsiębiorstwo, które ma silną pozycję\n      odpowiedzialność społeczna za naszą społeczność.\n    </p>\n  </div>\n</div>',
        },
      },
      "who-we-are-en": {
        languageId: en.id,
        aboutId: whoWeAre,
        name: "Who we are",
        jsonData: {
          title: "Who we are",
          article:
            '<div>\n  <div class="wpb_wrapper">\n    <p>\n      <span style="color: #af2828">→</span> Zigong International Marketing is a\n      subsidiary of Zigong Cemented Carbide Co., Ltd.\n    </p>\n    <p>\n      <span style="color: #af2828">→</span> ZGCC is a core member of China\n      Minmetals Group, which is one of the world’s top 500 companies.\n    </p>\n    <p>\n      <span style="color: #af2828">→</span> It was the first home-designed and\n      built large-scale cemented carbide manufacturing enterprises in China.\n    </p>\n    <p>\n      <span style="color: #af2828">→</span> We are a reliable supplier of\n      hard-facing materials with advanced world levels and their application\n      services.\n    </p>\n    <p>\n      <span style="color: #af2828">→</span> ZGCC holds the leadership position\n      in the Tungsten and Molybdenum product manufacturer in China.\n    </p>\n  </div>\n</div>\n<div>\n  <div class="wpb_wrapper">\n    <h1 class="text-color">Customer Service</h1>\n    <p>\n      <span style="color: #af2828">→</span> <strong>SUPPORT:</strong> Our\n      professional sales team and technical service team keep in contact with\n      our customers. We provide the necessary support to meet your specific\n      product requirements.\n    </p>\n    <p>\n      <span style="color: #af2828">→</span> <strong>INVENTORY:</strong> We keep\n      necessary inventory and we have distribution centers in every main\n      regional market to provide our customers with a fast turn-around.\n    </p>\n    <p>\n      <span style="color: #af2828">→</span>\n      <strong>SUCCESS + GROWTH:</strong> Our diverse key customers play an\n      important role in every global economic field. We work with you to help\n      you grow your business.<strong><br /> </strong>\n    </p>\n  </div>\n</div>\n<div>\n  <div class="wpb_wrapper">\n    <h2 class="text-color">What We Provide to Our Customers</h2>\n    <p>\n      <em\n        ><strong\n          >Our customers are our focus. We strive to establish long term\n          relationships with our customers and to make ZGCC/ZIM their first\n          choice for our products.</strong\n        ></em\n      >\n    </p>\n    <p>\n      Our mission is to provide our customers with quality products and service.\n      We partner with our customers to help them reach their goals and support\n      the entire manufacturing process. As a responsible enterprise, we work to\n      maximize your business potential and business goals. Our goals is to\n      become the leading producer and supplier of all materials of Cemented\n      Carbide, Tungsten and Molybdenum articles globally under hte leadership of\n      the China Minmentals Group.\n    </p>\n    <p>\n      We excel to make ZGCC a leading provider of scientific and research\n      progress in the new material field, and retain ZGCC as a qualified\n      supplier of effective solutions to our customers. We look to the future\n      and strive for future progress, and are constantly striving to maintain\n      our leadership position within Cemented Carbide, hard-facing material,\n      Tungsten and Molybdenum products and their market. Our future success\n      rests upon the foundation built by our employees. We make an effort to\n      create an environment where they can accomplish their goals and reward\n      their successes. We also keep ZGCC as an enterprise that has a strong\n      social responsibility to our community.\n    </p>\n  </div>\n</div>\n',
        },
      },
      "who-we-are-ru": {
        languageId: ru.id,
        aboutId: whoWeAre,
        name: "Кто мы",
        jsonData: {
          title: "Кто мы",
          article:
            '<div>\n  <div class = "wpb_wrapper">\n  <p>\n      <span style = "color: # af2828"> → </span> Zigong International Marketing - это\n      дочерняя компания Zigong Cemented Carbide Co., Ltd.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> ZGCC является основным членом Китая\n      Minmetals Group - одна из 500 крупнейших компаний мира.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> Это была первая домашняя\n      построил в Китае крупные предприятия по производству цементированного карбида.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> Мы надежный поставщик\n      наплавочные материалы с продвинутым мировым уровнем и их применение\n      Сервисы.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> ZGCC занимает лидирующую позицию\n      у производителя продуктов из вольфрама и молибдена в Китае.\n    </p>\n  </div>\n</div>\n<div>\n  <div class = "wpb_wrapper">\n    <h1 class="text-color"> Служба поддержки </h1>\n    <p>\n      <span style = "color: # af2828"> → </span> <strong> ПОДДЕРЖКА: </strong> Наша\n      профессиональная команда продаж и команда технического обслуживания поддерживают связь с\n      наши клиенты. Мы предоставляем необходимую поддержку для удовлетворения ваших конкретных требований.\n      требования к продукту.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span> <strong> ИНВЕНТАРЬ: </strong> Мы сохраняем\n      необходимый инвентарь, и у нас есть распределительные центры во всех основных\n      региональный рынок, чтобы обеспечить нашим клиентам быструю окупаемость.\n    </p>\n    <p>\n      <span style = "color: # af2828"> → </span>\n      <strong> УСПЕХ + РАЗВИТИЕ. </strong> Наши разнообразные ключевые клиенты играют\n      важную роль во всех областях мировой экономики. Мы работаем с вами, чтобы помочь\n      вы развиваете свой бизнес. <strong> <br /> </strong>\n    </p>\n  </div>\n</div>\n<div>\n  <div class = "wpb_wrapper">\n    <h2 class="text-color"> Что мы предлагаем нашим клиентам </h2>\n    <p>\n      <эм\n        > <сильный\n          > Наши клиенты - наша цель. Мы стремимся к долгосрочному\n          отношения с нашими клиентами и сделать ZGCC / ZIM их первым\n          выбор для нашей продукции.\n        > </ em\n      >\n    </p>\n    <p>\n      Наша миссия - предоставлять нашим клиентам качественные продукты и услуги.\n      Мы сотрудничаем с нашими клиентами, чтобы помочь им достичь своих целей и поддержать\n      весь производственный процесс. Как ответственное предприятие мы работаем, чтобы\n      максимизировать свой бизнес-потенциал и бизнес-цели. Наша цель -\n      стать ведущим производителем и поставщиком всех материалов цементной\n      Изделия из карбида, вольфрама и молибдена во всем мире под руководством\n      Китайская группа Minmentals.\n    </p>\n    <p>\n      Мы стремимся сделать ZGCC ведущим поставщиком научных и исследовательских услуг.\n      прогресс в области новых материалов, и сохранить ZGCC в качестве квалифицированного\n      поставщик эффективных решений для наших клиентов. Мы смотрим в будущее\n      и стремимся к будущему прогрессу, и постоянно стремимся поддерживать\n      наше лидирующее положение в области цементированного карбида, твердосплавного материала,\n      Продукция из вольфрама и молибдена и их рынок. Наш будущий успех\n      опирается на фундамент, построенный нашими сотрудниками. Мы стараемся\n      создать среду, в которой они могут достичь своих целей и вознаградить\n      свои успехи. Мы также сохраняем ZGCC как предприятие с сильным\n      социальная ответственность перед нашим сообществом.\n    </p>\n  </div>\n</div>',
        },
      },
      "our-facilities-pl": {
        languageId: pl.id,
        aboutId: ourFacilities,
        name: "Nasze obiekty",
        jsonData: {
          title: "Nasze obiekty",
          article:
            '<div>\n   <p>\n     Nasze biura sprzedaży i centra dystrybucyjne znajdują się w dużych miastach w Chinach\n     w tym Pekin, Szanghaj i Kanton, a także nasze biura w\n     <strong> <a href="https://zim-llc.com/contact-us/"> Stany Zjednoczone </a> </strong>, które\n     zawierać\n     <silny\n       > <a href="https://zim-llc.com/contact-us/"> Ohio i Teksas. </a> </ strong\n     >\n   </p>\n   <p>\n     Nasze produkty są sprzedawane w Chinach, Japonii, Korei, Azji Południowo-Wschodniej i krajach\n     Bliski Wschód, w całej Europie oraz w Ameryce Północnej i Południowej.\n   </p>\n</div>',
          gallery: gallery1,
        },
      },
      "our-facilities-en": {
        languageId: en.id,
        aboutId: ourFacilities,
        name: "Our Facilities",
        jsonData: {
          title: "Our Facilities",
          article:
            '<div>\n  <p>\n    Our sales offices and distribution centers are in large cities in China\n    including Beijing, Shanghai and Guangzhou, as well as our offices in the\n    <strong><a href="https://zim-llc.com/contact-us/">USA,</a> </strong>which\n    include\n    <strong\n      ><a href="https://zim-llc.com/contact-us/">Ohio and Texas.</a></strong\n    >\n  </p>\n  <p>\n    Our products are sold throughout China, Japan, Korea, Southeast Asia and the\n    Middle East, across Europe, and North and South America.\n  </p>\n</div>\n',
          gallery: gallery1,
        },
      },
      "our-facilities-ru": {
        languageId: ru.id,
        aboutId: ourFacilities,
        name: "Наши объекты",
        jsonData: {
          title: "Наши объекты",
          article:
            '<div>\n   <p>\n     Наши офисы продаж и дистрибьюторские центры находятся в крупных городах Китая.\n     включая Пекин, Шанхай и Гуанчжоу, а также наши офисы в\n     <strong> <a href="https://zim-llc.com/contact-us/"> США </a> </strong>, которые\n     включают\n     <сильный\n       > <a href="https://zim-llc.com/contact-us/"> Огайо и Техас. </a> </ strong\n     >\n   </p>\n   <p>\n     Наши продукты продаются в Китае, Японии, Корее, Юго-Восточной Азии и в других странах.\n     Ближний Восток, Европа, Северная и Южная Америка.\n   </p>\n</div>',
          gallery: gallery1,
        },
      },

      "capabilities-pl": {
        languageId: pl.id,
        aboutId: capabilities,
        name: "Możliwości",
        jsonData: {
          title: "Możliwości ZGCC / ZIM",
          article:
            "<div>\n   <p>\n     Ponad 3000 wykwalifikowanych pracowników i profesjonalnych zespołów skupiło się na platformie\n     produkcja od ponad 50 lat. Posiadamy krajową certyfikowaną inspekcję\n     Centrum. Obejmujemy surowce do wykończenia części dla spójności,\n     powtarzalność i wyższość, które są gwarantowane. Zaawansowany system MIS\n     oraz zdolność RD do obsługi klienta z szybką reakcją i pod klucz\n     rozwiązania. Kompletna linia produkcyjna wolframu i molibdenu\n     każdy proces pod kontrolą.\n   </p>\n   <p>\n     Oferujemy zaawansowany sprzęt do testów i badań, najwyższej jakości w stanie surowym\n     produkcja materiałów i wykorzystanie zaawansowanego sprzętu produkcyjnego.\n   </p>\n</div>",
          gallery: gallery2,
        },
      },

      "capabilities-en": {
        languageId: en.id,
        aboutId: capabilities,
        name: "Capabilities",
        jsonData: {
          title: "ZGCC/ZIM Capabilities",
          article:
            "<div>\n  <p>\n    More than 3,000 skilled employees and professional teams have focused on the\n    production for over 50 years. We have a nationally certified inspection\n    center. We cover raw materials to finish parts for consistency,\n    repeatability, and superiority, which are guaranteed. An advance MIS system\n    and RD capability to serve the customer with rapid response and turn-key\n    solutions. A complete production line of Tungsten and Molybdenum to have\n    every process under control.\n  </p>\n  <p>\n    We offer advanced testing and examination equipment, first-class raw\n    material production and the use of advanced production equipment.\n  </p>\n</div>\n",
          gallery: gallery2,
        },
      },

      "capabilities-ru": {
        languageId: ru.id,
        aboutId: capabilities,
        name: "Возможности",
        jsonData: {
          title: "Возможности ZGCC / ZIM",
          article:
            "<div>\n   <p>\n     Более 3000 квалифицированных сотрудников и профессиональных команд сосредоточили свое внимание на\n     производство более 50 лет. У нас есть национально сертифицированная инспекция\n     центр. Мы покрываем сырье, чтобы закончить детали для согласованности,\n     повторяемость и превосходство, которое гарантировано. Передовая система MIS\n     и способность RD обслуживать клиентов с быстрым ответом и под ключ\n     решения. Полная производственная линия вольфрама и молибдена, чтобы иметь\n     каждый процесс под контролем.\n   </p>\n   <p>\n     Предлагаем современное испытательное и экзаменационное оборудование, первоклассное сырье.\n     материальное производство и использование современного производственного оборудования.\n   </p>\n</div>",
          gallery: gallery2,
        },
      },

      "credentials-pl": {
        languageId: pl.id,
        aboutId: credentials,
        name: "Nasze kwalifikacje",
        jsonData: {
          title: "Nasze kwalifikacje",
          article:
            "<div>\n   <p>\n     ZGCC to państwowa firma high-tech z tytułem doktora habilitowanego\n     stanowisko badawcze. Istnieją trzy R & amp; Centra D w firmie, jeden\n     do węglików spiekanych, jeden do materiałów napawanych, a drugi do\n     Produkty z wolframu i molibdenu. Nasze testy jakościowe i system analityczny\n     został już certyfikowany przez CNAS.\n   </p>\n   <p>\n     ZGCC współpracuje z cenionymi uniwersytetami i instytutami badawczymi. Nasz\n     silny R & amp; Zespół D składający się z ponad stu osób zawodowych i technicznych\n     konsultanci składają się z wyspecjalizowanych ekspertów, w tym absolwentów z Chin\n     Akademia Inżynierska.\n   </p>\n   <p>\n     Rozwijamy i poszukujemy nowych materiałów, aby poprawić jakość produktów i nowych\n     metody przetwarzania, aby zmaksymalizować wydajność obróbki, zminimalizować przetwarzanie\n     czas i zmniejszyć koszty.\n   </p>\n   <p>\n     Otrzymaliśmy dotacje od rządu prowincji i ministerstw na rzecz\n     badania naukowe oraz ponad sto autoryzowanych patentów.\n   </p>\n</div>",
        },
      },
      "credentials-en": {
        languageId: en.id,
        aboutId: credentials,
        name: "Our Credentials",
        jsonData: {
          title: "Our Credentials",
          article:
            "<div>\n  <p>\n    ZGCC is a state-ranked high-tech company with a postdoctoral scientific\n    research workstation. There are three R &amp; D centers in the company, one\n    for Cemented Carbides, one for hard-facing materials, and the other for\n    Tungsten and Molybdenum products. Our quality tests and analytical system\n    has already been certified by CNAS.\n  </p>\n  <p>\n    ZGCC works with highly regarded universities and research institutes. Our\n    strong R &amp; D team of over one hundred professional and technical\n    consultants consists of specialized experts including graduates of the China\n    Engineering Academy.\n  </p>\n  <p>\n    We develop and seek new materials to improve product quality and new\n    processing methods to maximize machining performance, minimize processing\n    time and reduce cost.\n  </p>\n  <p>\n    We have received grants by the provincial government and ministries for\n    scientific research as well as over one hundred authorized patents.\n  </p>\n</div>\n",
        },
      },
      "credentials-ru": {
        languageId: ru.id,
        aboutId: credentials,
        name: "Квалификация",
        jsonData: {
          title: "Квалификация",
          article:
            "<div>\n   <p>\n     ZGCC - государственная высокотехнологичная компания с докторской степенью.\n     исследовательская позиция. Есть три R & amp; D центров в компании, один\n     для цементированных карбидов, один для наплавочных материалов и один для\n     Изделия из вольфрама и молибдена. Наши тесты качества и аналитическая система\n     уже сертифицирован CNAS.\n   </p>\n   <p>\n     ZGCC сотрудничает с уважаемыми университетами и исследовательскими институтами. Наш\n     сильный R & amp; Команда D состоит из более чем ста профессиональных и технических специалистов\n     Консультанты состоят из специализированных экспертов, в том числе выпускников из Китая\n     Инженерная академия.\n   </p>\n   <p>\n     Мы разрабатываем и ищем новые материалы для улучшения качества продукции и новые\n     методы обработки, чтобы максимизировать эффективность обработки, минимизировать обработку\n     время и снизить затраты.\n   </p>\n   <p>\n     Мы получили гранты от правительства провинции и министерств на\n     научные исследования и более ста зарегистрированных патентов.\n   </p>\n</div>",
        },
      },

      "quality-certification-pl": {
        languageId: pl.id,
        aboutId: qualityCertification,
        name: "Certyfikat jakości",
        jsonData: {
          title: "Certyfikat jakości",
          article:
            "<p> ZGCC to firma z certyfikatem ISO, posiadająca certyfikaty ISO 9001, ISO 14001 i OHSAS-18001, zapewniająca systemy kontroli jakości w celu dostarczania naszym klientom produktów i usług wysokiej jakości. </p>",
          certifications,
        },
      },
      "quality-certification-en": {
        languageId: en.id,
        aboutId: qualityCertification,
        name: "Quality Certification",
        jsonData: {
          title: "Quality Certification",
          article:
            "<div><p>ZGCC is an ISO Certified company with ISO 9001, ISO 14001 and OHSAS-18001 certifications, providing quality control systems to serve our customers with quality products and services.</p></div>",
          certifications,
        },
      },
      "quality-certification-ru": {
        languageId: ru.id,
        aboutId: qualityCertification,
        name: "Сертификация качества",
        jsonData: {
          title: "Сертификация качества",
          article:
            "<p> ZGCC - это сертифицированная по ISO компания, имеющая сертификаты ISO 9001, ISO 14001 и OHSAS-18001, предоставляющая системы контроля качества для предоставления нашим клиентам качественных продуктов и услуг. </p>",
          certifications,
        },
      },

      "conflict-free-minerals-pl": {
        languageId: pl.id,
        aboutId: conflictFreeMinerals,
        name: "Minerały wolne od konfliktów",
        jsonData: {
          title: "Declaration of Conflict-Free Minerals",
          sections: [
            {
              key: "1",
              article:
                '<div>\n  <p>\n    „Conflict Minerals” - 21 lipca 2010 r. Prezydent Obama podpisał ustawę\n    Dodd-Frank Wall Street Reform and Consumer Protection Act (Wall Street\n    Ustawa o reformie). Część tej ustawy ma zastosowanie do „minerałów z rejonu konfliktu”\n    złoto (Au), tantal (Ta), wolfram (W), kobalt (Co) i cyna (Sn) z kopalni\n    na obszarach objętych konfliktem Demokratycznej Republiki Konga (DRK) i tak jest\n    kraje sąsiednie, te kraje sąsiednie obejmują; Rwanda, Uganda,\n    Burundi, Tanzania i Kenia.\n  </p>\n  <p>\n    Zigong Cemented Carbide Co., Ltd. (ZGCC) i jej spółki zależne są\n    odpowiedzialne firmy z dużą dbałością o swoją odpowiedzialność społeczną. ZGCC\n    ściśle przestrzega powiązanych polityk i zasad dotyczących minerałów „wolnych od konfliktów”.\n    ZGCC dokłada również należytej staranności i środków, aby zwracać się do wszystkich swoich dostawców i\n    ich poddostawców, aby unikali używania „Conflict Minerals”.\n  </p>\n  <p>\n    Zigong Cemented Carbide Co. Ltd i Zigong International Marketing LCC,\n    przestrzegać wszystkich wymogów Dodd-Frank Wall Street Reform\n    odnosi się do „Conflict Minerals” i wytwarza produkty, które są „DRK”\n    Bez konfliktów ”.\n  </p>\n  <p>\n    Nie krępuj się\n    <strong> <a href="https://zim-llc.com/contact-us/"> skontaktuj się z nami </a> </strong>\n    z dalszymi pytaniami lub dokumentacją.\n  </p>\n</div>',
              files: [
                {
                  id: 1,
                  thumbnail: "G1ASjM2JelgQhfROKB6yJTkNj.png",
                  name: "zigong-texas-1.png",
                  description: null,
                  file: "seya9EDRNFuyrMfid1TQ7ZsuS.png",
                  mimetype: "png",
                },
              ],
            },
          ],
        },
      },
      "conflict-free-minerals-en": {
        languageId: en.id,
        aboutId: conflictFreeMinerals,
        name: "Conflict-Free Minerals",
        jsonData: {
          title: "Declaration of Conflict-Free Minerals",
          sections: [
            {
              key: "1",
              article:
                '<div>\n  <p>\n    “Conflict Minerals” –On July 21, 2010 President Obama signed into law the\n    Dodd-Frank Wall Street Reform and Consumer Protection Act (Wall Street\n    Reform Act). A section of this act applies to the “conflict minerals” of\n    gold (Au), tantalum (Ta), tungsten (W), cobalt (Co), and tin (Sn) from mines\n    in conflict areas of the Democratic Republic of Congo (DRC) and it’s\n    adjoining countries, These adjoining countries include; Rwanda, Uganda,\n    Burundi, Tanzania, and Kenya.\n  </p>\n  <p>\n    Zigong Cemented Carbide Co., Ltd. (ZGCC) and its subsidiaries are\n    responsible companies with high attention to its social liability. ZGCC\n    strictly follows the related policies and rules on “Conflict-Free” minerals.\n    ZGCC also takes due diligent and measures to ask all of its suppliers and\n    their sub-suppliers to avoid any use of “Conflict Minerals.”\n  </p>\n  <p>\n    Zigong Cemented Carbide Co. Ltd and Zigong International Marketing LCC,\n    adhere to all requirements of the Dodd-Frank Wall Street Reform, as it\n    applies to “Conflict Minerals”, and produces products that are “DRC\n    Conflict-Free.”\n  </p>\n  <p>\n    Feel free to\n    <strong><a href="https://zim-llc.com/contact-us/">contact us</a></strong>\n    with any further questions or documentation.\n  </p>\n</div>\n',
              files: [
                {
                  id: 1,
                  thumbnail: "G1ASjM2JelgQhfROKB6yJTkNj.webp",
                  name: "zigong-texas-1.png",
                  description: null,
                  file: "seya9EDRNFuyrMfid1TQ7ZsuS.webp",
                  mimetype: "png",
                },
              ],
            },
          ],
        },
      },
      "conflict-free-minerals-ru": {
        languageId: ru.id,
        aboutId: conflictFreeMinerals,
        name: "Бесконфликтные минералы",
        jsonData: {
          title: "Declaration of Conflict-Free Minerals",
          sections: [
            {
              key: "1",
              article:
                '<div>\n  <p>\n    «Конфликтные минералы» - 21 июля 2010 г. президент Обама подписал закон\n    Закон Додда-Франка о реформе Уолл-стрит и защите прав потребителей (Уолл-стрит\n    Закон о реформе). Часть этого закона применяется к «конфликтным минералам»\n    золото (Au), тантал (Ta), вольфрам (W), кобальт (Co) и олово (Sn) из шахт\n    в конфликтных зонах Демократической Республики Конго (ДРК) и это\n    прилегающие страны, К этим прилегающим странам относятся; Руанда, Уганда,\n    Бурунди, Танзания и Кения.\n  </p>\n  <p>\n    Zigong Cemented Carbide Co., Ltd. (ZGCC) и ее дочерние компании являются\n    ответственные компании с большим вниманием к своей социальной ответственности. ZGCC\n    строго соблюдает соответствующие политики и правила в отношении бесконфликтных минералов.\n    ZGCC также проявляет должную осмотрительность и принимает меры, чтобы попросить всех своих поставщиков и\n    своим субпоставщикам избегать использования «конфликтных минералов».\n  </p>\n  <p>\n    Zigong Cemented Carbide Co. Ltd и Zigong International Marketing LCC,\n    соблюдать все требования реформы Уолл-стрит Додда-Франка, поскольку\n    применяется к «конфликтным минералам» и производит продукцию, которая является «DRC\n    Бесконфликтный ».\n  </p>\n  <p>\n    Не стесняйтесь\n    <strong> <a href="https://zim-llc.com/contact-us/"> свяжитесь с нами </a> </strong>\n    с любыми дополнительными вопросами или документацией.\n  </p>\n</div>',
              files: [
                {
                  id: 1,
                  thumbnail: "G1ASjM2JelgQhfROKB6yJTkNj.webp",
                  name: "zigong-texas-1.png",
                  description: null,
                  file: "seya9EDRNFuyrMfid1TQ7ZsuS.webp",
                  mimetype: "png",
                },
              ],
            },
          ],
        },
      },
    };

    const contents = getContents(pages);

    return queryInterface.bulkInsert("AboutTranslations", contents, {});
  },
  down: (queryInterface, Sequelize) => {},
};

const findAboutId = (array, slug) => {
  return array.find((element) => element.slug == slug).id;
};

const getContents = (pages) => {
  const contents = [];

  for (const [key, value] of Object.entries(pages)) {
    const content = {
      aboutId: value.aboutId,
      languageId: value.languageId,
      name: value.name,
      value: JSON.stringify(value.jsonData),
    };

    contents.push(content);
  }

  return contents;
};
