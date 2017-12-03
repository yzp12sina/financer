var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  created_at: Date,
  updated_at: Date
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('User', UserSchema);
