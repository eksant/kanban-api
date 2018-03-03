const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    name: String,
    email: { type: Schema.Types.String, lowercase: true, unique: true },
    password: String,
    image: String,
    role: Number,
  },{
    timestamps: true
  });
var user = mongoose.model('user', userSchema);
module.exports = user;