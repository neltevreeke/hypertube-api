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
      createdOn: 'descending'
    })
    .lean()
    .exec()
}

module.exports = app => {
  app.post('/comment', authMiddleware, async (req, res, next) => {
    const userId = req.user._id.toString()

    const {
      movieId,
      content
    } = req.body

    try {
      await Comment.create({
        userId: userId,
        movieId: movieId,
        content: content
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

  app.get('/comment/:id', authMiddleware, async (req, res, next) => {
    const movieId = req.params.id

    try {
      res.json({
        comments: await getComments(movieId)
      })
    } catch (e) {
      const error = new Error('not-found')
      error.statusCode = 404
      return next(error)
    }
  })

  app.delete('/comment', authMiddleware, async (req, res, next) => {
    const userId = req.user._id.toString()

    const {
      movieId
    } = req.body

    try {
      await Comment.deleteOne({
        _id: movieId,
        userId: userId
      })

      res.json({
        comments: await getComments(movieId)
      })
    } catch (e) {
      const error = new Error('')
      error.statusCode = 404
      return next(error)
    }
  })

  return app
}
