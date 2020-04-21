const tokenUtils = require('./token')
const User = require('../models/User')

const getUserFromStrategy = profile => new Promise((resolve) => {
  let user

  user = User.findOne({
    providerId: profile.id
  })
    .lean()
    .exec()

  if (!user) {
    user = User.create({
      username: profile.displayName,
      providerId: profile.id
    })
  }

  const token = tokenUtils.create(user._id)

  const userData = {
    user,
    token
  }

  resolve(userData)
})

module.exports = {
  getUserFromStrategy
}
