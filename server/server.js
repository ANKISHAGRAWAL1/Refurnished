 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors("*"));
app.use(express.static("./public"))

app.use("/ref/category",require("./routers/CategoryRouter"))
app.use("/ref/brand",require("./routers/brandrouter"))
app.use("/ref/color",require("./routers/color_router"))

mongoose
  .connect
  ("mongodb+srv://ankish:ankish94@cluster0.ulea86u.mongodb.net/Refurnished")
  .then(() => {
    console.log("Database connected");

    app.listen(5050, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.log("Database not connected");
    console.log(err);
  });