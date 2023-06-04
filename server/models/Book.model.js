const { Schema, model } = require("mongoose")


const bookSchema = new Schema({

    title: {
        type: String,
        require: true,
    },
    author: [String],
    publisher: {
        type: String,
        require: true,
    },
    image: {
        type: String,
        default: 'https://wallpaper.dog/large/817497.jpg'
    },
    description: String,
    price: {
        type: Number,
        require: true,
    },
    currency: {
        type: String,
        default: '€',
    },
    review: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true,
})

const Book = model("Book", bookSchema)


module.exports = Book
