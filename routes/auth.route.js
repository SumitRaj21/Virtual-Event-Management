const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validate.middleware');
const { registerSchema, loginSchema } = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth.middleware');


router.post('/register', validator(registerSchema), authController.register);
router.post('/login', validator(loginSchema), authController.login);
router.get('/users', auth, authController.userList);

module.exports = router;