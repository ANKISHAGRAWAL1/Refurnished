const categoryRouter = require("express").Router();
const { creat, read, status, deletebyid } = require("../controllers/categoryController.js");

categoryRouter.post("/creat",creat);
categoryRouter.get("/", read);
categoryRouter.patch("/update/:id", status);
categoryRouter.delete("/delete/:id", deletebyid);

module.exports = categoryRouter;