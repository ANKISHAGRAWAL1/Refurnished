const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image:[ {
      type: String,
      default: "",
    }],


    categoryId:[ {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },],

     isActive: {
      type: Boolean,
      default: true,
    },

    isHome: {
      type: Boolean,
      default: true,
    },
     isTop: {
      type: Boolean,
      default: true,
    },
      isPopular: {
      type: Boolean,
      default: true,
    },
     isBest: {
      type: Boolean,
      default: true,
    },
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("brand", brandSchema);