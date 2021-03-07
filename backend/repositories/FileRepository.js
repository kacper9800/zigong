const AbstractRepository = require("./AbstractRepository");
const config = require("../config");
const mime = require("mime-types");
const { File } = require("../models");
const pdf = require("pdf-thumbnail");
const fs = require("fs");
const sharp = require("sharp");

class FileRepository extends AbstractRepository {
  get model() {
    return File;
  }

  makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async uploadFile(file) {
    const { versions, path } = config.imagerResizer;

    if (file.size >= 9506136) {
      return false;
    }

    const acceptedMimetypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "application/pdf",
    ];

    if (!acceptedMimetypes.includes(file.mimetype)) {
      return false;
    }

    const fileExtension = mime.extension(file.mimetype);
    let fileName = this.makeid(25);
    const thumbnail = this.makeid(25) + ".webp";

    var dir = "./public";

    if (file.mimetype == "application/pdf") {
      fileName = fileName + "." + fileExtension;

      await file.mv(`${dir}/files/${fileName}`);

      const pdfBuffer = fs.readFileSync(`${dir}/files/${fileName}`);

      pdf(pdfBuffer)
        .then((data) => {
          data.pipe(fs.createWriteStream(`${dir}/thumbnails/${thumbnail}`));
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    } else {
      fileName = fileName + ".webp";

      versions.map(async (size) => {
        await sharp(file.data)
          .resize({ width: size })
          .toFile(
            size !== 300
              ? `${dir}/s${size}/${fileName}`
              : `${dir}/thumbnails/${thumbnail}`
          );
      });
    }

    const createdFile = await File.create({
      thumbnail,
      name: file.name,
      file: fileName,
      mimetype: fileExtension,
    });

    if (!file) {
      return false;
    }

    return createdFile;
  }
}

module.exports = FileRepository;
