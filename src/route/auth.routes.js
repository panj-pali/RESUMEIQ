const {Router} = require('express');
const authController = require('../controller/auth.controller');
const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

router.post('/register', authController.registerUser);

/**
 * @route POST /API/auth/login
 * @dec login user with email and password
 */

router.post('/login', authController.loginUserController);


module.exports = router;