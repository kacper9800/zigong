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

    const defaultDescription = `{
      "name": "Nasza organizacja",
      "article": "",
      "gallery": [
        {
          "id": 1,
          "thumbnail": "G1ASjM2JelgQhfROKB6yJTkNj.png",
          "name": "zigong-texas-1.png",
          "description": null,
          "file": "seya9EDRNFuyrMfid1TQ7ZsuS.png",
          "mimetype": "png"
        },
        {
          "id": 1,
          "thumbnail": "G1ASjM2JelgQhfROKB6yJTkNj.png",
          "name": "zigong-texas-1.png",
          "description": null,
          "file": "seya9EDRNFuyrMfid1TQ7ZsuS.png",
          "mimetype": "png"
        }
      ],
      "sections": [
        {
          "key": "1",
          "article": "html",
          "file": {
            "id": 1,
            "thumbnail": "G1ASjM2JelgQhfROKB6yJTkNj.png",
            "name": "zigong-texas-1.png",
            "description": null,
            "file": "seya9EDRNFuyrMfid1TQ7ZsuS.png",
            "mimetype": "png"
          }
        }
      ]
    }`;

    const pages = {
      "organization-pl": {
        languageId: pl.id,
        aboutId: organization,
        name: "Organizacja",
        description: defaultDescription
      },
      // "organization-en": {
      //   languageId: en.id,
      //   aboutId: organization,
      //   name: "Organization",
      //   description: `{
      //     "name": "Our Organization",
      //     "article": "",
      //     "gallery": [
      //       {
      //         "id": 1,
      //         "thumbnail": "G1ASjM2JelgQhfROKB6yJTkNj.png",
      //         "name": "zigong-texas-1.png",
      //         "description": null,
      //         "file": "seya9EDRNFuyrMfid1TQ7ZsuS.png",
      //         "mimetype": "png"
      //       },
      //       {
      //         "id": 1,
      //         "thumbnail": "G1ASjM2JelgQhfROKB6yJTkNj.png",
      //         "name": "zigong-texas-1.png",
      //         "description": null,
      //         "file": "seya9EDRNFuyrMfid1TQ7ZsuS.png",
      //         "mimetype": "png"
      //       }
      //     ],
      //     "sections": [
      //       {
      //         "key": "1",
      //         "article": "html",
      //         "file": {
      //           "id": 1,
      //           "thumbnail": "G1ASjM2JelgQhfROKB6yJTkNj.png",
      //           "name": "zigong-texas-1.png",
      //           "description": null,
      //           "file": "seya9EDRNFuyrMfid1TQ7ZsuS.png",
      //           "mimetype": "png"
      //         },
      //       }
      //     ]
      //   }`
      // },
      // "organization-ru": {
      //   languageId: ru.id,
      //   aboutId: organization,
      //   name: "Организация",
      //   description: `{
      //     "name": "Наша организация",
      //     "article": "",
      //     "gallery": [
      //       {
      //         "id": 1,
      //         "thumbnail": "G1ASjM2JelgQhfROKB6yJTkNj.png",
      //         "name": "zigong-texas-1.png",
      //         "description": null,
      //         "file": "seya9EDRNFuyrMfid1TQ7ZsuS.png",
      //         "mimetype": "png"
      //       },
      //       {
      //         "id": 1,
      //         "thumbnail": "G1ASjM2JelgQhfROKB6yJTkNj.png",
      //         "name": "zigong-texas-1.png",
      //         "description": null,
      //         "file": "seya9EDRNFuyrMfid1TQ7ZsuS.png",
      //         "mimetype": "png"
      //       }
      //     ],
      //     "sections": [
      //       {
      //         "key": "1",
      //         "article": "html",
      //         "file": {
      //           "id": 1,
      //           "thumbnail": "G1ASjM2JelgQhfROKB6yJTkNj.png",
      //           "name": "zigong-texas-1.png",
      //           "description": null,
      //           "file": "seya9EDRNFuyrMfid1TQ7ZsuS.png",
      //           "mimetype": "png"
      //         },
      //       }
      //     ]
      //   }`
      // }
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
      description: value.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    contents.push(content);
  }

  return contents;
};
