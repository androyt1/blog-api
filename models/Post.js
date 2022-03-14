const mongoos = require('mongoose');

const PostSchema = new mongoos.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: mongoos.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoos.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{timeStamps: true});

module.exports = mongoos.model('Post', PostSchema);