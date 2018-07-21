var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Appointment = db.Appointment_Details;

function create(newAppointment,PatientId,DoctorId,ClinicId, callback) {
            Appointment.create({
            	date: newAppointment.date,
              time: newAppointment.time,
				patient_id:PatientId,
				doctor_id: DoctorId,
				type: newAppointment.type,
				reason: newAppointment.reason,
				services: newAppointment.services,
        status: newAppointment.status,
        clinic_id: ClinicId,
        referedBy: newAppointment.referedBy
            }, function (err, user , numberAffected) {
                console.log(user);
                    callback(JSON.stringify(user));
            });

}

function read(callback) {
    Appointment.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayAppointment= [];
          for(AppointmentRow in user)
         {var row = user[AppointmentRow];
             displayAppointment.push(row);}
            callback(JSON.stringify(displayAppointment));
       }
    });
}

function readbyID(Appointmentid,callback) {
    Appointment.findOne({ _id : Appointmentid}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
            callback(JSON.stringify(user));
       }
    });
}

function delete_appointment(Appointmentid, callback){
  Appointment.remove({_id: Appointmentid},function(err,doc){
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

function update(newAppointment,Appointmentid,callback){
  Appointment.findOneAndUpdate({ _id: Appointmentid}, {$set: {
    date: newAppointment.date,
    time: newAppointment.time,
type: newAppointment.type,
reason: newAppointment.reason,
services: newAppointment.services,
status: newAppointment.status,
referedBy: newAppointment.referedBy
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

module.exports = {create,read,readbyID, delete_appointment,update};
