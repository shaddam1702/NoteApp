const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name : {
      type : String,
      required : true,
      min : 6,
      max : 40
  },
   email : {
    type : String,
    required : true,
    min : 6,
    max : 255
  }, 
   password : {
    type : String,
    required : true,
    min : 4,
    max : 40
   },
   date : {
       type : Date,
       default: Date.now
   }
});

module.exports = mongoose.model('User',userSchema);