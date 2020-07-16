const authMiddleware = require('../middleware/auth')
const fetch = require('node-fetch')

module.exports = app => {
  app.get('/movies', authMiddleware, async (req, res, next) => {
    try {
      fetch('https://yts.mx/api/v2/list_movies.json?limit=10&sort_by=seeds&minimum_rating=9')
        .then(response => response.json())
        .then(response => {
          res.json({
            movies: response.data.movies
          })
        })
    } catch (e) {
      const error = new Error('not-found')
      error.statusCode = 404
      return next(error)
    }
  })

  return app
}
