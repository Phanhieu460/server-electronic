const express = require("express");
const router = express.Router();
const { protectUser } = require("../middleware/user");
const asyncHandler = require("express-async-handler");
const {
  generateToken,
  refreshTokenService,
} = require("../utils/generateToken");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const User = require("../models/User");

// LOGIN
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (user && (await user.matchPassword(password, user.password))) {
        res.json({
          _id: user._id,
          email: user.email,
          token: generateToken(user._id),
          refreshToken: refreshTokenService(user._id),
          createdAt: user.createdAt,
          message: "Login successful",
        });
      } else {
        res.status(401);
        throw new Error("Invalid username or password!");
      }
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "An error occurred during login" });
    }
  })
);

router.post(
  "/refreshToken",
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    try {
      const response = await jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
          if (err) {
            return res.status(403);
          }
          const token = generateToken(user.id);
          res.status(200).json({
            id: user.id,
            token,
            refreshToken: refreshTokenService(user.id),
          });
        }
      );
      return res.json(response);
    } catch (error) {
      res.status(401).json({
        message: "Invalid refresh token",
      });
    }
  })
);

// REGISTER
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, image } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("Người Dùng Đã Tồn Tại!");
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      image,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
        refreshToken: refreshTokenService(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

// PROFILE
router.get(
  "/profile/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        image: user.image,
        phone: user.phone,
        address: user.address,
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
  "/profile/:id",
  protectUser,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.image = req.body.image || user.image;
      user.phone = req.body.phone || user.phone;
      user.address = req.body.address || user.address;
      if (req.body.password) {
        user.password = req.body.password;
      }
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        image: updatedUser.image,
        phone: updatedUser.phone,
        address: updatedUser.address,
        createdAt: updatedUser.createdAt,
        token: generateToken(updatedUser._id),
        refreshToken: refreshTokenService(updatedUser._id),
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
  protectUser,
  asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  })
);

module.exports = router;
