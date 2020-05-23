const User = require('../models/User')
const authMiddleware = require('../middleware/auth')
const { removeImage } = require('../utils/cloudinary')

module.exports = app => {
  app.post('/update', authMiddleware, async (req, res, next) => {
    let user

    try {
      if (req.body.profilePicture && req.body.profilePicture.cloudinaryPublicId) {
        if (req.user.profilePicture && req.user.profilePicture.cloudinaryPublicId) {
          await removeImage(req.user.profilePicture.cloudinaryPublicId)
        }
      }

      user = await User.findByIdAndUpdate(req.user._id.toString(), req.body, {
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
