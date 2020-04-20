const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String
  },
  facebookId: {
    type: String
  },
  fortyTwoId: {
    type: String
  },
  linkedInId: {
    type: String
  }
})

const User = mongoose.model('Users', userSchema)

module.exports = User
