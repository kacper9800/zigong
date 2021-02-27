const HttpStatuses = require("http-status-codes");

class ContentController {
  constructor(
    contentRepository,
    contentTranslationRepository,
    languageRepository
  ) {
    this.contentRepository = contentRepository;
    this.contentTranslationRepository = contentTranslationRepository;
    this.languageRepository = languageRepository;
  }

  async show(req, res) {
    const { slug } = req.params;
    const { lng } = req.query;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const content = await this.contentRepository.findOne({ where: { slug } });

    if (!content) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const { id: contentId } = content;

    const contentTranslation = await this.contentTranslationRepository.findOne({
      where: { contentId, languageId },
    });

    if (!contentTranslation) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const parsedData = contentTranslation.value;

    parsedData.slug = slug;
    parsedData.lng = lng;

    return res.send(parsedData);
  }

  update() {}
}

module.exports = ContentController;
