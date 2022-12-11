import { ContactList } from "../models/index.js";
export const getAllContacts = (req, res) => {
  ContactList.findAll({ where: { user_id: req.payload.user_id } })
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
  const { name, phone } = req.body;
  ContactList.create({
    user_id: req.payload.user_id,
    name,
    phone,
  })
    .then((data) => {
      console.log(data);
      res
        .status(201)
        .json({
          result: "success",
          message: "New contact saved successfully",
          data: data,
        });
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
  const bulkContacts = req.body.contacts_bulk;
  console.log(bulkContacts);
  ContactList.bulkCreate([bulkContacts])
    .then(() => {
      res
        .status(201)
        .json({
          result: "success",
          message: "Contacts in bulk saves succefully",
          data: data,
        });
    })
    .catch((err) => {
      console.log(err);
      if (err) {
        return res
          .status(501)
          .json({ result: "Error", message: "Internal server error!" });
      }
    });
};

export const deleteContact = (req, res) => {
  const contact_id = req.body.contact_id;
  ContactList.destroy({
    where: { id: contact_id, user_id: req.payload.user_id },
  })
    .then(() => {
      return res
        .status(201)
        .json({ result: "success", message: "Contact deleted successfully!" });
    })
    .catch((err) => {
      if (err) {
        return res
          .status(501)
          .json({ result: "Error", message: "Internal server error!" });
      }
    });
};
