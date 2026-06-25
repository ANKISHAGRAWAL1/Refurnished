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
const { uniquename } = require("../utils/helper");

const creat = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return sendBadrequest(res, "Image is required");
    }

    const image = req.files.image;
    const { name, slug } = req.body;

    if (!name || !slug) {
      return sendBadrequest(res, "Name and slug are required");
    }

    // Duplicate check
    const existingCategory = await category_model.findOne({ slug });

    if (existingCategory) {
      return sendConflict(res, "Category already exists");
    }

    // Unique image name
    const imag_name = uniquename(image.name);

    // Upload image
    const destination = `public/category/${imag_name}`;
    await image.mv(destination);

    // Save category
    const category = await category_model.create({
      name,
      slug,
      image: imag_name,
    });

    return sendcreated(res, "Category created successfully", category);
  } catch (error) {
    console.log(error);
    return sendServerError(res, error.message);
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
     baseurl:"http://localhost:5050/category/"
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
      return sendNotfound(res, "category not found");
    }

    const fields = [
      "isActive",
      "isHome",
      "isPopular",
      "isTop",
      "isBest",
    ];

    if (!fields.includes(field)) {
      return sendBadrequest(res, "Invalid field");
    }

    category[field] = !category[field];
    await category.save();

    return sendOk(res, `${field} updated successfully`, category);
  } catch (error) {
    console.log("error",error);
    return sendServerError(res, error.message);
  }
};


const deletebyid = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await category_model.findById(id);

    if (!category) {
      return sendNotfound(res, "Category not found");
    }

    await category_model.findByIdAndDelete(id);

    return sendOk(res, "Category Deleted");
  } catch (error) {
    console.log(error);
    return sendServerError(res, "Internal Server Error");
  }
};



const readbySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await category_model.findOne({ slug });
if (!category) {
      return sendNotfound(res, "Category not found");
    }

   return res.status(200).json({
      success: true,
      message: "Categories edited",
      data: category,
      meta: {
     baseurl:"http://localhost:5050/category/"
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


const edit = async (req, res) => {
  try {
    const image = req?.files?.image || null;
    const { slug } = req.params;
    console.log(req.body);
    console.log(req.files);

    const category = await category_model.findOne({ slug });
    console.log("edc",req.body)

    if (!category) {
      return sendNotfound(res, "Category not found");
    }

    let object = {};

    if (req.body?.name) {
      object.name = req.body.name;
      object.slug = req.body.slug;
    }

    if (image) {
      const category_image = uniquename(image.name);

      await image.mv(`./public/category/${category_image}`);

      object.image = category_image;
    }

    await category_model.findByIdAndUpdate(category._id, object);

    return sendOk(res, "Category updated successfully");

  } catch (error) {
    console.log(error);
    return sendServerError(res, error.message);
  }
};

 

module.exports = {
  creat,read,status,
  deletebyid,
  readbySlug,
  edit
};