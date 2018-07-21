var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/appointment/create/:PatientId/:DoctorId/:ClinicId',function(req,res){
  var reqBody=req.body;

  if (!reqBody.date) {
    res.status(400).send({"status": "failed", "reason": "date missing"});
    return;
  }
  if (!reqBody.time) {
    res.status(400).send({"status": "failed", "reason": "time missing"});
    return;
  }
  if (!reqBody.type) {
    res.status(400).send({"status": "failed", "reason": "type missing"});
    return;
  }
  if (!reqBody.reason) {
    res.status(400).send({"status": "failed", "reason": "reason missing"});
    return;
  }
  if (!reqBody.services) {
    res.status(400).send({"status": "failed", "reason": "services missing"});
    return;
  }
  if (!reqBody.status) {
    res.status(400).send({"status": "failed", "reason": "status missing"});
    return;
  }
  if (!reqBody.referedBy) {
    res.status(400).send({"status": "failed", "reason": "referedBy missing"});
    return;
  }
  models.mAppointments.create(reqBody,req.params.PatientId,req.params.DoctorId,req.params.ClinicId ,function(appointmentRow) {
       res.setHeader("Content-Type", "application/json");
        if(appointmentRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Appointment already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.appointment.AppointmentStruc(JSON.parse(appointmentRow)) }));
       }
  });
});


router.post('/appointment/read/:appointment_id?',function(req,res){
  if (!req.params.appointment_id) {
     models.mAppointments.read( function(appointmentArray) {
       res.status(200).send({"status": "success", "data" : views.appointment.AppointmentReadAllStruc(JSON.parse(appointmentArray)) });
     });
   }
   else {
       models.mAppointments.readbyID(req.params.appointment_id,function(appointmentRow){
          res.setHeader("Content-Type", "application/json");
          if(appointmentRow!="null" && appointmentRow!="0")
           {
             res.status(200).send(JSON.stringify({"status": "success", "data" : views.appointment.AppointmentStruc(JSON.parse(appointmentRow)) }));
           }
           else if(appointmentRow == "null" ){
             res.status(400).send(JSON.stringify({"status": "failed", "reason": "Appointment doesn't exist!" }));
         }
          else{
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
          }
       });
   }
});


router.post('/appointment/update/:appointment_id?',function(req,res){
  if(!req.params.appointment_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
    var reqBody = req.body;

    if (!reqBody.date) {
      res.status(400).send({"status": "failed", "reason": "date missing"});
      return;
    }
    if (!reqBody.time) {
      res.status(400).send({"status": "failed", "reason": "time missing"});
      return;
    }
    if (!reqBody.type) {
      res.status(400).send({"status": "failed", "reason": "type missing"});
      return;
    }
    if (!reqBody.reason) {
      res.status(400).send({"status": "failed", "reason": "reason missing"});
      return;
    }
    if (!reqBody.services) {
      res.status(400).send({"status": "failed", "reason": "services missing"});
      return;
    }
    if (!reqBody.status) {
      res.status(400).send({"status": "failed", "reason": "status missing"});
      return;
    }
    if (!reqBody.referedBy) {
      res.status(400).send({"status": "failed", "reason": "referedBy missing"});
      return;
    }
    models.mAppointments.update(reqBody,req.params.appointment_id,function(appointmentRow){
       res.setHeader("Content-Type", "application/json");
       if(appointmentRow!="null" && appointmentRow!="0")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.appointment.AppointmentStruc(JSON.parse(appointmentRow)) }));
        }
        else if(appointmentRow == "null" ){
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Appointment doesn't exist!" }));
      }
       else{
         res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
       }
    });
  }
});

router.post('/appointment/delete/:appointment_id?',function(req,res){
  if (!req.params.appointment_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mAppointments.delete_appointment(req.params.appointment_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist!="null" && IdExist!="0")
     {
       res.status(200).send({"status": "success", "data" : "Deleted successfully! "});
     }
     else if (IdExist == "0"){
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Appointment doesn't exist!" }));
    }
    else{
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
    }
  });
});

module.exports = router;
