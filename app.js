const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "6abfca5f2d7bd9c0563ad9f1",
  };
  next();
});
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.error(`listening on port ${PORT}`);
});
