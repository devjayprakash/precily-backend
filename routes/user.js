let router = require("express").Router();
let userValidator = require("../validators/userValidator");
let User = require("../db/models/user");
const isEmpty = require("is-empty");

//this is the route hander for creating a user
router.post("/createUser", userValidator, (req, res, next) => {
  let userData = req.body;
  let user = new User(userData);
  user
    .save()
    .then((savedUser) => {
      res.send({
        result: true,
        msg: "New user created successfully",
        user: savedUser,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/allUsers", (req, res, next) => {
  User.find((err, docs) => {
    if (err) {
      next(err);
    } else {
      res.send({
        result: true,
        users: docs,
      });
    }
  });
});

router.post("/updateUser/:userId", userValidator, async (req, res, next) => {
  let userId = req.params.userId;
  let userData = req.body;

  if (isEmpty(userId)) {
    next(new Error("Url params not found"));
  } else {
    try {
      let doc = await User.findOne({ _id: userId });
      if (isEmpty(doc)) {
        res.send({
          result: false,
          msg: "No user found with the given id",
        });
      } else {
        doc.overwrite(userData);

        await doc.save();

        res.send({
          result: true,
          msg: "User updated successfully",
        });
      }
    } catch (err) {
      next(err);
    }
  }
});

router.delete("/deleteUser/:userId", async (req, res, next) => {
  let userId = req.params.userId;
  if (isEmpty(userId)) {
    next(new Error("Url params not found"));
  } else {
    try {
      await User.deleteOne({ _id: userId });
      res.send({
        result: true,
        msg: "User deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
});

module.exports = router;
