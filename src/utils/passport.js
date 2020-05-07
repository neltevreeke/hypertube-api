const tokenUtils = require('./token')
const User = require('../models/User')

const getOrCreateUser = async (profile) => {
  let user

  user = await User.findOne({
    logInEmail: profile.emails[0].value
  })
    .lean()
    .exec()

  if (!user) {
    user = await User.create({
      username: profile.displayName,
      logInEmail: profile.emails[0].value,
      email: profile.emails[0].value,
      providerId: profile.id,
      profilePicture: {
        value: profile.photos[0].value
      }
    })
  }

  const token = await tokenUtils.create(user._id)

  return {
    user,
    token
  }
}

module.exports = {
  getOrCreateUser
}
