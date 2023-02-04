const express = require("express")
const router = express.Router();
const userController = require("../controllers/userController");


// ! Every Route
router.get('/', userController.view);
router.post('/', userController.find);
router.get('/adduser', userController.form);
router.post('/adduser', userController.create);
router.get("/:id",userController.delete)
router.get("/edituser/:id", userController.edit);
router.post("/edituser/:id", userController.update);
router.get("/viewusers/:id", userController.viewAll);


module.exports = router;