import axios from "axios"

const fetchcategory =async()=>{
    try {
 const response =await axios.get("http://localhost:5050/ref/category")
 console.log(response);
 return response;
        
    } catch (error) {
        return null
        
    }
}
module.exports={fetchcategory}