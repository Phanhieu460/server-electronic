const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();

const Blog = require("../models/Blog");

//GET ALL Blog
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Blog.countDocuments({ ...keyword });
    const blogs = await Blog.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ _id: -1 });
    res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
  })
);

// ADMIN GET ALL BLOG WITHOUT SEARCH AND PEGINATION
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const blogs = await Blog.find({}).sort({ _id: -1 });
    res.json(blogs);
  })
);

// GET SINGLE Blog
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404);
      throw new Error("Blog not Found");
    }
  })
);
// DELETE BLOG
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      await blog.remove();
      res.json({ message: "Xóa Thành Công" });
    } else {
      res.status(404);
      throw new Error("Blog not Found");
    }
  })
);

// CREATE Blog
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { name, description, image, writer } = req.body;
    const blogExist = await Blog.findOne({ name });
    if (blogExist) {
      res.status(400);
      throw new Error("Bài viết đã tồn tại.");
    } else {
      const blog = new Blog({
        name,
        description,
        image,
        writer,
        user: req.user._id,
      });
      if (blog) {
        const createdblog = await blog.save();
        res.status(201).json(createdblog);
      } else {
        res.status(400);
        throw new Error("Invalid blog data");
      }
    }
  })
);

// UPDATE BLOG
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const { name, description, image, writer } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.image = image || product.image;
      product.writer = writer || product.writer;

      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      res.status(404);
      throw new Error("Blog not found");
    }
  })
);
module.exports = router;
