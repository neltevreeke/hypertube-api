const authMiddleware = require('../middleware/auth')
const Comment = require('../models/Comment')

const getComments = (movieId) => {
  return Comment.find({
    movieId: movieId
  })
    .populate({
      path: 'userId',
      select: ['-password', '-providerId', '-passwordResetToken', '-logInEmail', '-email']
    })
    .sort({
      createdOn: -1
    })
    .lean()
    .exec()
}

module.exports = app => {
  app.post('/comment', authMiddleware, async (req, res, next) => {
    const userId = req.user._id.toString()

    const {
      movieId,
      commentContent
    } = req.body

    try {
      await Comment.create({
        userId: userId,
        movieId: movieId,
        content: commentContent
      })

      res.json({
        comments: await getComments(movieId)
      })
    } catch (e) {
      const error = new Error('conflict')
      error.statusCode = 409
      return next(error)
    }
  })

  return app
}
