const { Schema, model } = require("mongoose")

const userSchema = new Schema({

  email: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: [true, "Please enter a password"]
  },
  firstName: {
    type: String,
    require: true,
    trim: true
  },
  lastName: {
    type: String,
    require: true,
    trim: true
  },
  image: {
    type: String,
  },
  favorites:[{
    type: Schema.Types.ObjectId, 
    ref: "Book",
  }]
 
}, {
  timestamps: true,
})

const User = model("User", userSchema)

module.exports = User;