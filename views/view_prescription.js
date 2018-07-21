function PrescriptionStruc(PrescriptionDBStruc) {
  return {
    "prescription_id": PrescriptionDBStruc._id,
    "prescription_appointment_id" : PrescriptionDBStruc.appointment_id,
    "prescription_patient_id" : PrescriptionDBStruc.patient_id,
    "prescription_doctor_id" : PrescriptionDBStruc.doctor_id,
    "prescription_clinic_id" : PrescriptionDBStruc.clinic_id,
    "prescription_reports": PrescriptionDBStruc.reports,
    "prescription_medicines": PrescriptionDBStruc.medicines,
    "prescription_clinical_notes": PrescriptionDBStruc.clinical_notes,
    "prescription_observations": PrescriptionDBStruc.observations,
    "prescription_followup_date": PrescriptionDBStruc.followup_date

  }
}

function PrescriptionReadAllStruc(PrescriptionDBStruc){
  displayprescription=[];
    for(row in PrescriptionDBStruc){
     data ={
        "prescription_id": PrescriptionDBStruc[row]._id,
        "prescription_appointment_id" : PrescriptionDBStruc[row].appointment_id,
        "prescription_patient_id" : PrescriptionDBStruc[row].patient_id,
        "prescription_doctor_id" : PrescriptionDBStruc[row].doctor_id,
        "prescription_clinic_id" : PrescriptionDBStruc[row].clinic_id,
        "prescription_reports": PrescriptionDBStruc[row].reports,
        "prescription_medicines": PrescriptionDBStruc[row].medicines,
        "prescription_clinical_notes": PrescriptionDBStruc[row].clinical_notes,
        "prescription_observations": PrescriptionDBStruc[row].observations,
        "prescription_followup_date": PrescriptionDBStruc[row].followup_date,
      }
     displayprescription.push(data);
     }
   return (displayprescription);
  }
module.exports = {PrescriptionStruc,PrescriptionReadAllStruc};
