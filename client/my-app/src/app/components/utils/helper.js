 import {   toast } from 'react-toastify';

 const notify=(msg,flag)=>toast(msg,{type:flag ? "success":"error" })
 export{
    notify
 }