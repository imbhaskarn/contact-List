import express from "express";
import { urlencoded } from "express";
import validateToken from "./utils/validateToken.js";
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.status(200).json({
    result: "success",
    timestamp: new Date().toISOString(),
    data: {
      message: "Hello From Express!",
    },
  });
});

app.get("/protected", validateToken, (req, res) => {
  return res.status(200).json({
    result: "success",
    timestamp: new Date().toISOString(),
    data: {
      payload: req.payload,
      message: "This is protected route!",
    },
  });
});

export default app;
