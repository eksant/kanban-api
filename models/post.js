const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = new Schema({
    post: String,
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    TaskId: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
    MillestoneId: {
        type: Schema.Types.ObjectId,
        ref: 'millestone'
    },
    description:String
  },{
    timestamps: true
  });
var post = mongoose.model('post', postSchema);
module.exports = post;