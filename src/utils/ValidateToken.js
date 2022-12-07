import jsonwebtoken from "jsonwebtoken";
const jwt = jsonwebtoken;
import dotenv from "dotenv";

dotenv.config();

const collectToken = (req) => {
  console.log(req.headers);
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const validateToken = async (req, res, next) => {
  const token = collectToken(req);
  if (!token) {
    return res.status(401).json({
      result: "fail",
      massage: "Authorization token is not provided",
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    console.log(err)
    if (err) {
      return res.status(401).json({
        result: "fail",
        message: "Jwt token error!",
      });
    }
    req.payload = payload;
    next()
  });
};

export default validateToken;
