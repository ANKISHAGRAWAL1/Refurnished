"use client";

import BasicInfo from "@/components/product/BasicInfo";
import Processor from "@/components/product/Processor";
import Ram from "@/components/product/Ram";
import Storage from "@/components/product/Storage";
import Graphics from "@/components/product/Graphics";
import Display from "@/components/product/Display";
import Battery from "@/components/product/Battery";
import Connectivity from "@/components/product/Connectivity";
import Ports from "@/components/product/Ports";
import Refurbished from "@/components/product/Refurbished";
import Pricing from "@/components/product/Pricing";
import Inventory from "@/components/product/Inventory";
import Images from "@/components/product/Images";
import SEO from "@/components/product/SEO";
import Status from "@/components/product/Status";

export default function AddProductPage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Add New Product
        </h1>

        <form className="space-y-6">

          <BasicInfo />

          <Processor />

          <Ram />

          <Storage />

          <Graphics />

          <Display />

          <Battery />

          <Connectivity />

          <Ports />

          <Refurbished />

          <Pricing />

          <Inventory />

          <Images />

          <SEO />

          <Status />

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
          >
            Save Product
          </button>

        </form>

      </div>
    </div>
  );
}