const router = require('express').Router();

const { displayPost, createPost, updatePost, deletePost } = require('../Controller/postController')

const middleware = require('../Middleware/authMiddleware')

router.get('/getpost/:id', middleware,displayPost)

router.post('/createpost', middleware ,createPost)

router.put('/updatepost/:id', middleware,updatePost)

router.delete('/deletepost/:id', middleware,deletePost)

module.exports = router