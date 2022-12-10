import express from "express";
const router = express.Router();
import validateToken from "../utils/validateToken.js";
import {
  getAddressBook,
  addNewAddress,
  addNewAddressBulk,
  deleteAddress,
} from "../controllers/addressBook.controller.js";
import { bulkAddressValidate, validateAddressBody } from "../utils/validators/validateBody.js";

router.get("/", validateToken, getAddressBook);
router.post("/", validateToken, validateAddressBody, addNewAddress);

router.put("/", validateToken);
router.delete("/", validateToken, deleteAddress);
router.post("/bulk", validateToken,bulkAddressValidate, addNewAddressBulk);
export default router;
