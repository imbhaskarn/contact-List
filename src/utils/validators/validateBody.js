import Joi from "joi";
const credsSchema = Joi.object({
  username: Joi.string().required().min(4).max(12),
  password: Joi.string().required().min(6).max(20),
});
const addressSchema = Joi.object({
  address: Joi.string().required().min(6).max(15),
  town_village: Joi.string().required().min(4).max(15),
  city: Joi.string().required().min(4).max(15),
  pincode: Joi.number().greater(10000),
  state: Joi.string().min(4).max(20),
  country: Joi.string().min(4).max(20),
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
export const validateContactsListBody = (req, res, next) => {
  const { error, value } = addressSchema.validate(req.body);
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

export const bulkAddressValidate = (req, res, next) => {
  const { error, value } = Joi.array()
    .min(2)
    .required()
    .validate(req.body.address_bulk)
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
  const addressesBulk = req.body.address_bulk;
  addressesBulk.forEach((address) => {
    const { error, value } = addressSchema.validate(address);
    if (error) {
      errors.push({
        input: error._original,
        details: error.details.map((item) => item.message),
      });
    }
    address.createdAt = 
    address.user_id = req.payload.user_id;
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
