const User = require("../models/User.model");
const bcrypt=require("bcrypt");
const expressAsyncHandler=require("express-async-handler");
const jwt=require("jsonwebtoken")
const validator = require("validator");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (Id) => {
  return jwt.sign({ Id }, process.env.JWT_SECRET, { expiresIn: "10h" });
};

const customerRegister = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Validation
  if ( !email || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  //check whether the email is a valid one
  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Email is not valid");
  }

  let Id;

  let newId;
  do {
    // Generate a random four-digit number
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    newId = "CU" + randomNum.toString();
  } while (await User.findOne({ id: newId })); // Check if the generated ID already exists

  Id = newId;

  //find if user already exists

  try {
    const existingCustomer = await User.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ error: "email already exists" });
    }

    //Hash Password

    const hashedPassword = await bcrypt.hash(password, 10);

    //Create user
    const newCustomer = new User({
      email,
      password: hashedPassword,
      Id,
    });
    await newCustomer.save();

    if (newCustomer) {
      res.status(201).json({
        id: newCustomer.Id,

        email: newCustomer.email,
        token: generateToken(newCustomer._id),
        message: "Customer registered successfully",
      });
    } else {
      res.status(400);
      throw new error("Invalid user data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register customer" });
  }
});


//login
const customerLogin = async (req, res) => {
  const { emailOrUsername, password } = req.body;

  try {
    // Check if all required fields are provided
    if (!emailOrUsername || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email/username and password" });
    }

    // Find user by email or username and role of "Customer"
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
      role: "Customer",
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate token
    const token = jwt.sign({ userId: user.Id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return user details and token
    res.status(200).json({
      userId: user.Id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to login" });
  }
};



//logout
const logoutUser = async (req, res) => {
  try {
    // Clear the token on the client side (e.g., by setting it to null)
    res.clearCookie("token"); // Clear token cookie

    // Send response indicating successful logout
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


//get user by id
const getUserById = async (req, res) => {
  const userId = req.params.id; // Assuming the user's generated ID is passed as a parameter

  try {
    const user = await User.findOne({ Id: userId }); // Exclude password field
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};


module.exports = {
  customerRegister,  
  customerLogin,
  logoutUser,
  getUserById,
};
