const { Schema, model } = require("mongoose")

const userSchema = new Schema({

  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  firstName: {
    type: String,
    require: true
  },
  lastName: {
    type: String,
    require: true
  },
  image: {
    type: String,
    default: 'https://www.iconpacks.net/icons/1/free-heart-icon-492-thumb.png'
  },
  cover: {
    type: String,
    default: 'https://wallpaper.dog/large/817497.jpg'
  },
  bio: String,
  tokenConfirmation: String,
  role: {
    type: String,
    enum: ['USER', 'PENDING', 'ADMIN'],
    default: 'PENDING'
  },
  address: {
    road: String,
    apartment: String,
    city: String,
    state: String,
    zip: Number,
  },
  

}, {
  timestamps: true,
})

const User = model("User", userSchema)

module.exports = User