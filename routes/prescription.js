var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/prescription/create/:AppointmentId/:PatientId/:ClinicId/:DoctorId',function(req,res){
  var reqBody=req.body;
  
  if (!reqBody.medicines) {
    res.status(400).send({"status": "failed", "reason": "medicines missing"});
    return;
  }
  if (!reqBody.clinical_notes) {
    res.status(400).send({"status": "failed", "reason": "clinical_notes missing"});
    return;
  }
  if (!reqBody.observations) {
    res.status(400).send({"status": "failed", "reason": "observations missing"});
    return;
  }
  if (!reqBody.followup_date) {
    res.status(400).send({"status": "failed", "reason": "followup_date missing"});
    return;
  }
  
  models.mPrescription.create(reqBody,req.params.AppointmentId,req.params.PatientId,req.params.DoctorId,req.params.ClinicId ,function(prescriptionRow) {
       res.setHeader("Content-Type", "application/json");
        if(prescriptionRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Prescription already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.prescription.PrescriptionStruc(JSON.parse(prescriptionRow)) }));
       }
  });
});


router.post('/prescription/read/:prescription_id?',function(req,res){
  if (!req.params.prescription_id) {
     models.mPrescription.read( function(prescriptionArray) {
       res.status(200).send({"status": "success", "data" : views.prescription.PrescriptionReadAllStruc(JSON.parse(prescriptionArray)) });
     });
   }
   else {
       models.mPrescription.readbyID(req.params.prescription_id,function(prescriptionRow){
          res.setHeader("Content-Type", "application/json");
          if(prescriptionRow!="null" && prescriptionRow!="0")
           {
             res.status(200).send(JSON.stringify({"status": "success", "data" : views.prescription.PrescriptionStruc(JSON.parse(prescriptionRow)) }));
           }
           else if(prescriptionRow == "null" ){
             res.status(400).send(JSON.stringify({"status": "failed", "reason": "Prescription doesn't exist!" }));
         }
          else{
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
          }
       });
   }
});


router.post('/prescription/update/:prescription_id?',function(req,res){
  if(!req.params.prescription_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
    var reqBody = req.body;
    
  if (!reqBody.medicines) {
    res.status(400).send({"status": "failed", "reason": "medicines missing"});
    return;
  }
  if (!reqBody.clinical_notes) {
    res.status(400).send({"status": "failed", "reason": "clinical_notes missing"});
    return;
  }
  if (!reqBody.observations) {
    res.status(400).send({"status": "failed", "reason": "observations missing"});
    return;
  }
  if (!reqBody.followup_date) {
    res.status(400).send({"status": "failed", "reason": "followup_date missing"});
    return;
  }
    models.mPrescription.update(reqBody,req.params.prescription_id,function(prescriptionRow){
       res.setHeader("Content-Type", "application/json");
       if(prescriptionRow!="null" && prescriptionRow!="0")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.prescription.PrescriptionStruc(JSON.parse(prescriptionRow)) }));
        }
        else if(prescriptionRow == "null" ){
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Prescription doesn't exist!" }));
      }
       else{
         res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
       }
    });
  }
});

router.post('/prescription/delete/:prescription_id?',function(req,res){
  if (!req.params.prescription_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mPrescription.delete_prescription(req.params.prescription_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist!="null" && IdExist!="0")
     {
       res.status(200).send({"status": "success", "data" : "Deleted successfully! "});
     }
     else if (IdExist == "0"){
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Prescription doesn't exist!" }));
    }
    else{
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
    }
  });
});

module.exports = router;
