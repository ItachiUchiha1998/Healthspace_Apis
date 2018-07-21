var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Doctor = db.Doctor_Details;
var Clinic = db.Clinic_Details;

function readdocbycl(clinic_id,callback) {
    Clinic.findOne({_id: clinic_id}).populate('doctor_ids').exec(function (err, user) {
         //console.log(user)
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displaydoctor= [];
          for(doctorRow in user.doctor_ids)
         {
          var row = user.doctor_ids[doctorRow];
          console.log(row)
		      if(user.doctor_ids[doctorRow].gender)
             displaydoctor.push(row);}
            callback(JSON.stringify(displaydoctor));
       }
     });

}

function readclbydoc(doctor_id,callback) {
    Doctor.findOne({_id: doctor_id}).populate('clinic_ids').exec(function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         console.log(user);
         displayclinic= [];
          for(clinicRow in user.clinic_ids)
         {
          var row = user.clinic_ids[clinicRow];
          if(user.clinic_ids[clinicRow].description)
             displayclinic.push(row);}
            callback(JSON.stringify(displayclinic));
       }
     });

}

function updateDoctorByClinic(newDoctor, Doctorid, callback){
  var subscribed = 0;
  Doctor.findOne({_id: Doctorid}, function(err, user){
    if(err){
      console.log(err);
      callback("0");
    }
    else if (user){
      var id;
      for(id in user.clinics){
        if(user.clinics[id].clinic_id == newDoctor.clinic_id){
          console.log("whjdhjwd");
          user.clinics.splice(id,1);
          user.clinics.push(newDoctor.clinics);
          user.save(function(err, user){
              if(err){
                  console.log(err);
                  callback("0");
              }
              else{
                  console.log(user);
                  console.log("done");
                  callback(JSON.stringify(user));
                }
              });
              subscribed = 1;
        }
      }
      console.log(subscribed);
      if(subscribed == "0"){
        Doctor.findOneAndUpdate({ _id: Doctorid}, { $push: {clinics: newDoctor.clinics, clinic_ids: newDoctor.clinic_id}}, {new: true}, function(err, user){
            if(err){
                console.log(err);
                callback("0");
            }
            else{
              Clinic.findOneAndUpdate({_id: newDoctor.clinic_id}, { $push: {doctor_ids: Doctorid}}, {new: true}, function(err, doc){
              if(err){
                  console.log(err);
                  callback("0");
              }
              else{
                console.log(doc);
                callback(JSON.stringify(doc));
              }
            });
            }
        });
      }
    }
  });
}


module.exports = {readdocbycl,readclbydoc,updateDoctorByClinic};
