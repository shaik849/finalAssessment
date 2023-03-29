const commentRouter = require('express').Router();

const { createPostComment, updateComment,showAllCommentsOfPost, deleteComment } = require('../Controller/commentController')

const middleware = require('../Middleware/authMiddleware')

commentRouter.post('/comment/:id', middleware ,createPostComment)

commentRouter.get('/comments/:id', middleware, showAllCommentsOfPost)

commentRouter.put('/comment/:id/:commentId', middleware, updateComment)

commentRouter.delete('/comment/:id/:commentId', middleware, deleteComment)

module.exports = commentRouter