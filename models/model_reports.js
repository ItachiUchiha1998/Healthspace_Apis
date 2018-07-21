var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Report = db.Report_Details;

function create(newReport,AppointmentId,PatientId,DoctorId,ClinicId,callback) {
        
            Report.create({
              appointment_id: AppointmentId,
              patient_id: PatientId,
              doctor_id: DoctorId,
              clinic_id: ClinicId,
              description: newReport.description,
              bill: newReport.bill,
              date: newReport.date,
              paid: newReport.paid,
              report_link: newReport.report_link
            }, function (err, user , numberAffected) {
                    console.log(user);
                    callback(JSON.stringify(user));
            }); 
}

function read(callback) {
    Report.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayReport= [];
          for(ReportRow in user)
         {var row = user[ReportRow];
             displayReport.push(row);}
            callback(JSON.stringify(displayReport));
       }
    });
}

function readbyID(Reportid,callback) {
    Report.findOne({ _id : Reportid}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
            callback(JSON.stringify(user));
       }
    });
}

function delete_report(Reportid, callback){
  Report.remove({_id: Reportid},function(err,doc){
    if(doc.n == 0){
      callback("0");
      console.log(err);
    }
    else{
      callback("Deleted");
    }
  })
}

function update(newReport,Reportid,callback){
  Report.findOneAndUpdate({ _id: Reportid}, {$set: {
                            bill: newReport.bill,
                            paid: newReport.paid,
                            description: newReport.description,
                            report_link: newReport.report_link
      }}, {new: true}, function(err, doc){
      if(err){
          console.log(err);
      }
      else{
        callback(JSON.stringify(doc));
      }
  });
}

module.exports = {create,read,readbyID, delete_report,update};
