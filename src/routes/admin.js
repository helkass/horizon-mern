const router = require("express").Router();

const { createAdmin, getAllAdmins, loginAdmin, deleteAdmin } = require("../controller/admins");

// CREATE ADMIN
router.post('/register', createAdmin)

// GET ADMIN
router.get('/', getAllAdmins)

// LOGIN
router.post("/login", loginAdmin);

router.delete("/delete/:id", deleteAdmin)

module.exports = router;