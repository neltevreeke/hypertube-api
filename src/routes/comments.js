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

const getUserComments = userId => {
  return Comment.find({
    userId: userId
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
      content,
      movieTitle
    } = req.body

    try {
      await Comment.create({
        userId: userId,
        movieId: movieId,
        content: content,
        movieTitle: movieTitle
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

  app.get('/comment/user/:id', authMiddleware, async (req, res, next) => {
    const userId = req.params.id

    try {
      res.json({
        comments: await getUserComments(userId)
      })
    } catch (e) {
      const error = new Error('not-found')
      error.statusCode = 404
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

  app.put('/comment/:commentId/:userId?', authMiddleware, async (req, res, next) => {
    const commentId = req.params.commentId
    const userId = req.params.userId

    const {
      movieId,
      commentContent
    } = req.body

    try {
      await Comment.findByIdAndUpdate(commentId, {
        content: commentContent
      })

      res.json({
        comments: userId ? await getUserComments(userId) : await getComments(movieId)
      })
    } catch (e) {
      const error = new Error('conflict')
      error.statusCode = 409
      return next(error)
    }
  })

  app.delete('/comment/:commentId/:userId?', authMiddleware, async (req, res, next) => {
    const userId = req.params.userId

    const {
      commentId,
      movieId
    } = req.body

    try {
      await Comment.deleteOne({
        _id: commentId,
        movieId: movieId
      })

      res.json({
        comments: userId ? await getUserComments(userId) : await getComments(movieId)
      })
    } catch (e) {
      const error = new Error('')
      error.statusCode = 404
      return next(error)
    }
  })

  return app
}
