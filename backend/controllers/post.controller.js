import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

// CREATE POST
export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    const slug = req.body.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user._id,  // Use _id to match MongoDB
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};

// GET POSTS
export const getposts = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc' ? 1 : -1;

        // Build query dynamically
        const query = {
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: 'i' } },
                    { content: { $regex: req.query.searchTerm, $options: 'i' } },
                ]
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
            createdAt: { $gte: oneMonthAgo }
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts
        });

    } catch (error) {
        next(error);
    }
};



// import Post from "../models/post.model.js";
// import { errorHandler } from "../utils/error.js";

// export const create = async (req, res, next) => {
    

//     if (!req.user.isAdmin) {
//         return next(errorHandler(403, 'you are not allowed to create a post'))
//     }
//     if (!req.body.title || !req.body.content) {
//         return next(errorHandler(400, 'please provied all requied fields'))
//     }
//     const slug = req.body.title
//     .split(' ')
//     .join('-')
//     .toLowerCase()
//     .replace(/[^a-zA-Z0-9-]/g, '');
//     const newPost = new Post ({
//         ...req.body,
//         slug,
//         userId: req.user._id,
        
//     });
//     try {
//         const savedPost = await newPost.save();
//         res.status(201).json(savedPost);
//     } catch (error) {
//         next(error);
//     }
// };

// export const getposts = async (req, res, next ) => {
//     try {
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 9;
//         const sortDirection = req.query.order === 'asc' ? 1 : -1;
//         const posts = await Post.find({
//             ...(req.query.userId && {userId: req.query.userId }),
//             ...(req.query.category && {category: req.query.category }),
//             ...(req.query.slug && {userId: req.query.slug }),
//             ...(req.query.userId && {_id: req.query.userId }),
//             ...(req.query.searchTerm && {
//                 $or: [
//                     { title: { $regex: req.query.searchTerm, $options: 'i'}},
//                     { content: { $regex: req.query.searchTerm, $options: 'i'}},
//                 ],
//             }),
//     })
//       .sort({ updateAt: sortDirection })
//       .skip(startIndex)
//       .limit(limit);

//     const totalPosts = await Post.countDocuments();

//     const now = new Date();

//     const oneMonthAgo = new Date(
//         now.getFullYear(),
//         now.getMonth() -1,
//         now.getDate()
//     );

//     const lastMonthPosts = await Post.countDocuments({
//         createdAt: { $gte: oneMonthAgo },
//     });

//     res.status(200).json({
//         posts,
//         totalPosts,
//         lastMonthPosts,
//     });
     
//     } catch (error) {
//         next(error);
//     }
// }