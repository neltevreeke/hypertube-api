const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String
  },
  providerId: {
    type: String
  }
})

userSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)

  next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User
