var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/report/create/:Patient_id/:Doctor_id/:Appointment_id/:Clinic_id',function(req,res){
  var reqBody=req.body;
  if (!reqBody.description) {
    res.status(400).send({"status": "failed", "reason": "description missing"});
    return;
  }
  
  models.mReports.create(reqBody,req.params.Appointment_id,req.params.Patient_id,req.params.Doctor_id,req.params.Clinic_id, function(reportRow) {
       res.setHeader("Content-Type", "application/json");
        if(reportRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Report already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.report.ReportStruc(JSON.parse(reportRow)) }));
       }
  });
});


router.post('/report/read/:report_id?',function(req,res){
  if (!req.params.report_id) {
     models.mReports.read( function(reportArray) {
       res.status(200).send({"status": "success", "data" : views.report.ReportReadAllStruc(JSON.parse(reportArray)) });
     });
   }
   else {
       models.mReports.readbyID(req.params.report_id,function(reportRow){
          res.setHeader("Content-Type", "application/json");
          if(reportRow!= "null"){
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.report.ReportStruc(JSON.parse(reportRow)) }));
         }
         else
          {
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Report doesn't exist!" }));
          }
       });
   }
});


router.post('/report/update/:report_id?',function(req,res){
  if(!req.params.report_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
    var reqBody = req.body;
    if (!reqBody.description) {
    res.status(400).send({"status": "failed", "reason": "description missing"});
    return;
  }
    models.mReports.update(reqBody,req.params.report_id,function(reportRow){
       res.setHeader("Content-Type", "application/json");
       if(reportRow!="null")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.report.ReportStruc(JSON.parse(reportRow)) }));
        }
        else {
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Report doesn't exist!" }));
      }
    });
  }
});

router.post('/report/delete/:report_id?',function(req,res){
  if (!req.params.report_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mReports.delete_report(req.params.report_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist == "Deleted")
     {
       res.status(200).send({"status": "success", "data" : "Deleted"});
     }
     else{
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Report doesn't exist!" }));
    }
  });
});

module.exports = router;
