const mongoos = require('mongoose');

const UserSchema=new mongoos.Schema({
    fname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    posts: [{
        type: mongoos.Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{timeStamps: true});


module.exports=mongoos.model('User',UserSchema);