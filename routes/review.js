var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/review/create/:Patient_id/:Doctor_id',function(req,res){
  var reqBody=req.body;
  if (!reqBody.review_body) {
    res.status(400).send({"status": "failed", "reason": "review_body missing"});
    return;
  }
  if (!reqBody.rating) {
    res.status(400).send({"status": "failed", "reason": "rating missing"});
    return;
  }
  
  models.mReviews.create(reqBody,req.params.Patient_id,req.params.Doctor_id, function(reviewRow) {
       res.setHeader("Content-Type", "application/json");
        if(reviewRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Review already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.review.ReviewStruc(JSON.parse(reviewRow)) }));
       }
  });
});


router.post('/review/read/:review_id?',function(req,res){
  if (!req.params.review_id) {
     models.mReviews.read( function(reviewArray) {
       res.status(200).send({"status": "success", "data" : views.review.ReviewReadAllStruc(JSON.parse(reviewArray)) });
     });
   }
   else {
       models.mReviews.readbyID(req.params.review_id,function(reviewRow){
          res.setHeader("Content-Type", "application/json");
          if(reviewRow!= "null"){
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.review.ReviewStruc(JSON.parse(reviewRow)) }));
         }
         else
          {
            res.status(400).send(JSON.stringify({"status": "failed", "reason": "Review doesn't exist!" }));
          }
       });
   }
});


router.post('/review/update/:review_id?',function(req,res){
  if(!req.params.review_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
    var reqBody = req.body;
    if (!reqBody.review_body) {
    res.status(400).send({"status": "failed", "reason": "review_body missing"});
    return;
  }
  if (!reqBody.rating) {
    res.status(400).send({"status": "failed", "reason": "rating missing"});
    return;
  }
    models.mReviews.update(reqBody,req.params.review_id,function(reviewRow){
       res.setHeader("Content-Type", "application/json");
       if(reviewRow!="null")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.review.ReviewStruc(JSON.parse(reviewRow)) }));
        }
        else {
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Review doesn't exist!" }));
      }
    });
  }
});

router.post('/review/delete/:review_id?',function(req,res){
  if (!req.params.review_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mReviews.delete_review(req.params.review_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist == "Deleted")
     {
       res.status(200).send({"status": "success", "data" : "Deleted"});
     }
     else{
      res.status(400).send(JSON.stringify({"status": "failed", "reason": "Review doesn't exist!" }));
    }
  });
});

module.exports = router;
