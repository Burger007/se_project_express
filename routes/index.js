const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingitems");
const { NOT_FOUND } = require("../utils/errors");

router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Request resource not found" });
});

router.use((req, res) => {
  res.status(500).send({ message: "Router nto found" });
});

module.exports = router;
