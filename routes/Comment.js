const CommmentController = require('../controllers/Comment');
const router = require('express').Router();
const verifyUser = require('../middleware/VerifyUser');

//add comment to post
//http://localhost:5000/api/v1/comments/add-comment-to-post/:postId
router.route('/add-comment-to-post/:postId').post( verifyUser,CommmentController.addCommentToPost);


module.exports = router; 