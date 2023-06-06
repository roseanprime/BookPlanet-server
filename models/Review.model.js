const { Schema, model } = require("mongoose")

const reviewSchema = new Schema({

   content: {
        type: String,
        require: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
},
    {
        timestamps: true,
    })

const Review = model("Review", reviewSchema)


module.exports = Review