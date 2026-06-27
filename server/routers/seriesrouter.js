const express = require("express");
const seriesrouter = express.Router();

const seriesController = require("../controllers/seriesController");

// CREATE
seriesrouter.post("/create", seriesController.create);

// GET ALL
seriesrouter.get("/", seriesController.getAll);

// GET SINGLE
seriesrouter.get("/get/:id", seriesController.getSingle);

// UPDATE
seriesrouter.put("/update/:id", seriesController.update);

// DELETE
seriesrouter.delete("/delete/:id", seriesController.remove);

module.exports = seriesrouter;