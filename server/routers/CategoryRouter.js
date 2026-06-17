const categoryRouter = require("express").Router();
const{creat,read,status}=   require("../controllers/categoryController.js")

categoryRouter.post("/creat",creat)
categoryRouter.get("/",read)
categoryRouter.get("/update/:id",status)




module.exports =categoryRouter;
