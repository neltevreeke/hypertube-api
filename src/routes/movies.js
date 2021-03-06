const authMiddleware = require('../middleware/auth')
const fetch = require('node-fetch')

module.exports = app => {
  app.get('/movies', authMiddleware, async (req, res, next) => {
    try {
      let response = await fetch('https://yts.mx/api/v2/list_movies.json?limit=10&sort_by=rating&minimum_rating=8')
      response = await response.json()

      res.json({
        movies: response.data.movies
      })
    } catch (e) {
      const error = new Error('not-found')
      error.statusCode = 404
      return next(error)
    }
  })

  app.get('/movie-details/:id', authMiddleware, async (req, res, next) => {
    const id = req.params.id

    try {
      let response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}&with_cast=true`)
      response = await response.json()

      res.json({
        movieDetails: response.data.movie
      })
    } catch (e) {
      const error = new Error('not-found')
      error.statusCode = 404
      return next(error)
    }
  })

  app.get('/search-movie/:movieTitle', authMiddleware, async (req, res, next) => {
    const movieTitle = req.params.movieTitle

    try {
      let response = await fetch(`https://yts.mx/api/v2/list_movies.json?query_term=${movieTitle}`)
      response = await response.json()

      if (response.data.movie_count <= 0) {
        const error = new Error('not-found')
        error.statusCode = 404
        return next(error)
      }

      res.json({
        searchResults: response.data.movies
      })
    } catch (e) {
      const error = new Error('not-found')
      error.statusCode = 404
      return next(error)
    }
  })

  return app
}
