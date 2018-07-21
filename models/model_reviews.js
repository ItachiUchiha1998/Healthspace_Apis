var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Review = db.Review_Details;

function create(newReview,Patient_id,Doctor_id, callback) {
        
            Review.create({
              rating: newReview.rating,
              review_body: newReview.review_body,
              patient_id: Patient_id,
              doctor_id: Doctor_id
            }, function (err, user , numberAffected) {
                    console.log(user);
                    callback(JSON.stringify(user));
            }); 
}

function read(callback) {
    Review.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayReview= [];
          for(ReviewRow in user)
         {var row = user[ReviewRow];
             displayReview.push(row);}
            callback(JSON.stringify(displayReview));
       }
    });
}

function readbyID(Reviewid,callback) {
    Review.findOne({ _id : Reviewid}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
            callback(JSON.stringify(user));
       }
    });
}

function delete_review(Reviewid, callback){
  Review.remove({_id: Reviewid},function(err,doc){
    if(err){
			console.log(err);
			callback("null");
		}
    else{
			console.log(doc);
      callback(JSON.stringify(doc.n));
    }
  })
}

function update(newReview,Reviewid,callback){
  Review.findOneAndUpdate({ _id: Reviewid}, {$set: {
              rating: newReview.rating,
              review_body: newReview.review_body,
      }}, {new: true}, function(err, doc){
      if(err){
          console.log(err);
	  callback("0");
      }
      else{
        callback(JSON.stringify(doc));
      }
  });
}

module.exports = {create,read,readbyID, delete_review,update};
