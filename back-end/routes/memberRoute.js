const express = require("express");
const router = express.Router();

const auth = require("../shared/auth");
const memberController = require("../controller/memberController");

// router.patch('/:customerId', memberController.update);
router.patch("/update/:id", auth, memberController.update);
router.get("/", auth, memberController.getAll);
// router.get("/getContacts", auth, memberController.getContacts);
router.get("/fetchForUpdate/:id", auth, memberController.fetchForUpdate);

router.post("/new-member", auth, memberController.newMember);
router.post("/search", auth, memberController.search);
router.delete("/delete", auth, memberController.delete);

module.exports = router;
