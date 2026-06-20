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