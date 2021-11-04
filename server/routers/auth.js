const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const User = require('../models/User');
const authToken = require('../middleware/auth');


//check if user is logged in
router.get('/',authToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(400).json({success: false, message: 'User not found'});
        }
        res.json({success: true, user})
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ" });
    }
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.json({ success: false, message: 'thiếu tên hoặc mật khẩu' });
    }
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.json({ success: false, message: 'Tên người dùng đã tồn tại' });
        }
        const hashPassword = await argon2.hash(password);
        const newUser = new User({ username, password: hashPassword });
        await newUser.save()

        const accessToken = jwt.sign(
            { userId: newUser._id },
            process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: "Đăng ký tài khoản thành công", accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ" });
    }
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(200).json({ success: false, message: 'thiếu tên hoặc mật khẩu' });
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(200).json({ success: false, message: 'Sai username or mật khẩu' });
        }
        const passValid = await argon2.verify(user.password, password);
        if (!passValid) {
            return res.status(200).json({ success: false, message: 'Sai username or mật khẩu' });
        }
        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET)
        res.json({ success: true, message: "Đăng nhập thành công",token: accessToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Lỗi máy chủ" });
    }
})

module.exports = router;