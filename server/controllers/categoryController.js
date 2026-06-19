const category_model = require("../models/category_model");
const {
  sendBadrequest,
  sendConflict,
  sendOk,
  sendNotfound,
  sendServerError,
  sendcreated,
  sendsuccess,
} = require("../utils/res");

// Create Category
const creat = async (req, res) => {
  try {
    const { name, slug, image } = req.body;

    // Validation
    if (!name || !slug) {
      return sendBadrequest(res, "Name and slug are required");
    }

    // Duplicate check
    const existingCategory = await category_model.findOne({ slug });

    if (existingCategory) {
      return sendConflict(res, "Category already exists");
    }

    // Create category
    const category = await category_model.create({
      name,
      slug,
      image,
    });

    return sendcreated(res, "Category created successfully", category);
  } catch (error) {
    console.log(error);
    return sendServerError(res, "Internal Server Error");
  }
};

// Read All Categories
const read = async (req, res) => {
  try {
    const categories = await category_model.find();

    return res.status(200).json({
      success: true,
      message: "Categories found",
      data: categories,
      meta: {
     total: categories.length,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
 

// Update Status
const status = async (req, res) => {
  try {
    const { field } = req.body;
    const { id } = req.params;

    const category = await category_model.findById(id);

    if (!category) {
      return sendNotfound(res, "Category not found");
    }

  const fields = ["status", "popular", "top", "home", "best"];

    if (!fields.includes(field)) {
      return sendBadrequest(res, "Invalid field");
    }

    await category_model.findByIdAndUpdate(id, {
      [field]: !category[field],
    });

    return sendOk(res, "Status updated successfully");
  } catch (error) {
    console.log(error);
    return sendServerError(res, "Internal Server Error");
  }
};

module.exports = {
  creat,
  read,
  status,
};