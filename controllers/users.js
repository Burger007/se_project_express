const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .send({ MessageChannel: "An error in the server occured" });
    });
};

module.exports = { getUsers };
