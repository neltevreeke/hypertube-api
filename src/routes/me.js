const authMiddleware = require('../middleware/auth')

module.exports = app => {
  app.get('/me', authMiddleware, async (req, res) => {
    res.json({
      user: req.user
    })
  })
}
