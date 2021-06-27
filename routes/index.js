let router = require("express").Router();
let auth = require("./user");

router.use("/user", auth);

module.exports = router;
