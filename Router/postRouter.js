const router = require('express').Router();

const { getSinglePostId,  getAllPostsByUserId, getAllPosts, createPost, updatePost, deletePost } = require('../Controller/postController')

const middleware = require('../Middleware/authMiddleware')

router.get('/view/singlepost/post/:id', middleware, getSinglePostId)

router.get('/view/allposts/user/:id/:title/:description', middleware,getAllPostsByUserId)

router.get('/view/allposts', middleware, getAllPosts)

router.post('/createpost', middleware ,createPost)

router.put('/updatepost/:id', middleware,updatePost)

router.delete('/deletepost/:id', middleware,deletePost)

module.exports = router