var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/service/create',function(req,res){
  var reqBody=req.body;
  if (!reqBody.service_text) {
    res.status(400).send({"status": "failed", "reason": "service_text missing"});
    return;
  }
  if (!reqBody.service_role) {
    res.status(400).send({"status": "failed", "reason": "service_role missing"});
    return;
  }

  models.mServices.create(reqBody, function(serviceRow) {
       res.setHeader("Content-Type", "application/json");
        if(serviceRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Service already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.service.ServiceStruc(JSON.parse(serviceRow)) }));
       }
  });
});


router.post('/service/read/',function(req,res){
  if (!req.query.role) {
     models.mServices.read( function(serviceArray) {
       res.status(200).send({"status": "success", "data" : views.service.ServiceReadAllStruc(JSON.parse(serviceArray)) });
     });
   }
   else {
     models.mServices.readbyRole(req.query.role,function(serviceRow){
         res.setHeader("Content-Type", "application/json");
         if(serviceRow!= "null" && serviceRow!="0"){
         res.status(200).send(JSON.stringify({"status": "success", "data" : views.service.ServiceReadbyRoleAllStruc(JSON.parse(serviceRow)) }));
        }
        else if(serviceRow == "null")
         {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Services do not exist!" }));
         }
         else{
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
         }
      });
   }
});


router.post('/service/update/:service_id?',function(req,res){
  if(!req.params.service_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
    var reqBody = req.body;
    if (!reqBody.service_text) {
    res.status(400).send({"status": "failed", "reason": "service_text missing"});
    return;
  }
  if (!reqBody.service_role) {
    res.status(400).send({"status": "failed", "reason": "service_role missing"});
    return;
  }
    models.mServices.update(reqBody,req.params.service_id,function(serviceRow){
       res.setHeader("Content-Type", "application/json");
       if(serviceRow!="null")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.service.ServiceStruc(JSON.parse(serviceRow)) }));
        }
        else {
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Service doesn't exist!" }));
      }
    });
  }
});

router.post('/service/delete/:service_id?',function(req,res){
  if (!req.params.service_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mServices.delete_service(req.params.service_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist!="null" && IdExist!="0")
    {
      res.status(200).send({"status": "success", "data" : "Deleted successfully! "});
    }
    else if (IdExist == "0"){
     res.status(400).send(JSON.stringify({"status": "failed", "reason": "Service doesn't exist!" }));
   }
   else{
     res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
   }
  });
});

module.exports = router;
