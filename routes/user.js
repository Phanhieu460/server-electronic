const express = require("express");
const router = express.Router();
const { protectUser } = require("../middleware/user");
const asyncHandler = require("express-async-handler");
const { generateToken, refreshToken } = require("../utils/generateToken");
const tokenList = {};

require("dotenv").config();

const User = require("../models/User");

// LOGIN
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const user = User.findOne({ email: req.body.email });
      console.log(user);

      tokenList[refreshToken] = user;

      if (user && (await user.matchPassword(password, user.password))) {
        res.json({
          _id: user._id,
          email: user.email,
          token: generateToken(user._id),
          refreshToken: refreshToken(user._id),
          createdAt: user.createdAt,
        });
      } else {
        res.status(401);
        throw new Error("Email hoặc mật khẩu không đúng!");
      }
    } catch (error) {
      res.status(400).json({ error });
    }
  })
);

router.post(
  "/refreshToken",
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;

    if (refreshToken && refreshToken in tokenList) {
      try {
        await jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = tokenList[refreshToken];

        const token = generateToken(user._id);
        res.status(200).json({ token, refreshToken: refreshToken(user._id) });
      } catch (error) {
        res.status(403).json({
          message: "Invalid refresh token",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid request",
      });
    }
  })
);

// REGISTER
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, image } = req.body;

    const userExists = User.findOne({ email });

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
        refreshToken: refreshToken(user._id),
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
    const user = User.findById(req.params.id);

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
        refreshToken: refreshToken(updatedUser._id),
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
