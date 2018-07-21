var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/doctor/create',function(req,res){
  var reqBody=req.body;
  if (!reqBody.doctor_name) {
    res.status(400).send({"status": "failed", "reason": "doctor_name missing!"});
    return;
  }
  if (!reqBody.contact) {
    res.status(400).send({"status": "failed", "reason": "contact missing"});
    return;
  }

  if (!reqBody.gender) {
    res.status(400).send({"status": "failed", "reason": "gender missing"});
    return;
  }

  models.mDoctors.create(reqBody, function(doctorRow) {
       res.setHeader("Content-Type", "application/json");
        if(doctorRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Doctor already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.doctor.DoctorStruc(JSON.parse(doctorRow)) }));
       }
  });
});


router.post('/doctor/read/:doctor_id?',function(req,res){
  if (!req.params.doctor_id) {
     models.mDoctors.read( function(doctorArray) {
       res.status(200).send({"status": "success", "data" : views.doctor.DoctorReadAllStruc(JSON.parse(doctorArray)) });
     });
   }
   else {
       models.mDoctors.readbyID(req.params.doctor_id,function(doctorRow){
          res.setHeader("Content-Type", "application/json");
          if(doctorRow!= "null" && doctorRow!="0"){
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.doctor.DoctorStruc(JSON.parse(doctorRow)) }));
         }
         else if(doctorRow == "null")
          {
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Doctor doesn't exist!" }));
          }
          else{
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
          }
       });
   }
});


router.post('/doctor/update/:doctor_id?',function(req,res){
  if(!req.params.doctor_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
    var reqBody = req.body;
    if (!reqBody.doctor_name) {
    res.status(400).send({"status": "failed", "reason": "doctor_name missing"});
    return;
  }
  if (!reqBody.contact) {
    res.status(400).send({"status": "failed", "reason": "contact missing"});
    return;
}

  if (!reqBody.gender) {
    res.status(400).send({"status": "failed", "reason": "gender missing"});
    return;
}

    models.mDoctors.update(reqBody,req.params.doctor_id,function(doctorRow){
       res.setHeader("Content-Type", "application/json");
       if(doctorRow!="null" && doctorRow!="0")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.doctor.DoctorStruc(JSON.parse(doctorRow)) }));
        }
        else if(doctorRow == "null" ){
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Doctor doesn't exist!" }));
      }
       else{
         res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
       }
    });
  }
});

router.post('/doctor/delete/:doctor_id?',function(req,res){
  if (!req.params.doctor_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mDoctors.delete_doctor(req.params.doctor_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist!="null" && IdExist!="0")
     {
       res.status(200).send({"status": "success", "data" : "Deleted successfully! "});
     }
     else if (IdExist == "0"){
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Doctor doesn't exist!" }));
    }
    else{
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
    }
  });
});

module.exports = router;
