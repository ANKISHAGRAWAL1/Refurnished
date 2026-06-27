const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
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

    modelNumber: {
      type: String,
      required: true,
      trim: true,
    },

    generation: {
      type: String,
      required: true,
      trim: true,
    },

    releaseYear: {
      type: Number,
      default: null,
    },

    displaySize: {
      type: String,
      required: true,
      trim: true,
    },

    touchSupport: {
      type: Boolean,
      default: false,
    },

    keyboardType: {
      type: String,
      enum: ["Backlit", "Non-Backlit"],
      default: "Non-Backlit",
    },

    fingerprintSupport: {
      type: Boolean,
      default: false,
    },

    graphicsType: {
      type: String,
      enum: ["Integrated", "Dedicated"],
      default: "Integrated",
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
      required: true,
    },

    seriesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "series",
      required: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("model", modelSchema);