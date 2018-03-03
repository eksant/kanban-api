const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var millestoneSchema = new Schema({
    name: String,
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    CategoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    TaskId: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
    description: String,
  },{
    timestamps: true
  });
var millestone = mongoose.model('millestone', millestoneSchema);
module.exports = millestone;