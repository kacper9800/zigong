const HttpStatuses = require("http-status-codes");
const { File } = require("../models");
const { Op } = require("sequelize");
const slugGenerator = require("../helpers/slug");

class ProductController {
  constructor(
    productRepository,
    productTranslationRepository,
    languageRepository
  ) {
    this.productRepository = productRepository;
    this.productTranslationRepository = productTranslationRepository;
    this.languageRepository = languageRepository;
  }

  async index(req, res) {
    const { lng } = req.query;
    const {
      perPage = 10,
      page = 1,
      sortBy = "createdAt",
      order = "ASC",
      category = null,
    } = req.query;

    const pageNumber = parseInt(page);
    const limit = parseInt(perPage);
    const offset = (pageNumber - 1) * limit;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const where = {};
    where.languageId = languageId;

    if (category) {
      where.categoryId = category;
    }

    const products = await this.productTranslationRepository.findAndCountAll({
      offset,
      limit,
      order: [[sortBy, order]],
      where,
      attributes: {
        exclude: ["id", "languageId", "categoryId", "value"],
      },
      include: [
        {
          association: "product",
          attributes: {
            exclude: ["id", "coverImageId", "categoryId"],
          },
          include: [
            {
              model: File,
              as: "file",
              attributes: {
                exclude: ["id", "name", "description", "file"],
              },
            },
          ],
        },
      ],
    });

    const { count } = products;

    const totalPages = Math.ceil(count / limit);

    return res.send({ count, totalPages, data: products.rows });
  }

  async show(req, res) {
    const { id } = req.params;
    const { lng } = req.query;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const product = await this.productTranslationRepository.findOne({
      where: { languageId, productId: id },
      attributes: {
        exclude: ["id", "languageId"],
      },
    });

    if (!product) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const parsedData = JSON.parse(product.value);

    parsedData.name = product.name;
    parsedData.id = id;
    parsedData.lng = lng;

    return res.send(parsedData);
  }

  async showBySlug(req, res) {
    const { slug } = req.params;
    const { lng } = req.query;

    const languageId = await this.languageRepository.findLanguageId(lng);

    if (!languageId) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const product = await this.productRepository.findOne({
      where: { slug },
    });

    if (!product) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const { id, categoryId } = product;

    const productTranslation = await this.productTranslationRepository.findOne({
      where: { languageId, productId: id },
      attributes: {
        exclude: ["id", "languageId"],
      },
    });

    if (!productTranslation) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const parsedData = JSON.parse(productTranslation.value);

    parsedData.id = id;
    parsedData.slug = slug;
    parsedData.name = productTranslation.name;
    parsedData.categoryId = categoryId;

    return res.send(parsedData);
  }

  async create(req, res) {
    const { productId, categoryId, name } = req.body;
    const { id: languageId } = req.language;

    const slug = slugGenerator(name);

    let existProduct = await this.productRepository.findOne({
      where: { [Op.or]: [{ slug }, { id: productId }] },
    });

    if (!existProduct) {
      req.body.slug = slug;

      existProduct = await this.productRepository.create({
        ...req.body,
      });
    }

    const productTranslation = await this.productTranslationRepository.findOne({
      where: { languageId, productId: existProduct.id },
    });

    req.body.productId = existProduct.id;
    req.body.languageId = languageId;

    if (!productTranslation) {
      const createdProduct = await this.productTranslationRepository.create({
        ...req.body,
      });

      return res.send(createdProduct);
    } else {
      return res.sendStatus(HttpStatuses.NOT_ACCEPTABLE);
    }
  }

  // @todo - update
  async update(req, res) {}

  async delete(req, res) {
    const { id } = req.params;

    await this.productTranslationRepository.delete({
      where: { productId: id },
    });

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}

module.exports = ProductController;
