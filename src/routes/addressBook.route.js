import express from "express";
import {
  getAddressBook,
  addNewAddress,
  addNewAddressBulk,
  deleteAddress,
} from "../controllers/addressBook.controller.js";
import validateToken from "../utils/validateToken.js";
const router = express.Router();

router.get("/", validateToken, getAddressBook);
router.post("/", validateToken, addNewAddress);

router.put("/", validateToken);
router.delete("/", validateToken, deleteAddress);
router.post("/bulk", validateToken, addNewAddressBulk);
export default router;
