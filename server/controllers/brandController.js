const brand_model =require ("../models/brandmodel")

const {
  sendBadrequest,
  sendConflict,
  sendOk,
  sendNotfound,
  sendServerError,
  sendcreated,
  sendsuccess,
} = require("../utils/res");
const { uniquename } = require("../utils/helper");


 const create = async (req, res) => {
  try {
    const image = req.files?.image;
    const { name, slug ,categoryId} = req.body;

    if (!name || !slug || !categoryId ||  !image) {
      return sendBadrequest(res, "All fields are required");
    }

    const exist = await brand_model.findOne({ slug });

    if (exist) {
      return sendConflict(res, "Brand already exists");
    }
     const imag_name = uniquename(image.name);

    // Upload image
    const destination = `public/brand/${imag_name}`;
    await image.mv(destination);
     const brand = await brand_model.create({
      name,
      slug,
      image: imag_name,
     categoryId :JSON.parse(categoryId)
    });

    return sendcreated(res, "Brand created successfully", brand);
  } catch (error) {
    console.log(error)
    return sendServerError(res, error.message);
  }
};



const get = async (req, res) => {
  try {
    const brand = await brand_model
      .find()
      .populate("categoryId","name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Brand found",
      data: brand,
      meta: {
        total: brand.length,
        baseurl: "http://localhost:5050/brand/",
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



const status = async (req, res) => {
  try {
    const { field } = req.body;
    const { id } = req.params;

    const brand = await brand_model.findById(id);

    if (!brand) {
      return sendNotfound(res, "Brand not found");
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

    brand[field] = !brand[field];
    await brand.save();

    return sendOk(res, `${field} updated successfully`, brand);
  } catch (error) {
    console.log("error",error);
    return sendServerError(res, error.message);
  }
};




const readbySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const brand = await brand_model.findOne({ slug });
if (!brand) {
      return sendNotfound(res, "Category not found");
    }

   return res.status(200).json({
      success: true,
      message: "bradn edited",
      data: category,
      meta: {
     baseurl:"http://localhost:5050/brand/"
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

    const brand = await brand_model.findOne({ slug });

    if (!brand) {
      return sendNotfound(res, "Brand not found");
    }

    let object = {};

    if (req.body?.name) {
      object.name = req.body.name;
    }

    if (req.body?.slug) {
      object.slug = req.body.slug;
    }

    if (image) {
      const brand_image = uniquename(image.name);

      await image.mv(`./public/brand/${brand_image}`);

      object.image = brand_image;
    }

    await brand_model.findByIdAndUpdate(brand._id, object);

    return sendOk(res, "Brand updated successfully");

  } catch (error) {
    console.log(error);
    return sendServerError(res, error.message);
  }
};



const deletebyid = async (req, res) => {
  try {
    const { id } = req.params;

    const brand = await brand_model.findById(id);

    if (!brand) {
      return sendNotfound(res, "brand not found");
    }

    await brand_model.findByIdAndDelete(id);

    return sendOk(res, "brandDeleted");
  } catch (error) {
    console.log(error);
    return sendServerError(res, "Internal Server Error");
  }
};





module.exports ={create,get,status,readbySlug,edit,deletebyid}



