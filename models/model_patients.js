var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Patient = db.Patient_Details;

function create(newPatient, callback) {
    Patient.findOne({ contact: newPatient.contact }, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
        else if (user) {
            callback("duplicate");
        }
      else {
            Patient.create({name: newPatient.patient_name, address:  newPatient.address, age: newPatient.age, gender: newPatient.gender, dob: newPatient.dob, contact: newPatient.contact, email : newPatient.email, profile_image: newPatient.profile_image, allergies: newPatient.allergies, diseases: newPatient.diseases, blood_group: newPatient.blood_group, height: newPatient.height, weight: newPatient.weight,  BMI: newPatient.BMI,  medications: newPatient.medications }, function (err, user , numberAffected) {
                console.log(user);
                    callback(JSON.stringify(user));
            });
      }
    });
}

function read(callback) {
    Patient.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayPatient= [];
          for(PatientRow in user)
         {var row = user[PatientRow];
             displayPatient.push(row);}
            callback(JSON.stringify(displayPatient));
       }
    });
}

function readbyID(Patientid,callback) {
    Patient.findOne({ _id : Patientid}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
            callback(JSON.stringify(user));
       }
    });
}

function delete_patient(Patientid, callback){
  Patient.remove({_id: Patientid},function(err,doc){
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

function update(newPatient,Patientid,callback){
  Patient.findOneAndUpdate({ _id: Patientid}, {$set: {name: newPatient.patient_name, address:  newPatient.address, age: newPatient.age, gender: newPatient.gender, dob: newPatient.dob, contact: newPatient.contact, email : newPatient.email, profile_image: newPatient.profile_image, allergies: newPatient.allergies, diseases: newPatient.diseases, blood_group: newPatient.blood_group, height: newPatient.height, weight: newPatient.weight,  BMI: newPatient.BMI,  medications: newPatient.medications}}, {new: true}, function(err, doc){
      if(err){
          console.log(err);
					callback("0");
      }
      else{
        callback(JSON.stringify(doc));
      }
  });
}

module.exports = {create,read,readbyID, delete_patient,update};
