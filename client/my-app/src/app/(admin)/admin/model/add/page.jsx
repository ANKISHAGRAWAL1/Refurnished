 "use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Select from "react-select";
import { useRouter } from "next/navigation";

import {
  getcategory,
  brand as getBrand,
  getseries,
} from "@/Api-call/get_Api";

import { client, notify } from "@/app/components/utils/helper";

export default function ModelAddPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [series, setSeries] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const [touchSupport, setTouchSupport] = useState(false);
  const [fingerprintSupport, setFingerprintSupport] = useState(false);
  const [selectedGeneration, setSelectedGeneration] = useState(null);

  const imageRef = useRef();

  const nameref = useRef();
  const slugref = useRef();
  const modelNumberRef = useRef();
  const displaySizeRef = useRef();
  const keyboardTypeRef = useRef();
  const graphicsTypeRef = useRef();

  // slug generator
  const createSlug = () => {
    let value = nameref.current.value;

    if (!value) {
      slugref.current.value = "";
      return;
    }

    value =
      value.charAt(0).toUpperCase() +
      value.slice(1).toLowerCase();

    nameref.current.value = value;

    slugref.current.value = value
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-");
  };

  // fetch category
  const fetchCategory = async () => {
    try {
      const res = await getcategory();
      setCategory(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch brand
  const fetchBrand = async () => {
    try {
      const res = await getBrand();
      setBrands(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // fetch series
  const fetchSeries = async () => {
    try {
      const res = await getseries();
      setSeries(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchBrand();
    fetchSeries();
  }, []);


    // options
  const categoryOptions = category.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const brandOptions = useMemo(() => {
    return brands
      .filter((item) => {
        if (!selectedCategory) return false;
        return item.categoryId?._id === selectedCategory.value;
      })
      .map((item) => ({
        value: item._id,
        label: item.name,
      }));
  }, [brands, selectedCategory]);

  const seriesOptions = useMemo(() => {
    return series
      .filter((item) => {
        if (!selectedBrand) return false;
        return item.brandId?._id === selectedBrand.value;
      })
      .map((item) => ({
        value: item._id,
        label: item.name,
      }));
  }, [series, selectedBrand]);

  const generationOptions = [
    { value: "1st Gen", label: "1st Gen" },
    { value: "2nd Gen", label: "2nd Gen" },
    { value: "3rd Gen", label: "3rd Gen" },
    { value: "4th Gen", label: "4th Gen" },
    { value: "5th Gen", label: "5th Gen" },
    { value: "6th Gen", label: "6th Gen" },
    { value: "7th Gen", label: "7th Gen" },
    { value: "8th Gen", label: "8th Gen" },
    { value: "9th Gen", label: "9th Gen" },
    { value: "10th Gen", label: "10th Gen" },
    { value: "11th Gen", label: "11th Gen" },
    { value: "12th Gen", label: "12th Gen" },
    { value: "13th Gen", label: "13th Gen" },
    { value: "14th Gen", label: "14th Gen" },
    { value: "15th Gen", label: "15th Gen" },
  ];

  // submit
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !selectedBrand || !selectedSeries) {
      notify("Category, Brand & Series required", false);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", nameref.current.value);
      formData.append("slug", slugref.current.value);
      formData.append("modelNumber", modelNumberRef.current.value);
      formData.append("generation", JSON.stringify(selectedGeneration));
      formData.append("displaySize", displaySizeRef.current.value);
      formData.append("touchSupport", touchSupport);
      formData.append("fingerprintSupport", fingerprintSupport);

      formData.append("keyboardType", keyboardTypeRef.current.value);
      formData.append("graphicsType", graphicsTypeRef.current.value);

      formData.append("categoryId", selectedCategory.value);
      formData.append("brandId", selectedBrand.value);
      formData.append("seriesId", selectedSeries.value);

      if (imageRef.current?.files[0]) {
        formData.append("image", imageRef.current.files[0]);
      }

      const res = await client.post("model/create", formData);

      notify(res.data.message, res.data.success);

      if (res.data.success) {
        router.push("/admin/model");
      }
    } catch (err) {
      notify(err.response?.data?.message || "Error", false);
    } finally {
      setLoading(false);
    }}
  };