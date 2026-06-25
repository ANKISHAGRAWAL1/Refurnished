const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },

    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "brand",
    },

    images: [String],

    // Pricing
    price: Number,
    discount: {
      type: Number,
      default: 0, // percentage
    },
    finalPrice: Number,

    // Specifications
    processor: String,
    generation: String, // 8th Gen, 10th Gen, Ryzen 5 etc.
    ram: String, // 8GB, 16GB
    storage: String, // 256GB SSD
    graphics: String,
    displaySize: String,
    operatingSystem: String,
    color: String,

    // Refurbished Details
    condition: {
      type: String,
      enum: ["Excellent", "Good", "Fair"],
    },

    batteryHealth: String,

    // Inventory
    stock: Number,
    sku: String,

    // Descriptions
    shortDescription: String,
    description: String,

    // Flags
    status: {
      type: Boolean,
      default: true,
    },
    featured: Boolean,
    popular: Boolean,
    top: Boolean,
    bestSeller: Boolean,

    // SEO
    metaTitle: String,
    metaDescription: String,
    keywords: [String],

    // Ratings
    averageRating: {
      type: Number,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    touchScreen: {
  type: String,
  enum: ["Touch", "Non-Touch"],
  default: "Non-Touch",
},

  },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);