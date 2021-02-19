const di = require("../di");
const categoryRepository = di.get("repositories.category");
const languageRepository = di.get("repositories.language");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const categories = await categoryRepository.findAll();
    const pl = await languageRepository.findOne({
      where: { code: "pl" },
    });
    const en = await languageRepository.findOne({
      where: { code: "en" },
    });
    const ru = await languageRepository.findOne({
      where: { code: "ru" },
    });

    const powders = findCategoryId(categories, "powders");
    const cementedCarbides = findCategoryId(categories, "cemented-carbides");
    const hardfacingMaterials = findCategoryId(
      categories,
      "hardfacing-materials"
    );
    const wMoProducts = findCategoryId(categories, "w-mo-products");
    const equipment = findCategoryId(
      categories,
      "equipment-for-carbide-production"
    );

    const pages = {
      "powders-pl": {
        languageId: pl.id,
        categoryId: powders,
        name: "Pudry",
        homePageDescription:
          "Produkty proszkowe - do produkcji węglika spiekanego, sprzętu wojskowego, przemysłu elektronicznego i medycznego.",
        description: `<p> ZGCC posiada kompletną linię produkcyjną od parawolframianu amonu (APT) do metawolframianu amonu (AMT), proszku wolframu, proszku węglika wolframu i proszku gotowego do prasowania (RTP). Wszystkie te proszki są produkowane w siedzibie ZGCC. Dzięki zaawansowanemu sprzętowi produkcyjnemu, ponad 50-letniemu doświadczeniu w produkcji i najnowocześniejszym narzędziom testującym, jakość jest dobrze kontrolowana i stała na każdym etapie przed przejściem do następnego procesu produkcyjnego. </p>
        <p> Możemy produkować proszki według specyfikacji klientów, a także wewnętrznego standardu kontroli ZGCC. Silny i oddany zespół inżynierów zapewnia techniczne wsparcie produkcji przed i po sprzedaży. Dzięki Krajowemu Centrum Kontroli w ZGCC właściwości fizyczne, chemiczne i mechaniczne są dobrze monitorowane i kontrolowane. </p>`,
      },
      "powders-en": {
        languageId: en.id,
        categoryId: powders,
        name: "Powder",
        homePageDescription:
          "Powder products – for cemented carbide manufacturing, military equipment, electronic and medical industries.",
        description: `<p>ZGCC has a complete production line from Ammonium Paratungstate (APT) to Ammonium Metatungstate (AMT), Tungsten powder, Tungsten Carbide powder, and Ready To Press (RTP) powder. All of these powders are manufactured at ZGCC headquarters. With the advanced production equipment, over 50 years of production experience, and state of the art of testing instruments, the quality is well controlled and consistent at each stage prior to going on to the next production process.</p>
        <p>We can manufacture powders to customers specifications as well as ZGCC’s inner control standard. A strong and dedicated engineering team is here to provide technical manufacturing support before and after a sale. Thanks to the Nationally-certified Inspection Center in ZGCC, the physical, chemical and mechanical properties are well monitored and controlled.</p>`,
      },
      "powders-ru": {
        languageId: ru.id,
        categoryId: powders,
        name: "Пудра",
        homePageDescription:
          "Порошковые изделия - для производства твердых сплавов, военной техники, электронной и медицинской промышленности.",
        description: `<p> ZGCC имеет полную производственную линию от паравольфрамата аммония (APT) до метавольфрамата аммония (AMT), порошка вольфрама, порошка карбида вольфрама и порошка, готового к прессованию (RTP). Все эти порошки производятся в штаб-квартире ZGCC. Благодаря передовому производственному оборудованию, более чем 50-летнему опыту производства и современным средствам тестирования качество хорошо контролируется и остается неизменным на каждом этапе до перехода к следующему производственному процессу. </p>
        <p> Мы можем производить порошки в соответствии со спецификациями клиентов, а также в соответствии со стандартами внутреннего контроля ZGCC. Сильная и преданная своему делу команда инженеров готова предоставить техническую поддержку производства до и после продажи. Благодаря национально сертифицированному инспекционному центру в ZGCC, физические, химические и механические свойства хорошо отслеживаются и контролируются. </p>`,
      },

      "cemented-carbides-pl": {
        languageId: pl.id,
        categoryId: cementedCarbides,
        name: "Węgliki spiekane",
        homePageDescription:
          "Węgliki spiekane, produkty na bazie wolframu i molibdenu, proszki i gotowe narzędzia.",
        description: `<p> <strong> <br>
        Zigong Cemented Carbide Co., Ltd </strong> jest producentem na dużą skalę, który zajmuje się produkcją wyrobów z węglików spiekanych. Uruchamiamy linię produkcyjną od amonu paratungframu (APT) do proszku wolframu, proszku węglika wolframu i proszku gotowego do prasowania (RTP). Istnieją również różne typy części z węglików spiekanych, takie jak wkładki z węglików spiekanych, matryce z węglików spiekanych, produkty zużywające się, precyzyjne części z węglików spiekanych, pręty z węglików spiekanych, walce z węglików spiekanych i pełne narzędzia z węglika spiekanego. Produkty te są szeroko stosowane w obróbce mechanicznej, przemyśle naftowym i gazowym, hutnictwie, metalurgii, górnictwie, badaniach geologicznych, elektronice i lotnictwie. Są sprzedawane do ponad 40 krajów, takich jak Niemcy, Szwajcaria, Japonia, Singapur, Korea Południowa, Kanada, Stany Zjednoczone i Australia. </p>`,
      },
      "cemented-carbides-en": {
        languageId: en.id,
        categoryId: cementedCarbides,
        name: "Cemented Carbides",
        homePageDescription:
          "Cemented carbides, tungsten and molybdenum formulated products, powders and finished tools.",
        description: `<p><strong><br>
        Zigong Cemented Carbide Co., Ltd</strong> is a large-scale manufacturer that engages in the production of Cemented Carbides products. We start the production line from Ammonium Paratungsten (APT) to Tungsten powder, Tungsten Carbide powder, and Ready To Press (RTP) powder. There are also various types of carbide parts, such as carbide inserts, carbide dies, wear products, precision carbide parts, carbide rods, carbide rolls, and carbide solid tools. These products are widely used in mechanical machining, oil and gas, steel, metallurgy, mining, geology prospecting, electronics, and aerospace. They are sold to over 40 countries such as Germany, Switzerland, Japan, Singapore, South Korea, Canada, the United States of America, and in countries across Australia.</p>`,
      },
      "cemented-carbides-ru": {
        languageId: ru.id,
        categoryId: cementedCarbides,
        name: "Цементированные карбиды",
        homePageDescription:
          "Цементированные карбиды, продукты из вольфрама и молибдена, порошки и готовые инструменты.",
        description: `<p> <strong> <br>
        Zigong Cemented Carbide Co., Ltd </strong> - крупный производитель, который занимается производством продуктов из цементированных карбидов. Мы запускаем производственную линию от пара-вольфрама аммония (APT) до порошка вольфрама, порошка карбида вольфрама и порошка, готового к прессованию (RTP). Существуют также различные типы карбидных деталей, такие как твердосплавные пластины, твердосплавные матрицы, продукты износа, прецизионные твердосплавные детали, твердосплавные стержни, твердосплавные валки и твердосплавные инструменты. Эти продукты широко используются в механической обработке, нефтегазовой, сталелитейной, металлургической, горнодобывающей, геологоразведочной, электронной и космической. Они продаются в более чем 40 стран, таких как Германия, Швейцария, Япония, Сингапур, Южная Корея, Канада, Соединенные Штаты Америки, а также в странах по всей Австралии. </p>`,
      },

      "hardfacing-materials-pl": {
        languageId: pl.id,
        categoryId: hardfacingMaterials,
        name: "Materiały do ​​napawania",
        homePageDescription:
          "Jesteśmy zaawansowaną kompleksową firmą zajmującą się badaniami i rozwojem materiałów napawanych, produkcją i usługami aplikacyjnymi.",
        description: `<p>Założona w 2009 roku firma Zigong Tungsten Carbide Co., Ltd (ZTC) znajduje się w słynnym odwiecznym mieście solnym Zigong w prowincji Syczuan w Chinach. Jest to wspólne przedsięwzięcie Zigong Cemented Carbide Co.,
        Ltd. i H.F. Technologies AG w Szwajcarii, z kapitałem zakładowym 10 mln USD. ZTC to nowa, ale zaawansowana, kompleksowa firma zajmująca się badaniami i rozwojem materiałów do napawania, produkcją i usługami aplikacyjnymi.</p>
        <p><strong>Statystyka:</strong><br>
        • Jako główny producent materiałów do napawania w Chinach, ZTC zostało upoważnione do opracowania krajowych norm dotyczących materiałów do napawania.<br>
         • Jesteśmy dwoma wiodącymi producentami makrokrystalicznego węglika wolframu na świecie.<br>
         • ZTC jest pierwszą firmą w Chinach, która produkuje sferyczny proszek z węglika wolframu.<br>
         • Firma posiadająca certyfikaty ISO 9001: 2018, ISO14001 i OHSAS <br>
         • ZTC posiada Wojewódzkie Centrum Kontroli. <br>
         • Jesteśmy dumni z produkcji najwyższej jakości materiałów do napawania na świecie. Produkty obejmują odlewany węglik wolframu, makrokrystaliczny węglik wolframu, sferyczne odlewanie węglika wolframu, proszek do natryskiwania termicznego na bazie WC, rurowy pręt spawalniczy, elastyczna lina, granulki węglika spiekanego, wstępnie zmieszany proszek do PTA i amp; LC, PDC Matrix Powder i tak dalej. </p>
        `,
      },
      "hardfacing-materials-en": {
        languageId: en.id,
        categoryId: hardfacingMaterials,
        name: "Hardfacing Materials",
        homePageDescription:
          "We are an advanced comprehensive company engaged in hard-facing materials R&amp;D, manufacturing and application service.",
        description: `<p>&nbsp;</p>
        <p>Founded in 2009, Zigong Tungsten Carbide Co., Ltd (ZTC), is located in the famous age-old salt capital Zigong City, Sichuan Province, China. It is a joint venture between Zigong Cemented Carbide Co., 
        Ltd., and H.F. Technologies AG in Switzerland, with a registered capital USD 10 million. ZTC is a new but advanced, comprehensive company that engages in hardfacing materials R&amp;D, manufacturing, and application service.</p>
        <p><strong>Statistics:</strong><br>
        • As the major hardfacing materials producer in China, ZTC was authorized to develop the national standards for hardfacing material.<br>
        • We are the two leading manufacturers of Macrocrystalline Tungsten Carbide in the world.<br>
        • ZTC is the first company in China to produce Spherical Cast Tungsten Carbide Powder.<br>
        • ISO 9001:2018, ISO14001, and OHSAS certified company<br>
        • ZTC has a Provincial Inspection Center.<br>
        • We are proud to produce the highest quality of hardfacing materials in the world. The products include Cast Tungsten Carbide, Macrocrystalline Tungsten Carbide, Spherical casting Tungsten Carbide, WC-based thermal spray powder, tubular welding rod, flexible rope, cemented carbide pellets, premixed powder for PTA &amp; LC, PDC Matrix Powder, and so on.</p>`,
      },
      "hardfacing-materials-ru": {
        languageId: ru.id,
        categoryId: hardfacingMaterials,
        name: "Материалы для наплавки",
        homePageDescription:
          "Мы - передовая комплексная компания, занимающаяся исследованиями и разработками наплавочных материалов, производством и применением.",
        description: `<p> Основанная в 2009 году компания Zigong Tungsten Carbide Co., Ltd (ZTC) расположена в знаменитой старинной соляной столице Цзигун-Сити, провинция Сычуань, Китай. Это совместное предприятие Zigong Cemented Carbide Co.,
        Ltd. и H.F. Technologies AG в Швейцарии с уставным капиталом 10 миллионов долларов США. ZTC - это новая, но передовая комплексная компания, которая занимается исследованиями и разработками материалов для наплавки, производством и сервисным обслуживанием. </p>
        <p> <strong> Статистика: </strong> <br>
        • Как главный производитель наплавочных материалов в Китае, ZTC получила разрешение на разработку национальных стандартов для наплавочных материалов.
        • Мы являемся двумя ведущими производителями макрокристаллического карбида вольфрама в мире.
        • ZTC - первая компания в Китае, которая производит порошок карбида вольфрама для сферической литья. <br>
        • Компания, имеющая сертификаты ISO 9001: 2018, ISO14001 и OHSAS <br>
        • ZTC имеет провинциальный инспекционный центр. <br>
        • Мы гордимся тем, что производим наплавочные материалы высочайшего качества в мире. Продукция включает в себя литой карбид вольфрама, макрокристаллический карбид вольфрама, сферическое литье из карбида вольфрама, порошок для термического напыления на основе WC, трубчатый сварочный стержень, гибкий трос, гранулы цементированного карбида, предварительно смешанный порошок для PTA & amp; LC, PDC Matrix Powder и т. Д. </p>`,
      },

      "w-mo-products-pl": {
        languageId: pl.id,
        categoryId: wMoProducts,
        name: "Produkty W & Mo",
        homePageDescription:
          "Produkty są szeroko stosowane w przemyśle maszynowym, metalurgicznym, naftowym, wydobywczym, budowlanym, elektrycznym i lotniczym.",
        description: `<p>Wolfram i molibden to dwa elementy ogniotrwałe. W 2007 roku ZGCC rozszerzyło swoją działalność, zakładając oddział w Chengdu w celu projektowania i produkcji produktów związanych z wolframem i molibdenem. Produkty obejmują proszek wolframu, krystaliczny proszek wolframu, pręt wolframowy, płytkę wolframową, drut wolframowy, proszek molibdenu, proszek molibdenu w sprayu, sztabkę molibdenu, płytkę molibdenową, penetrator molibdenu i tak dalej.</p>`,
      },
      "w-mo-products-en": {
        languageId: en.id,
        categoryId: wMoProducts,
        name: "W & Mo Products",
        homePageDescription:
          "Products are widely used in industries like machinery, metallurgy, oil, mining, construction, electric and aviation.",
        description: `<p>Tungsten and Molybdenum are two refractory elements. In 2007, ZGCC expanded to establish the Chengdu Branch to design and produce Tungsten and Molybdenum related products. The products include Tungsten powder, crystalline Tungsten powder, Tungsten rod, Tungsten plate, Tungsten wire, Molybdenum powder, Molybdenum spray powder, Molybdenum bar, Molybdenum plate, Molybdenum penetrator, and so on.</p>`,
      },
      "w-mo-products-ru": {
        languageId: ru.id,
        categoryId: wMoProducts,
        name: "Продукция W & Mo",
        homePageDescription:
          "Продукция широко используется в таких отраслях, как машиностроение, металлургия, нефтяная, горнодобывающая, строительная, электрическая и авиационная.",
        description: `Вольфрам и молибден - два тугоплавких элемента. В 2007 году ZGCC расширилась, открыв филиал в Чэнду для разработки и производства продуктов, связанных с вольфрамом и молибденом. Продукция включает в себя порошок вольфрама, кристаллический порошок вольфрама, вольфрамовый стержень, вольфрамовую пластину, вольфрамовую проволоку, порошок молибдена, порошок для распыления молибдена, стержень из молибдена, пластину из молибдена, пенетратор из молибдена и так далее.`,
      },

      "equipment-for-carbide-production-pl": {
        languageId: pl.id,
        categoryId: equipment,
        name: "Sprzęt do produkcji węglika",
        homePageDescription:
          "Linie produkcyjne - od surowców po produkty końcowe - zapewniające naszym klientom pełną gamę materiałów.",
        description: `<p>Dzięki ponad 50-letniemu doświadczeniu w produkcji węglików wiemy dokładnie, jakiego rodzaju maszyny będziesz potrzebować, aby uzyskać doskonałe produkty. ZGCC zapewnia szeroką gamę urządzeń, począwszy od frezarek kulowych, poprzez piece redukcyjne, piece do karbonizacji, opryskiwacze i suszarki, piece do spiekania, piece do spiekania próżniowego, piece do topienia wysokotemperaturowego, piece wysokotemperaturowe z ciągłym drutem molibdenowym.</p>`,
      },
      "equipment-for-carbide-production-en": {
        languageId: en.id,
        categoryId: equipment,
        name: "Carbide Production Equipment",
        homePageDescription:
          "Production lines – from raw materials to downstream products – providing our customers with a full-range of material.",
        description: `<p>With over 50 years of carbide production experience, we know exactly which kind of machine you will need to achieve superior products. ZGCC provides a wide range of equipment, starting with ball milling machines to reduction furnaces, carbonization furnaces, sprayers and dryers, sintering furnaces, vacuum sintering furnaces, high-temperature melting furnaces, continuous molybdenum wire high-temperature furnaces.</p>`,
      },
      "equipment-for-carbide-production-ru": {
        languageId: ru.id,
        categoryId: equipment,
        name: "Оборудование для производства карбида",
        homePageDescription:
          "Производственные линии - от сырья до продуктов переработки - предоставляют нашим клиентам полный спектр материалов.",
        description: `<p>Обладая более чем 50-летним опытом производства карбидов, мы точно знаем, какой тип станка вам понадобится для получения превосходной продукции. ZGCC предоставляет широкий спектр оборудования, от шаровых мельниц до восстановительных печей, печей карбонизации, распылителей и сушилок, спекательных печей, вакуумных спекательных печей, высокотемпературных плавильных печей, высокотемпературных печей с непрерывной молибденовой проволокой.</p>`,
      },
    };

    const contents = getContents(pages);

    return queryInterface.bulkInsert("CategoryTranslations", contents, {});
  },

  down: (queryInterface, Sequelize) => {},
};

const findCategoryId = (array, slug) => {
  return array.find((element) => element.slug == slug).id;
};

const getContents = (pages) => {
  const contents = [];

  for (const [key, value] of Object.entries(pages)) {
    const content = {
      categoryId: value.categoryId,
      languageId: value.languageId,
      name: value.name,
      homePageDescription: value.homePageDescription,
      description: value.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    contents.push(content);
  }

  return contents;
};
