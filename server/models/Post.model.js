const { Schema, model } = require("mongoose")

const postSchema = new Schema({

    title: String,
    text: String, 
    image: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
    },
    review: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    owner: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
},
    {
        timestamps: true,
    })

const Post = model("Post", postSchema)

module.exports = Post