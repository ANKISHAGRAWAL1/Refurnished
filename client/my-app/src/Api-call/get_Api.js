import axios from "axios";

export const getcategory = async () => {
  try {
    const response = await axios.get("http://localhost:5050/ref/category");
    if(response.data.success){
    return response.data 
}
else{
    throw new Error("Fail Api")
}
  } catch (error) {
    console.log(error);
    throw new Error
  }

};