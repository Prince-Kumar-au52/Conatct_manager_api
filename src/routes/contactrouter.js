const express = require("express");
const router = express.Router();
const contactCtr = require("../controllers/ContactControler");
const { validateToken } = require("../middleware/jwt_authentication");

router.use(validateToken);
router.get("/get", contactCtr.contactGet);
router.post("/post", contactCtr.contactPost);
router.put("/put/:id", contactCtr.UpdateContactPut);
router.get("/get/:id", contactCtr.GetByIdContact);
router.delete("/delete/:id", contactCtr.DeleteContact);

module.exports = router;
