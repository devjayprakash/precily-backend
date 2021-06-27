const isEmpty = require("is-empty");

/**
 * This is the middleware responsible for validating user data
 */
let userValidator = (req, res, next) => {
  let data = req.body;
  let problems = [];

  if (isEmpty(data.name)) {
    problems.push("Name not given");
  }
  if (isEmpty(data.email)) {
    problems.push("Email id not given");
  } else {
    let re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!re.test(data.email)) {
      problems.push("Invalid email id provided");
    }
  }
  if (isEmpty(data.phoneNumber)) {
    problems.push("Phone number is not given");
  } else {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if (!re.test(data.phoneNumber)) {
      problems.push("Invalid phone number provided");
    }
  }
  if (isEmpty(data.address)) {
    problems.push("Address not given");
  }

  if (problems.length !== 0) {
    res.status(400).send({
      msg: "All the data are not provided or is invalid",
      errors: problems,
    });
  } else {
    next();
  }
};

module.exports = userValidator;
