const categoryRouter = require("express").Router();
const { creat, read,readbySlug, status, deletebyid,edit } = require("../controllers/categoryController.js");
const fileuploader = require ("express-fileupload")

categoryRouter.post("/creat",fileuploader({createParentPath:true}),creat);
categoryRouter.get("/", read);
categoryRouter.patch("/update/:id",status);


categoryRouter.patch("/slug_update/:slug",fileuploader({ createParentPath: true }),edit);


categoryRouter.get("/:slug", readbySlug);
 
categoryRouter.delete("/delete/:id", deletebyid);

module.exports = categoryRouter;