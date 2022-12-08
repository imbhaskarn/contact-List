import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
dotenv.config();
import { User } from "../models/index.js";
import UserError from "../utils/UserError.js";
import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
export const RegisterUser = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        return bcrypt.hash(password, 10); // return bcrypt promise
      }
      throw new UserError(401, `username ${username} is already registered!`);
    })
    .then(async (passwordHash) => {
      if (passwordHash) {
        return User.create({
          username: username,
          password: passwordHash,
        });
      }
    })
    .then((user) => {
      return res.status(201).json({
        result: "success",
        message: `${user.username} Registration successfull!`,
      });
    })
    .catch((err) => {
      console.log(err);
      if ((err.name = "UserError")) {
        return res.json({ result: "fail", message: err.message });
      }
      if (err) {
        return res.json({ result: "error" });
      }
    });
};

export const GenerateToken = (req, res) => {
  const { username, password } = req.body;
  User.findOne({ where: { username: username } })
    .then((user) => {
      if (user) {
        return bcrypt.compare(password, user.password);
      }
      throw new UserError(401, "username is not registered!");
    })
    .then((isMatch) => {
      if (!isMatch) {
        return res
          .status(403)
          .json({ message: `Invalid username or password.` });
      }
      const token = jwt.sign({ username: username }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24,
      });
      return res
        .status(201)
        .json({
          result: "success",
          message: `Token is generated succefully ${username}`,
          data: [{ access_token: token }],
        });
    });
};
