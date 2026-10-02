const router = require("express").Router();

const { createItem } = require("../controllers/clothingitems");

router.posr("/", createItem);

module.exports = router;
