const Series = require("../models/series_model");
const { sendOk, sendBadrequest, sendNotfound, sendServerError, sendsuccess } = require("../utils/res");
const { uniquename } = require("../utils/helper");

// CREATE SERIES
const create = async (req, res) => {
  try {
    const { name, brandId, categoryId, description } = req.body;

    if (!name || !brandId || !categoryId) {
      return sendBadrequest(res, "Name, Brand and Category are required");
    }

    const slug = uniquename(name);

    const exists = await Series.findOne({ slug });
    if (exists) {
      return sendBadrequest(res, "Series already exists");
    }

    const series = await Series.create({
      name,
      slug,
      brandId,
      categoryId,
      description,
    });

    return sendOk(res, "Series created successfully", series);
  } catch (error) {
    return sendServerError(res, error.message);
  }
};

 

// # 📥 GET ALL SERIES

const getAll = async (req, res) => {
  try {
    const { brandId } = req.query;

    let filter = {};

    if (brandId) {
      filter.brandId = brandId;
    }

    const data = await Series
      .find(filter)
      .populate("brandId")
      .populate("categoryId");

    return res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

 

// # 📥 GET SINGLE SERIES

const getSingle = async (req, res) => {
  try {
    const { id } = req.params;

    const series = await Series.findById(id)
      .populate("brandId")
      .populate("categoryId");

    if (!series) {
      return sendNotfound(res, "Series not found");
    }

    return sendOk(res, "Series found", series);
  } catch (error) {
    return sendServerError(res, error.message);
  }
};

 

 

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const series = await Series.findById(id);
    if (!series) {
      return sendNotfound(res, "Series not found");
    }

    const { name, brandId, categoryId, description } = req.body;

    if (name) {
      series.name = name;
      series.slug = uniquename(name);
    }

    if (brandId) series.brandId = brandId;
    if (categoryId) series.categoryId = categoryId;
    if (description) series.description = description;

    await series.save();

    return sendOk(res, "Series updated successfully", series);
  } catch (error) {
    return sendServerError(res, error.message);
  }
};

 

 

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const series = await Series.findById(id);
    if (!series) {
      return sendNotfound(res, "Series not found");
    }

    await series.deleteOne();

    return sendOk(res, "Series deleted successfully");
  } catch (error) {
    return sendServerError(res, error.message);
  }
};

module.exports = {
  create,
  getAll,
  getSingle,
  update,
  remove,
};