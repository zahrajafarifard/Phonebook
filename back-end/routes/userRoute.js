const express = require("express");
const router = express.Router();
const auth = require("../shared/auth");

const userController = require("../controller/userController");

router.get("/fetchForUpdate/:id",auth, userController.fetchForUpdate);
router.get("/fetchForUpdateRule/:id",auth, userController.fetchForUpdateRule);

router.post('/logIn', userController.logIn);
router.post('/new-user',auth, userController.newUser);
router.get("/", auth,userController.getAll);
router.post("/search", auth ,userController.search);
router.post("/order", auth ,userController.order);
router.post("/searchUserName", auth ,userController.searchUserName);
router.post("/searchUserMobile", auth ,userController.searchUserMobile);
router.patch("/update/:id",auth, userController.update);
router.delete("/delete",auth, userController.delete);

module.exports = router;
