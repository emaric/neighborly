import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./config.js";

export const generateToken = (user) => {
  return jwt.sign(user, SECRET_KEY, {
    expiresIn: "1h",
  });
};

export const setCookieToken = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    domain: 'neighborly-app-api.onrender.com'
  });
};

export const authMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      const user = jwt.verify(token, SECRET_KEY);
      req.user = user;
    } catch (err) {
      req.user = null;
    }
  }
  next();
};
