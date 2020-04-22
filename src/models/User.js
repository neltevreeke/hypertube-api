const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  providerId: {
    type: String
  }
})

const User = mongoose.model('Users', userSchema)

module.exports = User
