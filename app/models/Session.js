var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SessionSchema = new Schema({
  auth: {
     type : String,
     required : true,
     unique : true
  },
  expires: {
     type : Date,
     required : true
  },
  status: {
     type : String,
     required : true,
     default : "Authorized"
  },
  userid: {
     type : String,
     required : true
  },
  created_at: {
     type:Date,
     default: Date.now()
  }
},{
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('Session', SessionSchema);
