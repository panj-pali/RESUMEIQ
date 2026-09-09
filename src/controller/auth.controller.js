const userModel = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */


async function registerUser(req, res) {
  const { name, email, password } = req.body;

  // 1. Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Please provide name, email and password'
    });
  }

  // 2. Check existing user
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ name }, { email }]
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: 'User already exists'
    });
  }

  // 3. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 4. Create user
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword
  });

  // 5. Save user in MongoDB
  await newUser.save();

  // 6. Generate JWT
  const token = jwt.sign(
    { id: newUser._id },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  // 7. Store token in cookie
  res.cookie('token', token);

  // 8. Send response
  return res.status(201).json({
    message: 'User registered successfully',
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email
    }
  });
}

/**
 * login controller
 * @desc Login a user
 * @route POST /api/auth/login
 * @access Public
 */

async function loginUserController(req, res) {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password"
    });
  }

  // 2. Find user
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  // 3. Compare password
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordCorrect) {
    return res.status(401).json({
      message: "Invalid email or password"
    });
  }

  // 4. Generate JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // 5. Store token in cookie
  res.cookie("token", token);

  // 6. Send response
  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
}

module.exports = {
  registerUser, loginUserController
};