const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
app.use(cors());
app.use(express.json());
const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.error(`listening on port ${PORT}`);
});
