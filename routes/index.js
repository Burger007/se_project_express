const router = require("express").Router();

const userRouter = require("./users");
const itemRouter = require("./clothingitems");
const NotFoundError = require("../errors/NotFoundError");
const { login, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signup", createUser);
router.use("/users", userRouter);
router.use("/items", itemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
