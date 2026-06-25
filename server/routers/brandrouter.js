const brandrouter = require("express").Router();
const fileUpload = require("express-fileupload");

const {
  create,
  get,
  status,
  readbySlug,
  edit,
  deletebyid
} = require("../controllers/brandController");

// Create Brand
brandrouter.post(
  "/create",
  fileUpload({ createParentPath: true }),
  create
);

// Get All Brands
brandrouter.get("/", get);

// Get Brand By Slug
brandrouter.get("/:slug", readbySlug);

// Update Brand Status
brandrouter.patch("/update/:id", status);

// Edit Brand
brandrouter.patch(
  "/brand_update/:slug",
  fileUpload({ createParentPath: true }),
  edit
);
brandrouter.delete("/delete/:id", deletebyid);

module.exports = brandrouter;