const express = require("express");
const router = express.Router();

const ruleController = require("../controller/ruleController");

// router.get("/fetchForUpdate/:id", ruleController.fetchForUpdate);
// router.post('/new-post', ruleController.newPost);
router.get("/", ruleController.getAll);

// router.patch("/update/:id", ruleController.update);
// router.delete("/delete", ruleController.delete);

module.exports = router;
