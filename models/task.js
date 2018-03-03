const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var taskSchema = new Schema({
    name: String,
    UserId: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    UserCreatedId:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    description: String,
  },{
    timestamps: true
  });
var task = mongoose.model('task', taskSchema);
module.exports = task;