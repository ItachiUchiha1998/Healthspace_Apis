var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Clinic = db.Clinic_Details;
var ClinicMaster = db.Clinic_Master_Details;

function create(newClinic, callback) {
    // Clinic.findOne({ company_number: newClinic.company_number }, function (err, user) {
    //     if (err) {
    //         console.log(err);
    //         callback("0");
    //     }
    //     else if (user) {
    //         callback("duplicate");
    //     }
    //   else {
            Clinic.create({name: newClinic.clinic_name, address:  newClinic.address,
                           categories: newClinic.categories, timings: newClinic.timings, 
                           contact: newClinic.contact, email : newClinic.email, 
                           location: newClinic.location, website: newClinic.website, 
                           images: newClinic.images, services: newClinic.services, 
                           description: newClinic.description, parent_clinic_id: newClinic.clinicmaster_id }, function (err, user , numberAffected) {
                              console.log(user);
                              ClinicMaster.findOneAndUpdate({_id: newClinic.clinicmaster_id}, { $push: {clinics: user._id}}, {new: true}, function(err, doc){
                                if(err){
                                    console.log(err);
                                    callback("0");
                                }
                                else{
                                console.log("asasas")
                                  callback(JSON.stringify(user));
                                }
                              });

            });
}

function read(callback) {
    Clinic.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayClinic= [];
          for(ClinicRow in user)
         {var row = user[ClinicRow];
             displayClinic.push(row);}
            callback(JSON.stringify(displayClinic));
       }
    });
}

function readbyID(Clinicid,callback) {
    Clinic.findOne({ _id : Clinicid}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
            callback(JSON.stringify(user));
       }
    });
}

function delete_clinic(Clinicid, callback){
  Clinic.remove({_id: Clinicid},function(err,doc){
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

function update(newClinic,Clinicid,callback){
  Clinic.findOneAndUpdate({ _id: Clinicid}, {$set: {name: newClinic.clinic_name, address:  newClinic.address, categories: newClinic.categories, timings: newClinic.timings, contact: newClinic.contact, email : newClinic.email, location: newClinic.location, website: newClinic.website, images: newClinic.images, services: newClinic.services, description: newClinic.description }}, {new: true}, function(err, doc){
      if(err){
          console.log(err);
					callback("0");
      }
      else{
        callback(JSON.stringify(doc));
      }
  });
}

module.exports = {create,read,readbyID, delete_clinic,update};
