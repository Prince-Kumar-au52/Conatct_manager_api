const Contact = require("../modles/contactSchema");
const Validate = require("../middleware/joi_validation");
const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.GetContactData = asyncHandler(async (req, res) => {
  const success = await Contact.find({ user_id: req.user.id });
  if (success) {
    res.status(200).send({ success, message: "Ok ......" });
    console.log(success);
  } else {
    res.status(400).send({ error: "not ok ..." });
  }
});

exports.PostContactData = async (req, res) => {
  const { name, email, phone } = req.body;
  const value = await Validate.validation.validateAsync(req.body);
  const success = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  console.log(success);
  return success;
};

exports.DeleteCotactData = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const success = await Contact.findByIdAndDelete(id);
  if (success) {
    res.status(200).send({ success, message: "Ok deleted ......" });
  } else {
    return { error: "not deleted..." };
  }
});

exports.GetByIDContactData = asyncHandler(async (id) => {
  const success = await Contact.findById(id);
  console.log(success);
  return success;
});

exports.UpdateCotactPutData = asyncHandler(async (id, updatedData) => {
  const success = await Contact.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  console.log(success);
  return success;
});
