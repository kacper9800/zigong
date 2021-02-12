/**
 * @swagger
 * /users/{userId}:
 *  get:
 *   summary: Retrieve a single user by ID
 *   description: Retrieve a single user by ID
 *   parameters:
 *     -in: path
 *     name: id
 *     type: integer
 *     required: true
 *     description: Numeric ID of the user to get.
 *   responses:
 *    200:
 *      description: A single user
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *
 * /users:
 *  get:
 *   summary: Retrieve a list of users
 *   description: Retrieve a list of registered users in application
 *   responses:
 *    200:
 *      description: A list of users
 *      content:
 *        application/json:
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/User'
 *  post:
 *   summary: Create user
 *   responses:
 *    201:
 *      description: Created
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 * @swagger
 * components:
 *   schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The user ID
 *          example: 15
 *        email:
 *          type: string
 *          description: The user email
 *          example: martin@gmail.com
 *        dayOfBirth:
 *          type: date
 *          description: The user date of birth
 *          example: 20.01.1993
 *        password:
 *          type: string
 *          description: The user password
 *        firstName:
 *          type: string
 *          description: The user name
 *          example: John
 *        lastName:
 *          type: string
 *          description: The user surname
 *          example: Smith
 *        availableDays:
 *          type: integer
 *          description: The user account available days
 *          example: 15
 */

const express = require("express");
const router = express.Router();
const {
  isLoggedIn,
  isAdmin,
  adminIsNotRequired,
  validate
} = require("../middleware");
const usersValidator = require("../validators/usersValidator");

module.exports = (di) => {
  const usersController = di.get("controller.users");

  router.get("/users", [isLoggedIn, isAdmin], (...args) =>
    usersController.index(...args)
  );

  router.get("/users/:id", [isLoggedIn, adminIsNotRequired], (...args) =>
    usersController.show(...args)
  );

  router.post("/users", [usersValidator.create, validate], (...args) =>
    usersController.create(...args)
  );

  router.put(
    "/users/:id",
    [isLoggedIn, adminIsNotRequired, usersValidator.update, validate],
    (...args) => usersController.update(...args)
  );

  router.delete("/users/:id", [isLoggedIn, isAdmin], (...args) =>
    usersController.delete(...args)
  );

  return router;
};
