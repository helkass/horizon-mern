const router = require("express").Router();
const bodyparser = require('body-parser');
const urlencoded = bodyparser.urlencoded({extended: false});

const {getAllCustomers, createCustomer, loginCustomer, deleteCustomer, getCustomer} = require("../controller/customers");

router.get('/', getAllCustomers);

router.post('/register', createCustomer);

router.get('/:id', getCustomer);

router.post('/login',  loginCustomer);

router.delete('/delete/:id', deleteCustomer);

module.exports = router;