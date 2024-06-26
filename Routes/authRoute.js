const express = require("express");
const createResponseObj = require("../utils/createResponseObj.js");
const { validate } = require("../Validations");
const {
  signinSchema,
  signupSchema,
} = require("../Validations/authValidation.js");
const { signin, signup } = require("../services/authService");

const router = express.Router();

router.post("/signup", validate(signupSchema), async (req, res) => {
  const data = req.body;
  const { email, password, username } = data;
  try {
    const newUser = await signup(email, password, username);
    const responseObj = createResponseObj(
      newUser,
      { message: "You succesfully registered." },
      200
    );
    res.status(200).send(responseObj);
  } catch (err) {
    console.error("error", err);
    res.status(500).send({ message: "Something went wrong" });
  }
});

router.post("/signin", validate(signinSchema), async (req, res) => {
  const data = req.body;
  const { email, password, username } = data;
  try {
    const { user, token } = await signin(email, password, username);
    const resObj = createResponseObj(
      user,
      { message: "You successfully loged in", token },
      200
    );
    res.status(200).send(resObj);
  } catch (err) {
    console.error("error", err);
    res.status(500).send({
      message: "Something went wrong.",
    });
  }
});

module.exports = router;
