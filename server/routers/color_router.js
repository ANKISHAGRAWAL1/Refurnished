const colorRouter = require("express").Router();

const {
  create,
  get,
  status,
  remove,
  readBySlug,
  edit,
} = require("../controllers/color_controller");

colorRouter.post("/create", create);
colorRouter.get("/", get);
colorRouter.get("/:slug", readBySlug);
colorRouter.patch("/status/:id", status);
colorRouter.patch("/update/:slug", edit);
colorRouter.delete("/delete/:id", remove);

module.exports = colorRouter;