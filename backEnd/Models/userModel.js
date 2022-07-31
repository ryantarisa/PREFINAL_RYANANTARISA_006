import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";
import uniqueValidator from "mongoose-unique-validator";

const UsersSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "E-mail is required"],
      lowercase: true,
      validate: [isEmail, "Please enter a valid email"],
      unique: [true, "Email is already taken!"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
    firstname: { type: String, required: [true, "First name is required"] },
    lastname: { type: String, required: [true, "Last name is required"] },
    isAdmin: { type: Boolean, required: false },
    isVerified: { type: Boolean, required: false },
    profilePicture: String,
    coverPicture: String,
    bio: String,
  },
  { timestamps: true }
);
UsersSchema.plugin(uniqueValidator);
const UserModel = mongoose.model("Users", UsersSchema);
export default UserModel;
