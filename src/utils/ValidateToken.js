import { jsonwebtoken as jwt } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const collectToken = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

export default async (req, res, next) => {
  const token = collectToken(req);
  if (!token) {
    return res.status(401).json({
      result: 'fail',
      massage: "Authorization token is not provided",
      data: []
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (!err) {
      req.payload = payload;
    }
    if (err.name == "TokenExpiredError") {
      return res.status(401).json({
        result: "fail",
        message: "Jwt token expired!",
        data: [],
      });
    }
    if (err.name == "JsonWebTokenError") {
      return res.status(401).json({
        result: "fail",
        message: "Jwt token error!",
        data: [],
      });
    }
  });
  next();
};
