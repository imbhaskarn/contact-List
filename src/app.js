import express from "express";
import { urlencoded } from "express";
import validateToken from "./utils/validateToken.js";
import addressBookRouter from "./routes/addressBook.route.js";

// import auth controllers
import { GenerateToken, RegisterUser } from "./controllers/auth.controller.js";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/addressbook", addressBookRouter);
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

app.post("/register", RegisterUser);
app.post("/generate-token", GenerateToken);

export default app;
