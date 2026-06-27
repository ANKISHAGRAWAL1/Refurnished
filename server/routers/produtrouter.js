const express = require("express");
const productRouter = express.Router();

const fileUploader = require("express-fileupload");

const {
  create,
  get,
} = require("../controllers/productController");

// Create Product
productRouter.post(
  "/create",
  fileUploader({ createParentPath: true }),
  create
);

// Get All Products
productRouter.get("/", get);

module.exports = productRouter;