const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  // email
  // password
  todos: [{ type: mongoose.Schema.ObjectId, ref: 'Todo' }],
})

module.exports = mongoose.model('User', userSchema)
