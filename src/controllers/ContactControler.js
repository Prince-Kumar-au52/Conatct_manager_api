const ContactServer = require("../services/ContactServise");
const asyncHandler = require("express-async-handler");

exports.contactGet = asyncHandler(async (req, res) => {
  const result = await ContactServer.GetContactData(req, res);
});

exports.contactPost = async (req, res) => {
  try {
    // const dailyCategory = req.body;
    const result = await ContactServer.PostContactData(req,res);
    return res.status(200).send({ result });
  } catch (error) {
    if (error.isJoi) {
      console.log(error);
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ error: "Internal Server Error cont" });
  }
};

exports.DeleteContact = asyncHandler(async (req, res) => {
  const result = await ContactServer.DeleteCotactData(req, res);
});

exports.UpdateContactPut = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const success = await ContactServer.UpdateCotactPutData(id, updatedData, {
    new: true,
  });
  res.status(200).send({ success });
});

exports.GetByIdContact = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await ContactServer.GetByIDContactData(id);
  res.status(200).send({ result });
});
