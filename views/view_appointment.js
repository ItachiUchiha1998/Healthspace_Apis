function AppointmentStruc(AppointmentDBStruc) {
  return {
    "appointment_id": AppointmentDBStruc._id,
    "appointment_patient_id" : AppointmentDBStruc.patient_id,
    "appointment_doctor_id" : AppointmentDBStruc.doctor_id,
    "appointment_clinic_id" : AppointmentDBStruc.clinic_id,
    "appointment_report_ids": AppointmentDBStruc.report_ids,
    "appointment_prescription_ids": AppointmentDBStruc.prescription_ids,
    "appointment_date": AppointmentDBStruc.date,
    "appointment_time": AppointmentDBStruc.time,
    "appointment_type": AppointmentDBStruc.type,
    "appointment_services": AppointmentDBStruc.services,
    "appointment_status": AppointmentDBStruc.status,
    "appointment_refered_by": AppointmentDBStruc.referedBy

  }
}

function AppointmentReadAllStruc(AppointmentDBStruc){
  displayappointment=[];
    for(row in AppointmentDBStruc){
     data ={
       "appointment_id": AppointmentDBStruc[row]._id,
       "appointment_patient_id" : AppointmentDBStruc[row].patient_id,
       "appointment_doctor_id" : AppointmentDBStruc[row].doctor_id,
       "appointment_clinic_id" : AppointmentDBStruc[row].clinic_id,
       "appointment_report_ids": AppointmentDBStruc[row].report_ids,
       "appointment_prescription_ids": AppointmentDBStruc[row].prescription_ids,
       "appointment_date": AppointmentDBStruc[row].date,
       "appointment_time": AppointmentDBStruc[row].time,
       "appointment_type": AppointmentDBStruc[row].type,
       "appointment_services": AppointmentDBStruc[row].services,
       "appointment_status": AppointmentDBStruc[row].status,
       "appointment_refered_by": AppointmentDBStruc[row].referedBy
      }
     displayappointment.push(data);
     }
   return (displayappointment);
  }
module.exports = {AppointmentStruc,AppointmentReadAllStruc};
