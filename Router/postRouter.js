const router = require('express').Router();

const { viewSinglePost, viewAllPosts, createPost, updatePost, deletePost } = require('../Controller/postController')

const middleware = require('../Middleware/authMiddleware')

router.get('/view/singlepost/:id', middleware, viewSinglePost)

router.get('/view/allposts', middleware, viewAllPosts)

router.post('/createpost', middleware ,createPost)

router.put('/updatepost/:id', middleware,updatePost)

router.delete('/deletepost/:id', middleware,deletePost)

module.exports = router