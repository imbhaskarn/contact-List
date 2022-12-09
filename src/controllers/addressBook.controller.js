import { AddressBook } from "../models/index.js";

export const getAddressBook = (req, res) => {
  AddressBook.findAll({ where: { user_id: req.payload.user_id } })
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

export const addNewAddress = (req, res) => {
  AddressBook.create({})
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
