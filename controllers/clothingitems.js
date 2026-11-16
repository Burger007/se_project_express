const ClothingItem = require("../models/clothingitem");

const BadRequestError = require("../errors/BadRequestError");
const ForbiddenError = require("../errors/ForbiddenError");
const NotFoundError = require("../errors/NotFoundError");

const handleError = (err, next) => {
  if (err.name === "ValidationError" || err.name === "CastError") {
    return next(new BadRequestError("Invalid data"));
  }
  if (err.name === "DocumentNotFoundError") {
    return next(new NotFoundError("Item not found"));
  }
  return next(err);
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => handleError(err, next));
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => handleError(err, next));
};
const deleteItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You cannot delete another user's item");
      }
      return item
        .deleteOne()
        .then(() => res.status(200).send({ message: "Item deleted" }));
    })
    .catch((err) => handleError(err, next));
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => handleError(err, next));
};

const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => handleError(err, next));
};

module.exports = { getItems, createItem, deleteItem, likeItem, dislikeItem };
