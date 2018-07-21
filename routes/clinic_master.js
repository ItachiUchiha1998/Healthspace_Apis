var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/clinicmaster/create',function(req,res){
  var reqBody=req.body;
  if (!reqBody.clinicmaster_name) {
    res.status(400).send({"status": "failed", "reason": "clinicmaster_name missing"});
    return;
  }
  if (!reqBody.company_number) {
    res.status(400).send({"status": "failed", "reason": "company_number missing"});
    return;
  }
  if (!reqBody.admin_name) {
    res.status(400).send({"status": "failed", "reason": "admin_name missing"});
    return;
  }
  if (!reqBody.contact_info) {
    res.status(400).send({"status": "failed", "reason": "contact_info missing"});
    return;
  }
  models.mClinicmasters.create(reqBody, function(clinicmasterRow) {
       res.setHeader("Content-Type", "application/json");
        if(clinicmasterRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "ClinicMaster already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.clinicmaster.ClinicMasterStruc(JSON.parse(clinicmasterRow)) }));
       }
  });
});


router.post('/clinicmaster/read/:clinicmaster_id?',function(req,res){
  if (!req.params.clinicmaster_id) {
     models.mClinicmasters.read( function(clinicmasterArray) {
       res.status(200).send({"status": "success", "data" : views.clinicmaster.ClinicMasterReadAllStruc(JSON.parse(clinicmasterArray)) });
     });
   }
   else {
       models.mClinicmasters.readbyID(req.params.clinicmaster_id,function(clinicmasterRow){
          res.setHeader("Content-Type", "application/json");
          if(clinicmasterRow!="null" && clinicmasterRow!="0")
           {
             res.status(200).send(JSON.stringify({"status": "success", "data" : views.clinicmaster.ClinicMasterStruc(JSON.parse(clinicmasterRow)) }));
           }
           else if(clinicmasterRow == "null" ){
             res.status(400).send(JSON.stringify({"status": "failed", "reason": "ClinicMaster doesn't exist!" }));
         }
          else{
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
          }
       });
   }
});


router.post('/clinicmaster/update/:clinicmaster_id?',function(req,res){
  if(!req.params.clinicmaster_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
    var reqBody = req.body;
    if (!reqBody.clinicmaster_name) {
      res.status(400).send({"status": "failed", "reason": "clinicmaster_name missing"});
      return;
    }
    if (!reqBody.company_number) {
      res.status(400).send({"status": "failed", "reason": "company_number missing"});
      return;
    }
    if (!reqBody.admin_name) {
      res.status(400).send({"status": "failed", "reason": "admin_name missing"});
      return;
    }
    if (!reqBody.contact_info) {
      res.status(400).send({"status": "failed", "reason": "contact_info missing"});
      return;
    }
    models.mClinicmasters.update(reqBody,req.params.clinicmaster_id,function(clinicmasterRow){
       res.setHeader("Content-Type", "application/json");
       if(clinicmasterRow!="null" && clinicmasterRow!="0")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.clinicmaster.ClinicMasterStruc(JSON.parse(clinicmasterRow)) }));
        }
        else if(clinicmasterRow == "null" ){
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "ClinicMaster doesn't exist!" }));
      }
       else{
         res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
       }
    });
  }
});

router.post('/clinicmaster/delete/:clinicmaster_id?',function(req,res){
  if (!req.params.clinicmaster_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mClinicmasters.delete_clinicmaster(req.params.clinicmaster_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist!="null" && IdExist!="0")
     {
       res.status(200).send({"status": "success", "data" : "Deleted successfully! "});
     }
     else if (IdExist == "0"){
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "ClinicMaster doesn't exist!" }));
    }
    else{
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
    }
  });
});

module.exports = router;
