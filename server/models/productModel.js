const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    // ===========================
    // Basic Information
    // ===========================
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    shortDescription: String,
    description: String,

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

    colorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "color",
    },

    // ===========================
    // Laptop Details
    // ===========================

    model: String,
    series: String,

    processor: {
      brand: String,          // Intel / AMD
      series: String,         // Core i5 / Ryzen 5
      generation: String,     // 11th Gen
      model: String,          // 1135G7
      speed: String,          // 2.40 GHz
      cores: Number,
      threads: Number,
    },

    ram: {
      size: Number,           // 8 / 16 / 32
      type: String,           // DDR4
      expandable: Number,     // 32
    },

    storage: {
      size: Number,           // 256 / 512 / 1024
      type: String,           // SSD / HDD / NVMe
      expandable: Boolean,
    },

    graphics: {
      type: String,           // Integrated / Dedicated
      brand: String,          // Intel / NVIDIA / AMD
      model: String,
      memory: Number,         // 2GB / 4GB
    },

    display: {
      size: Number,           // 14
      resolution: String,     // FHD
      refreshRate: Number,    // 60
      panel: String,          // IPS / TN
      touch: {
        type: Boolean,
        default: false,
      },
    },

    battery: {
      health: Number,         // 90
      backup: String,         // 4-5 Hours
    },

    operatingSystem: String,

    connectivity: {
      wifi: String,
      bluetooth: String,
      webcam: Boolean,
      fingerprint: Boolean,
      backlitKeyboard: Boolean,
    },

    ports: {
      hdmi: Boolean,
      usb2: Number,
      usb3: Number,
      usbC: Number,
      ethernet: Boolean,
      audioJack: Boolean,
      vga: Boolean,
    },

    // ===========================
    // Refurbished Details
    // ===========================

    condition: {
      type: String,
      enum: ["Refurbished", "Used", "New"],
      default: "Refurbished",
    },

    grade: {
      type: String,
      enum: ["A+", "A", "B", "C"],
      default: "A",
    },

    warranty: {
      type: Number, // Months
      default: 6,
    },

    serialNumber: String,

    chargerIncluded: {
      type: Boolean,
      default: true,
    },

    tested: {
      type: Boolean,
      default: true,
    },

    // ===========================
    // Pricing
    // ===========================

    purchasePrice: Number,

    sellingPrice: {
      type: Number,
      required: true,
    },

     originalPrice: {
      type: Number,
      required: true,
    },



    discountPrice: Number,
    averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
},

reviewCount: {
    type: Number,
    default: 0,
},

   

    // ===========================
    // Inventory
    // ===========================

    stock: {
      type: Number,
      default: 0,
    },

    lowStockAlert: {
      type: Number,
      default: 5,
    },

    // ===========================
    // Images
    // ===========================

    thumbnail: {
      type: String,
      required: true,
    },

    images: [String],

    // ===========================
    // Status
    // ===========================

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

    

    // ===========================
    // SEO
    // ===========================

    metaTitle: String,

    metaDescription: String,

    keywords: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);