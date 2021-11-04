const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/auth');

// lấy ds bài đã đăng mà cần đăng nhập
router.get('/', verifyToken, async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
        return res.json({ success: true, posts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ" });
    }

})

// đăng bài
router.post('/', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title) {
        return res.json({ success: false, message: 'không được để trống tiêu đề' });
    }
    try {
        const newPost = new Post({
            title,
            description: description || "",
            url: (url.startsWith('https://') ? url : `https://${url}`) || "",
            status: status || "LEARN" || "",
            user: req.userId
        })
        await newPost.save();
        res.json({ success: true, message: "Đăng bài thành công", post: newPost });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ" });
    }
})


// Cập nhật bài đăng
router.put('/:id', verifyToken, async (req, res) => {
    const { title, description, url, status } = req.body;

    if (!title) {
        return res.json({ success: false, message: 'không được để trống tiêu đề' });
    }
    try {
        let updatedPost = {
            title,
            description: description || "",
            url: (url.startsWith('https://') ? url : `https://${url}`) || "",
            status: status || "LEARN" || "",
            user: req.userId
        }
        const updatePostCondition = { _id: req.params.id, user: req.userId };
        updatedPost = await Post.findOneAndUpdate(updatePostCondition, updatedPost, { new: true });
        if (!updatedPost) {
            return res.json({ success: false, message: 'ko tìm thấy post hoặc ko phải người đăng' });
        }
        res.json({ success: true, message: "Cập nhật thành công", post: updatedPost });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ" });
    }
})

// Xóa bài Đăng
router.delete('/:id',verifyToken, async (req, res) => {
    try {
        let deletePost = { _id: req.params.id, user: req.userId };
        deletePost = await Post.findOneAndDelete(deletePost);
        if (!deletePost) {
            return res.status(401).json({ success: false, message: 'ko tìm thấy post hoặc ko phải người đăng' });
        }
        res.json({ success: true, message: "Xóa thành công", post: deletePost });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ" });
    }
})

module.exports = router