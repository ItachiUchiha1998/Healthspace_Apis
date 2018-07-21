var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var ClinicMaster = db.Clinic_Master_Details;
var Clinic = db.Clinic_Details;

function readclbycm(clinicmaster_id,callback) {
    ClinicMaster.findOne({_id: clinicmaster_id}).populate('clinics').exec(function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayclinicmaster= [];
          for(clinicmasterRow in user.clinics)
         {var row = user.clinics[clinicmasterRow];
		if(user.clinics[clinicmasterRow].address)
             displayclinicmaster.push(row);}
            callback(JSON.stringify(displayclinicmaster));
       }
     });
}

function readcmbycl(clinic_id,callback) {
    Clinic.findOne({_id: clinic_id}).populate('parent_clinic_id').exec(function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
	        console.log(user);
          callback(JSON.stringify(user));
	   }
     });
}

function readcmbyclAll(callback) {
    Clinic.find({}).populate('parent_clinic_id').exec(function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayclinic= [];
          for(clinicRow in user)
         {var row = user[clinicRow];
             displayclinic.push(row);}
            callback(JSON.stringify(displayclinic));
       }
     });
}


module.exports = {readclbycm,readcmbycl,readcmbyclAll};
