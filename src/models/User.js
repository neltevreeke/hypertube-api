const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  username: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  displayName: {
    type: String
  },
  logInEmail: {
    type: String,
    unique: true
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  passwordResetToken: {
    type: String
  },
  providerId: {
    type: String
  },
  profilePicture: {
    cloudinaryPublicId: {
      type: String
    },
    value: {
      type: String
    }
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

userSchema.statics.getAuthenticatedUser = async function (email, password) {
  const user = await this.findOne({
    logInEmail: email
  })

  if (!user || !user.password) {
    const error = new Error('not-found')
    error.statusCode = 404
    throw error
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    const error = new Error('not-found')
    error.statusCode = 404
    throw error
  }

  return user
}

const User = mongoose.model('Users', userSchema)

module.exports = User
