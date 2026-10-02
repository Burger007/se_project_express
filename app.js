const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();

const { PORT = 3001 } = process.env;

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "PASTE_YOUR_TEST_USER__ID_HERE",
  };
  next();
});
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.error(`listenig on port ${PORT}`);
});
