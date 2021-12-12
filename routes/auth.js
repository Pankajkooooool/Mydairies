const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "WElcometomylamesite";
let success = false


//Route:1 Create a User using SignUP: POST "/api/auth/createuser". Dosen't require Auth

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a strong password").isLength({ min: 5 }),
    body("name", "Please enter longer Name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //IF there are any errors then
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //If a user with the email already exist
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a User with this email already exists" });
      }

      //Hashing and Salting the passcode
      const salt = await bcrypt.genSalt(10);
      const securePasscode = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        // Create A new user using mongoose models
        name: req.body.name,
        password: securePasscode,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      //Return a User info with authentication token
      res.json({ success,authToken });
    } catch (error) {
      console.error(error.message); //Idealy U must use logger or sqs to log this but this is new 'marked imp::'
      res.status(500).send("Internel Server Error");
    }
  }
);

//Route 2: Login a User using: POST "/api/auth/login". Dosen't require Auth
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Cannot be blank").exists(),
  ],
  async (req, res) => {
    //IF there are any errors then
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      console.error(error.message); //Idealy U must use logger or sqs to log this but this is new 'marked imp::'
      res.status(500).send("Internal Server ERROR");
    }
  }
);

// Route 3:  Get logged-in user details using POST:   Login Required
router.post(
  "/getuser",fetchuser,  async (req, res) => {

    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user); 
    } catch (error) {
      console.error(error.message); //Idealy U must use logger or sqs 
      res.status(500).send("Internal Server ERROR");
    }
  })

module.exports = router;
