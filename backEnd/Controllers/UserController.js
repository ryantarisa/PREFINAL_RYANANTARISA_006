import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json("User Not Found");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (id) {
    try {
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You are not logged in as this profile");
  }
};

export const verifyUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({ _id: id });
    if (user) {
      // console.log(user.isVerified);
      user.isVerified = true;
      user.save();
    } else {
      console.log("email is not verified");
    }

    // await UserModel.findByIdAndUpdate(id, req.body, {
    //   new: true,
    // });

    res.status(200).send({ message: "User Verified", result });
  } catch (error) {}
};
