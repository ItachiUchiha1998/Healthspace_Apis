var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/doctor/readbycl/:clinic_id?',function(req,res){
       models.mClanddoc.readdocbycl(req.params.clinic_id,function(doctorRow){
          res.setHeader("Content-Type", "application/json");
          if(doctorRow!= "null" && doctorRow!="0"){
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.doctor.DoctorReadAllStruc(JSON.parse(doctorRow)) }));
         }
         else if(doctorRow == "null")
          {
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Doctor doesn't exist!" }));
          }
          else{
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
          }
       });
});

// router.post('/doctor/readdocwithcl/:doctor_id',function(req,res) {
//        models.mClanddoc.readclbydoc(req.params.doctor_id,function(doctorRow){
//           res.setHeader("Content-Type", "application/json");
//           if(doctorRow!= "null" && doctorRow!="0"){
//           res.status(200).send(JSON.stringify({"status": "success", "data" : views.doctor.DoctorStruc(JSON.parse(doctorRow)) }));
//          }
//          else if(doctorRow == "null")
//           {
//             res.status(400).send(JSON.stringify({"status": "failed", "reason": "Doctor doesn't exist!" }));
//           }
//           else{
//             res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
//           }
//        });
// })

router.post('/doctor/updatedocbycl/:doctor_id',function(req,res) {
  if(!req.params.doctor_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
  var reqBody = req.body;
       models.mClanddoc.updateDoctorByClinic(reqBody,req.params.doctor_id,function(doctorRow){
          res.setHeader("Content-Type", "application/json");
          if(doctorRow!= "null" && doctorRow!="0"){
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.clinic.ClinicStruc(JSON.parse(doctorRow)) }));
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

module.exports = router;
