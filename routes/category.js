var db = require("../dbconnection.js");
const express = require('express');
const router = express.Router();
var bodyParser = require("body-parser");

const views = require("../views/index_view.js");
const models = require("../models/index_model.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); // support json encoded bodies

router.post('/category/create',function(req,res){
  var reqBody=req.body;
  if (!reqBody.category_text) {
    res.status(400).send({"status": "failed", "reason": "category_text missing"});
    return;
  }
  if (!reqBody.category_role) {
    res.status(400).send({"status": "failed", "reason": "category_role missing"});
    return;
  }

  models.mCategorys.create(reqBody, function(categoryRow) {
       res.setHeader("Content-Type", "application/json");
        if(categoryRow == "duplicate")
        {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Category already exists!" }));
        }
       else {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.category.CategoryStruc(JSON.parse(categoryRow)) }));
       }
  });
});


router.post('/category/read/',function(req,res){
  if (!req.query.role) {
     models.mCategorys.read( function(categoryArray) {
       res.status(200).send({"status": "success", "data" : views.category.CategoryReadAllStruc(JSON.parse(categoryArray)) });
     });
   }
   else {
     models.mCategorys.readbyRole(req.query.role,function(categoryRow){
         res.setHeader("Content-Type", "application/json");
         if(categoryRow!= "null" && categoryRow!="0"){
         res.status(200).send(JSON.stringify({"status": "success", "data" : views.category.CategoryReadbyRoleAllStruc(JSON.parse(categoryRow)) }));
        }
        else if(categoryRow == "null")
         {
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Categorys do not exist!" }));
         }
         else{
           res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
         }
      });
   }
});


router.post('/category/update/:category_id?',function(req,res){
  if(!req.params.category_id)
  {
    res.status(400).send(JSON.stringify({"status": "failed", "reason":"Specify which ID to be updated! "}));
    return;
  }
  else {
    var reqBody = req.body;
    if (!reqBody.category_text) {
    res.status(400).send({"status": "failed", "reason": "category_text missing"});
    return;
  }
  if (!reqBody.category_role) {
    res.status(400).send({"status": "failed", "reason": "category_role missing"});
    return;
  }
    models.mCategorys.update(reqBody,req.params.category_id,function(categoryRow){
       res.setHeader("Content-Type", "application/json");
       if(categoryRow!="null")
        {
          res.status(200).send(JSON.stringify({"status": "success", "data" : views.category.CategoryStruc(JSON.parse(categoryRow)) }));
        }
        else {
          res.status(400).send(JSON.stringify({"status": "failed", "reason": "Category doesn't exist!" }));
      }
    });
  }
});

router.post('/category/delete/:category_id?',function(req,res){
  if (!req.params.category_id) {
    res.status(400).send({"status": "failed", "reason": "Specify which ID to be deleted!"});
    return;
  }
  models.mCategorys.delete_category(req.params.category_id,function(IdExist){
    res.setHeader("Content-Type", "application/json");
    if(IdExist!="null" && IdExist!="0")
    {
      res.status(200).send({"status": "success", "data" : "Deleted successfully! "});
    }
    else if (IdExist == "0"){
     res.status(400).send(JSON.stringify({"status": "failed", "reason": "Category doesn't exist!" }));
   }
   else{
     res.status(400).send(JSON.stringify({"status": "failed", "reason": "Database Error!" }));
   }
  });
});

module.exports = router;
