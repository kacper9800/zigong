const fileUpload = require("express-fileupload");
const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, validate } = require("../middleware");
const fileValidator = require("../validators/fileValidator");

module.exports = (di) => {
  const FileController = di.get("controller.file");

  router.get("/files", [isLoggedIn, isAdmin], (...args) =>
    FileController.index(...args)
  );

  router.get("/files/:id", [isLoggedIn, isAdmin], (...args) =>
    FileController.show(...args)
  );

  router.post(
    "/files",
    [
      isLoggedIn,
      isAdmin,
      fileUpload({
        createParentPath: true,
      }),
    ],
    (...args) => FileController.create(...args)
  );

  router.put(
    "/files/:id",
    [isLoggedIn, isAdmin, fileValidator.update, validate],
    (...args) => FileController.update(...args)
  );

  router.delete("/files/:id", [isLoggedIn, isAdmin], (...args) =>
    FileController.delete(...args)
  );

  return router;
};
