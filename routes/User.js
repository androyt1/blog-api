const router=require('express').Router();
const UserController=require('../controllers/User');
const verifyToken=require('../middleware/VerifyUser');



//http://localhost:5000/api/v1/users/register
router.route('/register').post(UserController.register);

//http://localhost:5000/api/v1/users/login
router.route('/login').post(UserController.login);

//get user by id
//http://localhost:5000/api/v1/users/
router.route('/get-user/:id').get(UserController.getUser);

//get all users
http://localhost:5000/api/v1/users
router.route('/all-users').get(UserController.getAllUsers);

//http://localhost:5000/api/v1/users/dashboard
router.route('/dashboard').get(verifyToken,UserController.dashboard);



module.exports=router;