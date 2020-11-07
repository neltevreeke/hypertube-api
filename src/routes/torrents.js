const authMiddleware = require('../middleware/auth')
const torrentToMagnet = require('torrent-to-magnet')

module.exports = app => {
  app.get('/download/:hash/:movieId', authMiddleware, async (req, res, next) => {
    const torrentHash = req.params.hash
    // const movieId = req.params.movieId
    const torrentUri = `https://yts.mx/torrent/download/${torrentHash}`
    // const movieFile = {
    //   file: {},
    //   path: ''
    // }

    // const options = {
    //   connections: 100,
    //   uploads: 10,
    //   verify: true,
    //   dht: true,
    //   tracker: true,
    //   tmp: '../../tmp',
    //   path: `../../tmp/movies/${movieId}`
    // }

    torrentToMagnet(torrentUri, {}, (err, uri) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err)
      }

      // do something with uri
      // eslint-disable-next-line no-console
      console.log(uri)
    })

    res.json()
  })

  return app
}
