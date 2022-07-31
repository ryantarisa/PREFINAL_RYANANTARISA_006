import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import { transporter } from "../helper/nodemailer.js";
import { createToken } from "../helper/CreateToken.js";
import { handlebarOptions } from "../helper/handlebars.js";
import hbs from "nodemailer-express-handlebars";
import bcrypt from "bcrypt";

// register
export const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPass;
  const newUser = new UserModel(req.body);
  const { username, email } = req.body;

  try {
    const existUser = await UserModel.findOne({ username });
    const existEmail = await UserModel.findOne({ email });

    if (existUser) {
      return res.status(400).send({ message: "Username already taken" });
    }

    if (existEmail) {
      return res.status(400).send({ message: "E-mail already taken" });
    }

    const user = await newUser.save();
    const token = createToken({ username: user.username, id: user._id });

    transporter.use("compile", hbs(handlebarOptions));

    let mail = {
      from: "kuperhubid@gmail.com",
      // bisa diganti menjadi email user saat input, tetapi untuk contoh jadi email ini:
      to: "antarisaryan@gmail.com",
      subject: "KUPERTALKS Account Verification",
      template: "email",
      context: {
        user: user.username,
        token: token,
      },
    };

    transporter.sendMail(mail, (errMail, resMail) => {
      if (errMail) {
        console.log(errMail);
      }
      res.status(200).send({
        message: "Token Sent!",
        success: true,
      });
    });

    res.status(200).send({
      message: "Registration Success, check your email for verification",
      user,
      token,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// log in
export const loginUser = async (req, res, done) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({
      $or: [{ email: username }, { username: username }],
    });
    if (user) {
      const validate = await bcrypt.compare(password, user.password);

      if (!validate) {
        res.status(400).send({ message: "User or Password is incorrect!" });
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({ user, token });
      }
    } else {
      res.status(404).send("User does not exist. Please Register");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
