module.exports = app => {
  app.post('/login', async (req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(req.body)
  })

  return app
}
