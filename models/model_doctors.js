var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Doctor = db.Doctor_Details;
var Clinic = db.Clinic_Details;

function create(newDoctor, callback) {
  if (typeof newDoctor.MCI_Number == "undefined" || newDoctor.MCI_Number == "" ){
    Doctor.create({
      name: newDoctor.doctor_name,
       mci_number: newDoctor.MCI_Number,
      contact: newDoctor.contact,
      email: newDoctor.email,
      speciality: newDoctor.speciality,
      gender: newDoctor.gender,
      clinics: newDoctor.clinics,
      qualification: newDoctor.qualification,
      experience: newDoctor.experience,
      profile_image: newDoctor.profile_image,
      clinic_ids: newDoctor.clinic_id
    }, function (err, user , numberAffected) {
            console.log(err);
            console.log(user);
            Clinic.findOneAndUpdate({_id: newDoctor.clinic_id}, { $push: {doctor_ids: user._id}}, {new: true}, function(err, doc){
            if(err){
                console.log(err);
                callback("0");
            }
            else{
              callback(JSON.stringify(user));
            }
          });
    });
  }
  else{
    Doctor.findOne({ mci_number: newDoctor.MCI_Number }, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
        else if (user) {
          console.log(user);
            callback("duplicate");
        }
       else {
            Doctor.create({
              name: newDoctor.doctor_name,
	             mci_number: newDoctor.MCI_Number,
              contact: newDoctor.contact,
              email: newDoctor.email,
              speciality: newDoctor.speciality,
              gender: newDoctor.gender,
              clinics: newDoctor.clinics,
              qualification: newDoctor.qualification,
              experience: newDoctor.experience,
              profile_image: newDoctor.profile_image,
              clinic_ids: newDoctor.clinic_id
            }, function (err, user , numberAffected) {
                    console.log(err);
                    console.log(user);
                    Clinic.findOneAndUpdate({_id: newDoctor.clinic_id}, { $push: {doctor_ids: user._id}}, {new: true}, function(err, doc){
                    if(err){
                        console.log(err);
              					callback("0");
                    }
                    else{
                      callback(JSON.stringify(user));
                    }
                  });
            });
       }
    });
  }
}

function read(callback) {
    Doctor.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayDoctor= [];
          for(DoctorRow in user)
         {var row = user[DoctorRow];
             displayDoctor.push(row);}
            callback(JSON.stringify(displayDoctor));
       }
    });
}

function readbyID(Doctorid,callback) {
    Doctor.findOne({ _id : Doctorid}, function (err, user) {
         if (err) {
            console.log(err);
            callback("0");
        }
       else {
            callback(JSON.stringify(user));
       }
    });
}

function delete_doctor(Doctorid, callback){
  Doctor.remove({_id: Doctorid},function(err,doc){
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

function update(newDoctor,Doctorid,callback){
  Doctor.findOneAndUpdate({ _id: Doctorid}, {$set: {
              name: newDoctor.doctor_name,
              contact: newDoctor.contact,
              email: newDoctor.email,
	            mci_number: newDoctor.MCI_Number,
              speciality: newDoctor.speciality,
              gender: newDoctor.gender,
              qualification: newDoctor.qualification,
              experience: newDoctor.experience,
              profile_image: newDoctor.profile_image
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

module.exports = {create,read,readbyID, delete_doctor,update};
