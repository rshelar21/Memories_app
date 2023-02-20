const posteMessages = require('../models/postMessage.js');
const mongoose = require('mongoose');

const getPosts = async(req, res) => {
   
    try {
        const postMsgs = await posteMessages.find(); 
        // console.log(postMsgs);

        res.status(200).json(postMsgs);
    } catch(error) {
        res.status(404).json({message : error.message})
    }
} 


const createPost = async(req, res) => {
    const post = req.body;
    // console.log(post, 'req body');

    const newPost = new posteMessages({
        ...post,
        creator : req.userId,
        createdAt : new Date().toISOString()
    });
    
    try {
        const user = await newPost.save();
        res.status(201).json(user);

    } catch(error) {
        res.status(409).json({message : error.message})

    }
    
}

const updatePost = async(req, res) => {
    const {id : _id} = req.params
    const post = req.body
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id')
        const updatedPost = await posteMessages.findByIdAndUpdate(_id, post, {new : true})
        console.log(updatedPost);

    } catch(error) {
        console.log(error);
    }

    
    res.json({message : 'updated successfully'})
}


const deletePost = async(req, res) => {
    const {id : _id} = req.params

    try {
        const deletepost = await posteMessages.findByIdAndDelete(_id)
        res.json(deletepost)
    } catch (error) {
        console.log(error);

    }
}


const likePost = async(req, res) => {
    const {id : _id} = req.params
    const post = req.body

    if(!req.userId) return res.json({message : 'Unauthenticated'})
    try {
        // this is for checking if the post is already liked or not 
        // id check honar k liye string me convert kia h
        const index = post.likes.findIndex((id) => id === String(req.userId))
        //  -1 means not found
        if(index === -1){
            post.likes.push(req.userId)
        }
        else {
            // filter method is used to remove the id from the array 
            // dislike means id ko remove krega 
            // je match nahi honar te return kara means tevde likes return honar 
            post.likes = post.likes.filter((id) => id !== String(req.userId))
        }
        const likes = await posteMessages.findByIdAndUpdate(_id, post, {new : true})
        res.json(likes)
    } catch(error) {
        console.log(error)
    }
}


module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
}