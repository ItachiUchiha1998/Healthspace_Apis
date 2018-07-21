var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/clinic/readbycm/:clinicmaster_id?',function(req,res){
       models.mClandcm.readclbycm(req.params.clinicmaster_id,function(clinicRow){
          res.setHeader("Content-Type", "application/json");
          if(clinicRow!= "null" && clinicRow!="0"){
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.clinicbycm.ClinicReadAllStruc(JSON.parse(clinicRow)) }));
         }
         else if(clinicRow == "null")
          {
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Clinic doesn't exist!" }));
          }
          else{
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
          }
       });
});

router.post('/clinic/readwithcm/:clinic_id?',function(req,res){
	if (!req.params.clinic_id) {
  	   models.mClandcm.readcmbyclAll( function(clinicArray) {
   	    res.status(200).send({"status": "success", "data" : views.clinic.ClinicReadAllStruc(JSON.parse(clinicArray)) });
   	  });
   	}
	else{
      	  models.mClandcm.readcmbycl(req.params.clinic_id,function(clinicRow){
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



module.exports = router;
