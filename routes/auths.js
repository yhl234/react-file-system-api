const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/', authController.signInWithEmailAndPassword);
router.post('/access-token', authController.signInWithToken);
router.post('/register', authController.createUser);
router.post('/user/update', authController.updateUserData);

module.exports = router;