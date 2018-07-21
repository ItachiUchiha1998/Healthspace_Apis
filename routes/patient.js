var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/patient/create',function(req,res){
  var reqBody=req.body;
  if (!reqBody.patient_name) {
    res.status(400).send({"status": "failed", "reason": "patient_name missing"});
    return;
  }
  if (!reqBody.age) {
    res.status(400).send({"status": "failed", "reason": "age missing"});
    return;
  }
  if (!reqBody.gender) {
    res.status(400).send({"status": "failed", "reason": "gender missing"});
    return;
  }
  if (!reqBody.contact) {
    res.status(400).send({"status": "failed", "reason": "contact missing"});
    return;
  }
  if (!reqBody.email) {
    res.status(400).send({"status": "failed", "reason": "email missing"});
    return;
  }
  if (!reqBody.dob) {
    res.status(400).send({"status": "failed", "reason": "dob missing"});
    return;
  }

  models.mPatients.create(reqBody, function(patientRow) {
       res.setHeader("Content-Type", "application/json");
        if(patientRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Patient already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.patient.PatientStruc(JSON.parse(patientRow)) }));
       }
  });
});


router.post('/patient/read/:patient_id?',function(req,res){
  if (!req.params.patient_id) {
     models.mPatients.read( function(patientArray) {
       res.status(200).send({"status": "success", "data" : views.patient.PatientReadAllStruc(JSON.parse(patientArray)) });
     });
   }
   else {
       models.mPatients.readbyID(req.params.patient_id,function(patientRow){
          res.setHeader("Content-Type", "application/json");
          if(patientRow!= "null" && patientRow!="0"){
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.patient.PatientStruc(JSON.parse(patientRow)) }));
         }
         else if(patientRow == "null")
          {
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Patient doesn't exist!" }));
          }
          else{
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
          }
       });
   }
});


router.post('/patient/update/:patient_id?',function(req,res){
  if(!req.params.patient_id)
  {
    res.status(400).send({"status": "failed", "reason":"Specify which ID to be updated! "});
    return;
  }
  else {
    var reqBody=req.body;
    if (!reqBody.patient_name) {
      res.status(400).send({"status": "failed", "reason": "patient_name missing"});
      return;
    }
    if (!reqBody.age) {
      res.status(400).send({"status": "failed", "reason": "age missing"});
      return;
    }
    if (!reqBody.gender) {
      res.status(400).send({"status": "failed", "reason": "gender missing"});
      return;
    }
    if (!reqBody.contact) {
      res.status(400).send({"status": "failed", "reason": "contact missing"});
      return;
    }
    if (!reqBody.email) {
      res.status(400).send({"status": "failed", "reason": "email missing"});
      return;
    }
    if (!reqBody.dob) {
      res.status(400).send({"status": "failed", "reason": "dob missing"});
      return;
    }
    if (!reqBody.height) {
      res.status(400).send({"status": "failed", "reason": "height missing"});
      return;
    }
    if (!reqBody.weight) {
      res.status(400).send({"status": "failed", "reason": "weight missing"});
      return;
    }
    if (!reqBody.allergies) {
      res.status(400).send({"status": "failed", "reason": "allergies missing"});
      return;
    }
    if (!reqBody.diseases) {
      res.status(400).send({"status": "failed", "reason": "diseases missing"});
      return;
    }
    if (!reqBody.BMI) {
      res.status(400).send({"status": "failed", "reason": "BMI missing"});
      return;
    }
    if (!reqBody.blood_group) {
      res.status(400).send({"status": "failed", "reason": "blood_group missing"});
      return;
    }
    if (!reqBody.profile_image) {
      res.status(400).send({"status": "failed", "reason": "profile_image missing"});
      return;
    }
    if (!reqBody.medications) {
      res.status(400).send({"status": "failed", "reason": "medications missing"});
      return;
    }

    models.mPatients.update(reqBody,req.params.patient_id,function(patientRow){
       res.setHeader("Content-Type", "application/json");
       if(patientRow!="null" && patientRow!="0")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.patient.PatientStruc(JSON.parse(patientRow)) }));
        }
        else if(patientRow == "null" ){
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Patient doesn't exist!" }));
      }
       else{
         res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
       }
    });
  }
});

router.post('/patient/delete/:patient_id?',function(req,res){
  if (!req.params.patient_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mPatients.delete_patient(req.params.patient_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist!="null" && IdExist!="0")
     {
       res.status(200).send({"status": "success", "data" : "Deleted successfully! "});
     }
     else if (IdExist == "0"){
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Patient doesn't exist!" }));
    }
    else{
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
    }
  });
});

module.exports = router;
