const ClothingItem = require("../models/clothingitem");
const {
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
} = require("../utils/errors");

const handleError = (err, res) => {
  console.error(err);
  if (err.name === "ValidationError" || err.name === "CastError") {
    return res.status(BAD_REQUEST).send({ message: "Invalid data" });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(NOT_FOUND).send({ message: "Item not found" });
  }
  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error has occurred on the server." });
};
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => handleError(err, res));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => handleError(err, res));
};
const deleteItem = (req, res) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You cannot delete another user's item" });
      }
      return item
        .deleteOne()
        .then(() => res.status(200).send({ message: "Item deleted" }));
    })
    .catch((err) => handleError(err, res));
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => handleError(err, res));
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => handleError(err, res));
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
