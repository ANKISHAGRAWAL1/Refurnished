const product_model = require("../models/productModel");
const { uniquename } = require("../utils/helper");
const slugify = require("slugify");

const {
  sendBadrequest,
  sendConflict,
  sendcreated,
  sendServerError,
} = require("../utils/res");

const create = async (req, res) => {
  try {
    const thumbnail = req.files?.thumbnail;
    const gallery = req.files?.images;

    if (!thumbnail) {
      return sendBadrequest(res, "Thumbnail is required");
    }

    const {
      name,
      sku,
      categoryId,
      brandId,
      sellingPrice,
      originalPrice,
    } = req.body;

    if (!name) return sendBadrequest(res, "Product name is required");
    if (!sku) return sendBadrequest(res, "SKU is required");
    if (!categoryId) return sendBadrequest(res, "Category is required");
    if (!brandId) return sendBadrequest(res, "Brand is required");
    if (!sellingPrice)
      return sendBadrequest(res, "Selling price is required");
    if (!originalPrice)
      return sendBadrequest(res, "Original price is required");

    const slug = slugify(name, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Duplicate Name
    const existName = await product_model.findOne({ slug });

    if (existName) {
      return sendConflict(res, "Product already exists");
    }

    // Duplicate SKU
    const existSku = await product_model.findOne({ sku });

    if (existSku) {
      return sendConflict(res, "SKU already exists");
    }

    // Upload Thumbnail
    const thumbnailName = uniquename(thumbnail.name);

    await thumbnail.mv(
      process.cwd() + "/public/product/" + thumbnailName
    );

    // Upload Gallery
    let images = [];

    if (gallery) {
      if (Array.isArray(gallery)) {
        for (const image of gallery) {
          const filename = uniquename(image.name);

          await image.mv(
            process.cwd() + "/public/product/" + filename
          );

          images.push(filename);
        }
      } else {
        const filename = uniquename(gallery.name);

        await gallery.mv(
          process.cwd() + "/public/product/" + filename
        );

        images.push(filename);
      }
    }

    const product = await product_model.create({
      ...req.body,
      slug,
      thumbnail: thumbnailName,
      images,
    });

    return sendcreated(
      res,
      "Product created successfully",
      product,
      {
        baseurl: "http://localhost:5050/product/",
      }
    );
  } catch (error) {
    console.log(error);
    return sendServerError(res, error.message);
  }
};



const get = async (req, res) => {
  try {
    const products = await product_model
      .find()
      .populate("categoryId")
      .populate("brandId")
      .populate("colorId")
      .sort({ createdAt: -1 });

    return sendOk(res, "Products found", products, {
      meta: {
        baseurl: "http://localhost:5050/product/",
      },
    });
  } catch (error) {
    return sendServerError(res, error.message);
  }
};

module.exports = {
  create,
};