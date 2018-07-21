var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/speciality/create',function(req,res){
  var reqBody=req.body;
  if (!reqBody.speciality_text) {
    res.status(400).send({"status": "failed", "reason": "speciality_text missing"});
    return;
  }
  if (!reqBody.speciality_role) {
    res.status(400).send({"status": "failed", "reason": "speciality_role missing"});
    return;
  }

  models.mSpecialitys.create(reqBody, function(specialityRow) {
       res.setHeader("Content-Type", "application/json");
        if(specialityRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Speciality already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.speciality.SpecialityStruc(JSON.parse(specialityRow)) }));
       }
  });
});


router.post('/speciality/read/',function(req,res){
  if (!req.query.role) {
     models.mSpecialitys.read( function(specialityArray) {
       res.status(200).send({"status": "success", "data" : views.speciality.SpecialityReadAllStruc(JSON.parse(specialityArray)) });
     });
   }
   else {
     models.mSpecialitys.readbyRole(req.query.role,function(specialityRow){
         res.setHeader("Content-Type", "application/json");
         if(specialityRow!= "null" && specialityRow!="0"){
         res.status(200).send(JSON.stringify({"status": "success", "data" : views.speciality.SpecialityReadbyRoleAllStruc(JSON.parse(specialityRow)) }));
        }
        else if(specialityRow == "null")
         {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Specialitys do not exist!" }));
         }
         else{
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
         }
      });
   }
});


router.post('/speciality/update/:speciality_id?',function(req,res){
  if(!req.params.speciality_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
    var reqBody = req.body;
    if (!reqBody.speciality_text) {
    res.status(400).send({"status": "failed", "reason": "speciality_text missing"});
    return;
  }
  if (!reqBody.speciality_role) {
    res.status(400).send({"status": "failed", "reason": "speciality_role missing"});
    return;
  }
    models.mSpecialitys.update(reqBody,req.params.speciality_id,function(specialityRow){
       res.setHeader("Content-Type", "application/json");
       if(specialityRow!="null")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.speciality.SpecialityStruc(JSON.parse(specialityRow)) }));
        }
        else {
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Speciality doesn't exist!" }));
      }
    });
  }
});

router.post('/speciality/delete/:speciality_id?',function(req,res){
  if (!req.params.speciality_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mSpecialitys.delete_speciality(req.params.speciality_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist!="null" && IdExist!="0")
    {
      res.status(200).send({"status": "success", "data" : "Deleted successfully! "});
    }
    else if (IdExist == "0"){
     res.status(400).send(JSON.stringify({"status": "failed", "reason": "Speciality doesn't exist!" }));
   }
   else{
     res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
   }
  });
});

module.exports = router;
