var mongoose  =  require("mongoose")
var noteSchema = new mongoose.Schema({

    title : String,
    image : String,
    body  : String,
    created : {type : Date , default : Date.now}
 
});

//var Note = mongoose.model("Note", noteSchema);
module.exports = mongoose.model("Note",noteSchema);