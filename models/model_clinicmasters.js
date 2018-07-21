var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var ClinicMaster = db.Clinic_Master_Details;

function create(newClinicMaster, callback) {
    ClinicMaster.findOne({ company_number: newClinicMaster.company_number }, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
        else if (user) {
            callback("duplicate");
        }
       else {
            ClinicMaster.create({name: newClinicMaster.clinicmaster_name, company_number: newClinicMaster.company_number, admin_name: newClinicMaster.admin_name, contact_info: newClinicMaster.contact_info }, function (err, user , numberAffected) {
                console.log(user);
                    callback(JSON.stringify(user));
            });
       }
    });
}

function read(callback) {
    ClinicMaster.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayClinicMaster= [];
          for(ClinicMasterRow in user)
         {var row = user[ClinicMasterRow];
             displayClinicMaster.push(row);}
            callback(JSON.stringify(displayClinicMaster));
       }
    });
}

function readbyID(ClinicMasterid,callback) {
    ClinicMaster.findOne({ _id : ClinicMasterid}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
            callback(JSON.stringify(user));
       }
    });
}

function delete_clinicmaster(ClinicMasterid, callback){
  ClinicMaster.remove({_id: ClinicMasterid},function(err,doc){
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

function update(newClinicMaster,ClinicMasterid,callback){
  ClinicMaster.findOneAndUpdate({ _id: ClinicMasterid}, {$set: {name: newClinicMaster.clinicmaster_name, company_number: newClinicMaster.company_number, admin_name: newClinicMaster.admin_name, contact_info: newClinicMaster.contact_info}}, {new: true}, function(err, doc){
      if(err){
          console.log(err);
          callback("0");
      }
      else{
        callback(JSON.stringify(doc));
      }
  });
}

module.exports = {create,read,readbyID, delete_clinicmaster,update};
