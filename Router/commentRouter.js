const commentRouter = require('express').Router();

const { postComment } = require('../Controller/commentController')

const middleware = require('../Middleware/authMiddleware')

commentRouter.post('/comment', middleware ,postComment)

module.exports = commentRouter