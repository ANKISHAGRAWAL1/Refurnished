const model_model = require("../models/model");

const {
  sendBadrequest,
  sendConflict,
  sendOk,
  sendNotfound,
  sendServerError,
  sendcreated,
} = require("../utils/res");

const { uniquename } = require("../utils/helper");


// Create
const create = async (req, res) => {
  try {
    const image = req.files?.image;
    const {
      name,
      modelNumber,
      generation,
      releaseYear,
      displaySize,
      touchSupport,
      keyboardType,
      fingerprintSupport,
      graphicsType,
      categoryId,
      brandId,
      seriesId,
    } = req.body;

    if (
      !name ||
      !generation,
      !generation ||
      !displaySize ||
      !categoryId ||
      !brandId ||
      !seriesId
    ) {
      return sendBadrequest(res, "All required fields are mandatory");
    }

    const slug = uniquename(name);

    const exist = await model_model.findOne({ slug });

    if (exist) {
      return sendConflict(res, "Model already exists");
    }

    await model_model.create({
      name,
      slug,
     
      generation,
      
      displaySize,
      touchSupport,
      keyboardType,
      fingerprintSupport,
      graphicsType,
      categoryId,
      brandId,
      seriesId,
      image: image ? image.name : "",
    });

    return sendcreated(res, "Model created successfully");
  } catch (error) {
    return sendServerError(res, error.message);
  }
};


// Get All
const getAll = async (req, res) => {
  try {
    const models = await model_model
      .find()
      .populate("categoryId")
      .populate("brandId")
      .populate("seriesId")
      .sort({ createdAt: -1 });

    return sendOk(res, "Models found", models, {
      baseurl: "http://localhost:5050/model/",
    });
  } catch (error) {
    return sendServerError(res, error.message);
  }
};


// Get Single
const getSingle = async (req, res) => {
  try {
    const { slug } = req.params;

    const model = await model_model
      .findOne({ slug })
      .populate("categoryId")
      .populate("brandId")
      .populate("seriesId");

    if (!model) {
      return sendNotfound(res, "Model not found");
    }

    return sendOk(res, "Model found", model, {
      baseurl: "http://localhost:5050/model/",
    });
  } catch (error) {
    return sendServerError(res, error.message);
  }
};


// Delete
const remove = async (req, res) => {
  try {
    const { slug } = req.params;

    const model = await model_model.findOne({ slug });

    if (!model) {
      return sendNotfound(res, "Model not found");
    }

    await model.deleteOne();

    return sendOk(res, "Model deleted successfully");
  } catch (error) {
    return sendServerError(res, error.message);
  }
};


module.exports = {
  create,
  getAll,
  getSingle,
  remove,
};