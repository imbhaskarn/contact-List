import express from "express";
const router = express.Router();
import validateToken from "../utils/validateToken.js";
import {
  getAllContacts,
  addNewContact,
  addNewContactsBulk,
  deleteContact,
} from "../controllers/contactList.controller.js";
import {
  bulkContactsListValidate,
  validateContactsListBody,
} from "../utils/validators/validateBody.js";

router.get("/", validateToken, getAllContacts);
router.post("/", validateToken, validateContactsListBody, addNewContact);
router.post(
  "/bulk",
  validateToken,
  bulkContactsListValidate,
  addNewContactsBulk
);
router.put("/", validateToken);
router.delete("/", validateToken, deleteContact);

export default router;
