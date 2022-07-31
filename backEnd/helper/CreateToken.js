import jwt from "jsonwebtoken";

export const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "12h",
  });
};
