import Joi from "joi";
import { Sequelize } from "sequelize";
const credsSchema = Joi.object({
  username: Joi.string().required().min(4).max(12),
  password: Joi.string().required().min(6).max(20),
});
const contactsSchema = Joi.object({
  name: Joi.string().required().min(4).max(15),
  phone: Joi.string().min(10).max(10),
});

export const validateCreds = (req, res, next) => {
  const { error, value } = credsSchema.validate(req.body);
  if (error) {
    return res.status(401).json({
      result: "error",
      message: "Some erorr in json input",
      data: {
        input: error._original,
        details: error.details.map((item) => item.message),
      },
    });
  }
  next();
};
export const validateContactsList = (req, res, next) => {
  const { error, value } = contactsSchema.validate(req.body);
  if (error) {
    return res.status(401).json({
      result: "error",
      message: "Some erorr in json input",
      data: {
        input: error._original,
        details: error.details.map((item) => item.message),
      },
    });
  }
  next();
};

export const bulkContactsListValidate = (req, res, next) => {
  const { error, value } = Joi.array()
    .min(2)
    .required()
    .validate(req.body.contacts_bulk);
  if (error) {
    return res.status(401).json({
      result: "error",
      message: "Some erorr in json input",
      data: {
        input: error._original,
        details: error.details.map((item) => item.message),
      },
    });
  }
  let errors = [];
  const addressesBulk = req.body.contacts_bulk;
  addressesBulk.forEach((contact) => {
    const { error, value } = contactsSchema.validate(contact);
    if (error) {
      errors.push({
        input: error._original,
        details: error.details.map((item) => item.message),
      });
    }
    contact.user_id = req.payload.user_id;
  });
  if (errors.length > 0) {
    return res.status(401).json({
      result: "error",
      message: "Some erorr in json input",
      data: {
        input: error._original,
        details: error.details.map((item) => item.message),
      },
    });
  }
  next();
};
