const {Router} = require('express');
const authController = require('../controller/authcontroller');
const router = Router();
const authMiddleware = require('../middleware/authmiddleware')

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

router.post('/register', authController.registerUserController);
/**
 * @route POST /API/auth/login
 * @dec login user with email and password
 */

router.post('/login', authController.loginUserController);


/**
 * @route get/api/auth/logout
 * @desc clear token from user cookie 
 * @access public
 */

router.get("/logout", authController.logoutUserController);


/**
 * @route GET /api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */
router.get(
    "/get-me",
    authMiddleware.authUser,
    authController.getMeController
);





module.exports = router;