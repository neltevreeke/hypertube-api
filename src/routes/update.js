const User = require('../models/User')
const authMiddleware = require('../middleware/auth')

module.exports = app => {
  app.post('/update', authMiddleware, async (req, res, next) => {
    let user

    const {
      email,
      username,
      firstName,
      lastName
    } = req.body

    try {
      user = await User.findByIdAndUpdate(req.user._id.toString(), {
        email,
        username,
        firstName,
        lastName
      }, {
        new: true
      }).exec()

      const userObject = user.toObject()

      delete userObject.password
      delete userObject.__v
      delete userObject.provider
      delete userObject.providerId

      res.json({
        user: userObject
      })
    } catch (e) {
      const error = new Error('conflict')
      error.statusCode = 409
      return next(error)
    }
  })

  return app
}
