const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var categorySchema = new Schema({
    name: String,
    TaskId: {
        type: Schema.Types.ObjectId,
        ref: 'task'
    },
  },{
    timestamps: true
  });
var category = mongoose.model('category', categorySchema);
module.exports = category;