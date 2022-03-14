require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ConnectDB = require('./DB');
const ErrorHandler = require('./middleware/ErrorHandler');
const UserRouter = require('./routes/User');
const PostRouter = require('./routes/Post');
const CommentRouter=require('./routes/Comment');

ConnectDB()
const app = express(); 
  
//middleware
app.use(cors());
app.use(express.json());

//routes
app.use('/home',(req,res,next)=>{
    res.send('Home page');
})

app.use('/api/v1/users',UserRouter);
app.use('/api/v1/posts',PostRouter);
app.use('/api/v1/comments',CommentRouter);

//error handler
app.use(ErrorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})