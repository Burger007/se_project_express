const clothingItems = require("../models/clothingitem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((evt) => {
      res.status(500).send({ message: "Error from createItem", evt });
    });
};

module.exports = router;
