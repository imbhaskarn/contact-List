import { AddressBook } from "../models/index.js";
import { DataType } from "sequelize";
export const getAllContacts = (req, res) => {
  AddressBook.findAll({ where: { user_id: req.payload.user_id } })
    .then((data) => {
      console.log(data);
      res.status(201).json({ result: "Success", data: data });
    })
    .catch((err) => {
      if (err) {
        return res
          .status(501)
          .json({ result: "Error", message: "Internal server error!" });
      }
    });
};

export const addNewContact = (req, res) => {
  const { address, town_village, city, pincode, state, country } = req.body;
  AddressBook.create({
    user_id: req.payload.user_id,
    address,
    town_village,
    city,
    pincode,
    state,
    country,
  })
    .then((data) => {
      console.log(data);
      res.status(201).json({ result: "success", data: data });
    })
    .catch((err) => {
      if (err) {
        return res
          .status(501)
          .json({ result: "Error", message: "Internal server error!" });
      }
    });
};

export const addNewContactsBulk = (req, res) => {
  const bulkAddresses = req.body.address_bulk;
  console.log(bulkAddresses)
  AddressBook.bulkCreate([bulkAddresses])
    .then(() => {
      res.status(201).json({ result: "success", data: data });
    })
    .catch((err) => {
      console.log(err)
      if (err) {
        return res
          .status(501)
          .json({ result: "Error", message: "Internal server error!" });
      }
    });
};

export const deleteContact = (req, res) => {
  const address_id = req.body.address_id;
  AddressBook.destroy({
    where: { id: address_id, user_id: req.payload.user_id },
  })
    .then((data) => {
      return res
        .status(201)
        .json({ result: "success", message: "Address deleted successfully!" });
    })
    .catch((err) => {
      if (err) {
        return res
          .status(501)
          .json({ result: "Error", message: "Internal server error!" });
      }
    });
};
