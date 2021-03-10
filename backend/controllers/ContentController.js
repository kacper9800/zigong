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

    return res.send(parsedData);
  }

  async update(req, res) {
    const { slug } = req.params;
    const language = req.language;

    const content = await this.contentRepository.findOne({ where: { slug } });

    if (!content) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const contentTranslation = await this.contentTranslationRepository.findOne({
      where: { contentId: content.id, languageId: language.id },
    });

    if (!contentTranslation) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    contentTranslation.update(req.body);

    return res.send(contentTranslation);
  }
}

module.exports = ContentController;
