var express        = require("express"),
    methodOverride = require("method-override"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose");
var  indexnoteRoute     =  require("./routes/indexnote")
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');
dotenv.config();
mongoose.connect("mongodb://localhost/versenote_app");
app.set("view engine","ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(indexnoteRoute); 

app.use('/api/user',authRoute);
app.use('/api/post',postRoute);
app.listen(3300,function(){
    
    console.log("NoteApp  server has started at ");
})

