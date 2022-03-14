const router=require('express').Router();
const PostController=require('../controllers/Post');
const verifyToken=require('../middleware/VerifyUser');

//http://localhost:5000/api/v1/posts/create
router.route('/create').post(verifyToken, PostController.createPost);


//http://localhost:5000/api/v1/posts/get-posts
router.route('/get-posts').get(PostController.getPosts);

////http://localhost:5000/api/v1/posts/get-posts-by-user
router.route('/get-posts-by-user').get(verifyToken, PostController.getPostByUser);

////http://localhost:5000/api/v1/posts/get-posts-by-id
router.route('/get-posts-by-id/:id').get(PostController.getPostById);

module.exports=router;