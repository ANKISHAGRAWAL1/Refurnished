import { client } from "@/app/components/utils/helper";
import axios from "axios";

export const getcategory = async () => {
  try {
    const response = await client.get("category");
    if(!response.data.success){
    throw new Error( response.data.message || "Fail Api")
}
return response.data
 
  } catch (error) {
    console.log(error);
    throw new Error
  }

};


export const findcategoryByslug = async (slug) => {
  try {
    const response = await client.get(`category/${slug}`);
    if(!response.data.success){
    throw new Error( response.data.message || "Fail Api")
}
return response.data
 
  } catch (error) {
    console.log(error);
    throw new Error
  }

};

// brand Api

export const brand= async () => {
  try {
    const response = await client.get("brand");
    if(!response.data.success){
    throw new Error( response.data.message || "Fail Api")
}
return response.data
 
  } catch (error) {
    console.log(error);
    throw new Error
  }

};


export const color= async () => {
  try {
    const response = await client.get("color");
    if(!response.data.success){
    throw new Error( response.data.message || "Fail Api")
}
return response.data
 
  } catch (error) {
    console.log(error);
    throw new Error
  }

};




export const findbrandByslug = async (slug) => {
  try {
    const response = await client.get(`brand/${slug}`);

    if (!response.data.success) {
      throw new Error(response.data.message || "API Failed");
    }

    return response.data;

  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Something went wrong");
  }
};
