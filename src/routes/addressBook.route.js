import express from "express";
import { getAddressBook } from "../controllers/addressBook.controller.js";
import validateToken from "../utils/validateToken.js";
const router = express.Router();

router.get(
  "/",
  //  validateToken,
  getAddressBook
);

export default router;
