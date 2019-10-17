const express =require('express');
const router = express.Router();
const Post = require('../models/Post'); //modeli yani Post u route a dahil edelim


//Get back all the posts
router.get('/', async (req, res) => {
    try{
        const posts = await Post.find();
        res.json(posts); 
    }catch(err){
        res.json({message: err});
    }
});

//Submits a post
router.post('/', async (req, res) => {
    const post = new Post({     //Dahil edilen Post modelinden yeni bir nesne türeterek
        title: req.body.title,
        description: req.body.description
    });

    //işte burada db ye kayıt başlıyor yea!
    try{
        const savedPost = await post.save();
    res.json(savedPost);
    //Tüm bu angarya yerine yukarıya bak
    // .then(data => {
    //     res.json(data);
    // })
    // .catch(err => {
    //     res.json({ message: err});
    // }) 
    }catch(err){
        res.json({ message :err});
    }
});

//SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try{
    const post = await Post.findById(req.params.postId);
    res.json(post);
    }catch(err){
        res.json({ message: err});
    }
});

//DELETE POST
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.deleteOne({_id: req.params.postId});
        res.json(removedPost);
    }catch(err){
        res.json({ message: err});
    }
})
//UPDATE A POST 
router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title}}
        );
        res.json(updatedPost);
    }catch(err){
        res.json({ message: err});
    }
})

module.exports = router; 