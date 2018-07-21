var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Prescription = db.Prescription_Details;

function create(newPrescription,AppointmentId,PatientId,DoctorId,ClinicId, callback) {

            Prescription.create({
            	name: newPrescription.prescription_name, 
				appointment_id: AppointmentId,
				patient_id:PatientId,
				doctor_id: DoctorId,
				clinic_id: ClinicId,
				medicines: newPrescription.medicines,
				clinical_notes: newPrescription.clinical_notes,
				observations: newPrescription.observations,
				followup_date: newPrescription.followup_date
            }, function (err, user , numberAffected) {
                console.log(user);
                    callback(JSON.stringify(user));
            });

}

function read(callback) {
    Prescription.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayPrescription= [];
          for(PrescriptionRow in user)
         {var row = user[PrescriptionRow];
             displayPrescription.push(row);}
            callback(JSON.stringify(displayPrescription));
       }
    });
}

function readbyID(Prescriptionid,callback) {
    Prescription.findOne({ _id : Prescriptionid}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
            callback(JSON.stringify(user));
       }
    });
}

function delete_prescription(Prescriptionid, callback){
  Prescription.remove({_id: Prescriptionid},function(err,doc){
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

function update(newPrescription,Prescriptionid,callback){
  Prescription.findOneAndUpdate({ _id: Prescriptionid}, {$set: {
  				name: newPrescription.prescription_name, 
				medicines: newPrescription.medicines,
				clinical_notes: newPrescription.clinical_notes,
				observations: newPrescription.observations,
				followup_date: newPrescription.followup_date
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

module.exports = {create,read,readbyID, delete_prescription,update};
