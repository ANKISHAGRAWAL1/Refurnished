const express = require("express");
const fileuploader = require("express-fileupload");
const {
  create,
  getAll,
  getSingle,
  remove,
} = require("../controllers/modelController");

const modelRouter = express.Router();

modelRouter.post(
  "/create",
  fileuploader({ createParentPath: true }),
  create
);
modelRouter.get("/", getAll);

modelRouter.get("/:slug", getSingle);

modelRouter.delete("/:slug", remove);

module.exports = modelRouter;