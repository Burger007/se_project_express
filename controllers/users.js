const User = require("../models/user");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ Message: "An error on the server occured" });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ Message: "Invalid data" });
      }
      return res
        .status(500)
        .send({ Message: "An error in the server occured" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId).then((user) => res.status(200).send(user);
  if (err.name === "CastError") {
    return res.status(NOT_FOUND).send({ message: "Invalid user ID" });
  }
  return res
  .status(INTERNAL_SERVER_ERROR)
  .send({message:"An error has occured on the server"});
});


module.exports = { getUsers, createUser, getUser };
