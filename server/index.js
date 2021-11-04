require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routers/auth');
const postRouter = require('./routers/post');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/",(req, res) => {
    res.send('trang chủ');
})
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRouter);
app.use('/api/post', postRouter);
app.use(cors());

const Dbconnect = async() => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.5kyhf.mongodb.net/mernlearning?retryWrites=true&w=majority`);
        console.log('DB connected')
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

Dbconnect();

app.listen(PORT, (err) => {
    if(err){
        console.log(err);
    }else{
        console.log(`SERVER is active on ${PORT}`)
    }
})