var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/clinic/create',function(req,res){
  var reqBody=req.body;
  if (!reqBody.clinic_name) {
    res.status(400).send({"status": "failed", "reason": "clinic_name missing"});
    return;
  }
  if (!reqBody.categories) {
    res.status(400).send({"status": "failed", "reason": "categories missing"});
    return;
  }
  if (!reqBody.timings) {
    res.status(400).send({"status": "failed", "reason": "timings missing"});
    return;
  }
  if (!reqBody.contact) {
    res.status(400).send({"status": "failed", "reason": "contact missing"});
    return;
  }
  // if (!reqBody.email) {
  //   res.status(400).send({"status": "failed", "reason": "email missing"});
  //   return;
  // }
  // if (!reqBody.services) {
  //   res.status(400).send({"status": "failed", "reason": "services missing"});
  //   return;
  // }
  // if (!reqBody.description) {
  //   res.status(400).send({"status": "failed", "reason": "description missing"});
  //   return;
  // }
  if (!reqBody.address) {
    res.status(400).send({"status": "failed", "reason": "address missing"});
    return;
  }

  models.mClinics.create(reqBody, function(clinicRow) {
       res.setHeader("Content-Type", "application/json");
        if(clinicRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Clinic already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.clinic.ClinicStruc(JSON.parse(clinicRow)) }));
       }
  });
});


router.post('/clinic/read/:clinic_id?',function(req,res){
  if (!req.params.clinic_id) {
     models.mClinics.read( function(clinicArray) {
       res.status(200).send({"status": "success", "data" : views.clinic.ClinicReadAllStruc(JSON.parse(clinicArray)) });
     });
   }
   else {
       models.mClinics.readbyID(req.params.clinic_id,function(clinicRow){
          res.setHeader("Content-Type", "application/json");
          if(clinicRow!= "null" && clinicRow!="0"){
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.clinic.ClinicStruc(JSON.parse(clinicRow)) }));
         }
         else if(clinicRow == "null")
          {
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Clinic doesn't exist!" }));
          }
          else{
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
          }
       });
   }
});


router.post('/clinic/update/:clinic_id?',function(req,res){
  if(!req.params.clinic_id)
  {
    res.status(400).send({"status": "failed", "reason":"Specify which ID to be updated! "});
    return;
  }
  else {
    var reqBody=req.body;
    if (!reqBody.clinic_name) {
    res.status(400).send({"status": "failed", "reason": "clinic_name missing"});
    return;
  }
  if (!reqBody.categories) {
    res.status(400).send({"status": "failed", "reason": "categories missing"});
    return;
  }
  if (!reqBody.timings) {
    res.status(400).send({"status": "failed", "reason": "timings missing"});
    return;
  }
  if (!reqBody.contact) {
    res.status(400).send({"status": "failed", "reason": "contact missing"});
    return;
}
    models.mClinics.update(reqBody,req.params.clinic_id,function(clinicRow){
       res.setHeader("Content-Type", "application/json");
       if(clinicRow!="null" && clinicRow!="0")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.clinic.ClinicStruc(JSON.parse(clinicRow)) }));
        }
        else if(clinicRow == "null" ){
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Clinic doesn't exist!" }));
      }
       else{
         res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
       }
    });
  }
});

router.post('/clinic/delete/:clinic_id?',function(req,res){
  if (!req.params.clinic_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mClinics.delete_clinic(req.params.clinic_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist!="null" && IdExist!="0")
     {
       res.status(200).send({"status": "success", "data" : "Deleted successfully! "});
     }
     else if (IdExist == "0"){
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Clinic doesn't exist!" }));
    }
    else{
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
    }
  });
});

module.exports = router;
