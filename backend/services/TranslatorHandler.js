const translate = require("@vitalets/google-translate-api");
const { Language } = require("../models");

class TranslatorHandler {
  constructor() {}

  async handle(textTotranslate, fromLanguageId, toLanguageId) {
    const fromLanguage = await Language.findOne({
      where: { id: fromLanguageId },
    });
    const toLanguage = await Language.findOne({
      where: { id: toLanguageId },
    });

    const translated = await translate(textTotranslate, {
      from: fromLanguage.code,
      to: toLanguage.code,
    });

    return translated.text;
  }
}

module.exports = TranslatorHandler;
