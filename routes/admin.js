const express = require("express");
const router = express.Router();
const { admin, protect } = require("../middleware/auth");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

require("dotenv").config();

const Admin = require("../models/Admin");

// LOGIN
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Admin.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Email hoặc mật khẩu không đúng!");
    }
  })
);

// REGISTER
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await Admin.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Người dùng đã tồn tại!");
    }

    const user = await Admin.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// PROFILE
router.get(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await Admin.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// UPDATE PROFILE
router.put(
  "/profile",
  protect,
  asyncHandler(async (req, res) => {
    const user = await Admin.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// GET ALL USER ADMIN
router.get(
  "/",
  protect,
  admin,
  asyncHandler(async (req, res) => {
    const users = await Admin.find({});
    res.json(users);
  })
);

module.exports = router;
