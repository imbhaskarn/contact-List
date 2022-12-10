import express from "express";
import { urlencoded } from "express";
import validateToken from "./utils/validateToken.js";
import contactListRouter from "./routes/contactList.route.js";

// import auth controllers
import { GenerateToken, RegisterUser } from "./controllers/auth.controller.js";
import { validateCreds } from "./utils/validators/validateBody.js";

const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/api/v1/contact-list", contactListRouter);
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

app.post("/register", validateCreds, RegisterUser);
app.post("/generate-token", validateCreds, GenerateToken);

export default app;
