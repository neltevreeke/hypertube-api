const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  movieId: {
    type: String
  },
  createdOn: {
    type: Date,
    default: Date.now()
  },
  content: {
    type: String
  }
})

const Comment = mongoose.model('Comments', commentSchema)

module.exports = Comment
