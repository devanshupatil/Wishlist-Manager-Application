const express = require('express');
const router = express.Router();
const {userLogin, userRegister, deleteUser, forgotPassword} = require('../controller/userController');

router.post('/login', userLogin);
router.post('/register', userRegister);
router.delete('/users/:id', deleteUser);
router.get('/password', forgotPassword);


module.exports = router;