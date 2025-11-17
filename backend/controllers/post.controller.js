import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

// CREATE POST
export const create = async (req, res, next) => {
  try {
    // ✅ 1. Check admin permission
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create a post"));
    }

    // ✅ 2. Validate required fields
    if (!req.body.title || !req.body.content) {
      return next(errorHandler(400, "Please provide all required fields"));
    }

    // ✅ 3. Create a unique slug (avoids duplicate key error)
    const baseSlug = req.body.title
      .split(" ")
      .join("-")
      .toLowerCase()
      .replace(/[^a-zA-Z0-9-]/g, "");

    const slug = `${baseSlug}-${Date.now()}`; // add timestamp for uniqueness

    // ✅ 4. Create post object
    const newPost = new Post({
      ...req.body,
      slug,
      userId: req.user._id, // from verified token
    });

    // ✅ 5. Save to MongoDB
    const savedPost = await newPost.save();
    console.log("✅ Post saved successfully:", savedPost);

    // ✅ 6. Send response
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("❌ MongoDB Save Error:", error);
    next(error);
  }
};

// GET POSTS
export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    // ✅ Build query dynamically
    const query = {
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    };

    const posts = await Post.find(query)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};


// GET POST BY SLUG
export const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};
