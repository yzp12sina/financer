var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
     type : String,
     required : true
  },
  email: {
     type : String,
     required : true,
     unique: true
  },
  password: {
     type : String,
     required : true
  },
  created_at: {
     type:Date,
     default: Date.now()
  },
  updated_at: {
     type:Date,
     default: Date.now()
  }
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('User', UserSchema);
