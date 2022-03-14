const mongoos = require('mongoose');

const CommentSchema = new mongoos.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    post: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'Post'
    },
    user: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timeStamps: true});

module.exports = mongoos.model('Comment', CommentSchema);