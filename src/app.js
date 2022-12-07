import express from "express";
import { urlencoded } from "express";
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

app.get("/protected", (req, res) => {
  return res.status(200).json({
    result: "success",
    timestamp: new Date().toISOString(),
    data: {
      message: "This is protected route!",
    },
  });
});

export default app;
