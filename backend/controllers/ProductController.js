const HttpStatuses = require("http-status-codes");
const { File, Resource } = require("../models");
const { Op } = require("sequelize");
const slugGenerator = require("../helpers/slug");

class ProductController {
  constructor(
    productRepository,
    productTranslationRepository,
    languageRepository,
    resourcesRepository
  ) {
    this.productRepository = productRepository;
    this.productTranslationRepository = productTranslationRepository;
    this.languageRepository = languageRepository;
    this.resourcesRepository = resourcesRepository;
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

    const productTranslation = await this.productTranslationRepository.findOne({
      where: { languageId, productId: id },
      attributes: {
        exclude: ["id", "slug"],
      },
    });

    if (!productTranslation) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const product = await this.productRepository.findOne({
      where: { id },
      attributes: {
        exclude: ["id", "languageId"],
      },
      include: [
        {
          model: File,
          as: "file",
          attributes: {
            exclude: ["name", "description"],
          },
        },
      ],
    });

    if (!product) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const resource = await this.resourcesRepository.findOne({
      where: { productId: id, languageId },
      include: [
        {
          model: File,
          as: "pdf",
        },
      ],
    });

    if (!resource) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const parsedData = JSON.parse(productTranslation.value);

    // const respons = {
    //   id,
    //   lng,
    //   name: productTranslation.name,
    //   coverImage: product.file,
    //   categoryId: product.categoryId,
    //   file: resource.pdf,
    // };

    return res.send(productTranslation.value);
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

    const respons = {
      id,
      slug,
      name: productTranslation.name,
      categoryId: product.categoryId,
    };

    return res.send({ ...respons, ...parsedData });
  }

  async create(req, res) {
    const { productId, name, value } = req.body;
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

    req.body.productId = existProduct.id;

    const productTranslation = await this.productTranslationRepository.findOne({
      where: { languageId, productId: existProduct.id },
    });

    if (productTranslation) {
      return res.sendStatus(HttpStatuses.NOT_ACCEPTABLE);
    }

    await this.productTranslationRepository.translateAndCreate(
      { ...req.body },
      languageId
    );

    req.body.productId = existProduct.id;
    req.body.languageId = languageId;

    const createdProduct = await this.productTranslationRepository.create({
      ...req.body,
    });

    await this.resourcesRepository.create({ ...req.body });

    return res.send(createdProduct);
  }

  async update(req, res) {
    const { id: productId } = req.params;
    const { id: languageId } = req.language;

    const productTranslation = await this.productTranslationRepository.findOne({
      where: {
        productId,
        languageId,
      },
    });

    if (!productTranslation) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return res.sendStatus(HttpStatuses.NOT_FOUND);
    }

    req.body.languageId = languageId;

    productTranslation.update(req.body);
    product.update(req.body);

    return res.send(product);
  }

  async delete(req, res) {
    const { id } = req.params;

    await this.productRepository.delete({
      where: { id },
    });

    await this.productTranslationRepository.delete({
      where: { productId: id },
    });

    await this.resourcesRepository.delete({ where: { productId: id } });

    return res.sendStatus(HttpStatuses.NO_CONTENT);
  }
}

module.exports = ProductController;
