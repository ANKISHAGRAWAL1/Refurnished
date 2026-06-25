const color_model = require("../models/colorModel");

const {
  sendBadrequest,
  sendConflict,
  sendOk,
  sendNotfound,
  sendServerError,
  sendsuccess,
  sendcreated,
} = require("../utils/res");


// Create Color
const create = async (req, res) => {
  try {
    const { name, slug, code } = req.body;

    if (!name || !slug || !code) {
      return sendBadrequest(res, "All fields are required");
    }

    const color = await color_model.findOne({
      $or: [{ name }, { slug }]
    });

    if (color) {
      return sendConflict(res, "Color already exists");
    }

    const newColor = await color_model.create({
      name,
      slug,
      code,
    });

    return sendcreated(res, "Color created successfully", newColor);

  } catch (error) {
    console.log(error)
    return sendServerError(res, error.message);
  }
};


// Read All Colors
const get = async (req, res) => {
  try {
    const colors = await color_model.find().sort({ createdAt: -1 });

    return sendsuccess(res, "Colors found", colors, {
      total: colors.length,
    });

  } catch (error) {
    return sendServerError(res, error.message);
  }
};


// Read By Slug
const readBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const color = await color_model.findOne({ slug });

    if (!color) {
      return sendNotfound(res, "Color not found");
    }

    return sendOk(res, "Color found", color);

  } catch (error) {
    return sendServerError(res, error.message);
  }
};


// Update Color
const edit = async (req, res) => {
  try {
    const { slug } = req.params;

    const color = await color_model.findOne({ slug });

    if (!color) {
      return sendNotfound(res, "Color not found");
    }

    let object = {};

    if (req.body?.name) object.name = req.body.name;
    if (req.body?.slug) object.slug = req.body.slug;
    if (req.body?.code) object.code = req.body.code;

    await color_model.findByIdAndUpdate(color._id, object);

    return sendOk(res, "Color updated successfully");

  } catch (error) {
    return sendServerError(res, error.message);
  }
};


// Toggle Status
const status = async (req, res) => {
  try {
    const { id } = req.params;

    const color = await color_model.findById(id);

    if (!color) {
      return sendNotfound(res, "Color not found");
    }

    color.isActive = !color.isActive;

    await color.save();

    return sendOk(res, "Status updated successfully", color);

  } catch (error) {
    return sendServerError(res, error.message);
  }
};


// Delete
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const color = await color_model.findById(id);

    if (!color) {
      return sendNotfound(res, "Color not found");
    }

    await color_model.findByIdAndDelete(id);

    return sendOk(res, "Color deleted successfully");

  } catch (error) {
    return sendServerError(res, error.message);
  }
};

module.exports = {
  create,
  get,
  readBySlug,
  edit,
  status,
  remove,
};