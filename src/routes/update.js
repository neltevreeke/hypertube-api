const User = require('../models/User')
const authMiddleware = require('../middleware/auth')
const { removeImage } = require('../utils/cloudinary')

module.exports = app => {
  app.post('/update', authMiddleware, async (req, res, next) => {
    let user

    // todo: get rid of 409 conflict error when updating emails

    try {
      if (typeof req.body.profilePicture.cloudinaryPublicId !== 'undefined') {
        if (typeof req.user.profilePicture.cloudinaryPublicId !== 'undefined') {
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
