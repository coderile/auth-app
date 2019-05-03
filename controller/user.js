//Import model if required
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//create all the function using module.exports

signinToken = user => {
  return (TOKEN = jwt.sign(
    {
      iss: "AMIT",
      sub: user._id,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 1)
    },
    "AMIT_KUMAR"
  ));
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;

    console.log(req.value.body);
    const newUser = new User({
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        newUser.password = hash;
      });
    });

    const foundUser = await User.findOne({ email });

    try {
      if (foundUser) {
        res.status(200).json({ message: "User already registed" });
      } else {
        await newUser.save();
        signinToken(newUser);
        res.status(200).json({ token: TOKEN });
      }
    } catch (error) {
      console.log(error);
    }
  },
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.value.body;
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res
          .status(400)
          .json({ message: "Invalid email id and password 1" });
      }
      const validPassword = await bcrypt.compare(password, foundUser.password);
      if (!validPassword) {
        console.log(password);

        console.log(foundUser.password);

        return res
          .status(400)
          .json({ message: "Invalid email id and password 2" });
      }
      signinToken(foundUser);
      res.status(200).json({ token: TOKEN });
    } catch (err) {
      console.log(err);
    }
  },

  secret: async (req, res, next) => {
    res.status(200).json({
      message: "Yes Got It"
    });
  }
};
