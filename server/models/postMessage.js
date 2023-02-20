const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    title : String,
    message : String,
    creator : String,
    tags : [String],
    selectedFile : String,
    likes : {
        type : [String] ,
        default : []
    },
    createAt : {
        type : Date,
        default : new Date()
    }
})

const posteMessages =  mongoose.model('posteMessages', postSchema);

module.exports = posteMessages;