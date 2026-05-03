const express = require("express");
const router = express.Router();

const postController = require("../controller/postController");
const auth = require("../shared/auth");

router.get("/fetchForUpdate/:id", auth, postController.fetchForUpdate);
router.post("/new-post", auth, postController.newPost);
router.get("/", auth, postController.getAll);
router.post("/search", auth, postController.search);

router.patch("/update/:id", auth, postController.update);
router.delete("/delete", auth, postController.delete);

module.exports = router;
