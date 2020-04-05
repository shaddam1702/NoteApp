var   express         = require("express");
var   router          = express.Router();
var   Note      = require("../models/note");
const verify = require('./verifyToken');
// var   middleware     = require("../middleware");





router.get("/indexnote",function(req,res){
    
      Note.find({},function(err,notes){
       
       if(err){
           console.log(err);
       } else {
         
           res.render("note/index",{notes: notes});
       }
   });
});

router.get("/indexnote/new",verify,function(req,res){
   
    res.render("note/new"); 
});

router.post("/indexnote",function(req,res){
    console.log(req.body.note)
     Note.create(req.body.note,function(err,newnote){
       
       if(err){
           res.render("note/new");
       }else{
           res.redirect("/indexnote");
       }
   }) ;
});

router.get("/indexnote/:id",verify,function(req,res){
    
       Note.findById(req.params.id,function(err,foundnote){
        
        if(err){
            res.redirect("/indexnote");
        }else{
            res.render("note/show" , { note : foundnote});
        }
 });
    
    
});

router.get("/indexnote/:id/edit",verify,function(req,res){
    
        Note.findById(req.params.id,function(err,foundnote){
        
        if(err){
            res.redirect("/indexnote");
        }else{
            res.render("note/edit" , { note : foundnote});
        }
    });
    
    
});

//Update Route
router.put("/indexnote/:id",function(req,res){
    Note.findByIdAndUpdate(req.params.id,req.body.note,function(err,updatedNote){
        
        if(err){
            console.log(err);
        }else{
            
            res.redirect("/indexnote/"+req.params.id);
        }
    });
    
});

router.delete("/indexnote/:id",verify,function(req,res){
    
    Note.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/indexnote");
        }else{
            res.redirect("/indexnote");
        }
    })
})

module.exports = router;

