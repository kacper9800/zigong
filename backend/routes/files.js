const fileUpload = require("express-fileupload");

const express = require("express");
const router = express.Router();
const { isLoggedIn, isAdmin, validate } = require("../middleware");

module.exports = (di) => {
  const FileController = di.get("controller.file");

  router.get("/files", [isLoggedIn, isAdmin], (...args) =>
    FileController.index(...args)
  );

  router.get("/files/:id", [isLoggedIn, isAdmin], (...args) =>
    FileController.show(...args)
  );

  //   @todo validation
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

  //   @todo UPDATE(PUT) method

  router.delete("/files/:id", [isLoggedIn, isAdmin], (...args) =>
    FileController.delete(...args)
  );

  return router;
};
