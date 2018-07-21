function PatientStruc(PatientDBStruc) {
  return {
    "patient_id": PatientDBStruc._id,
    "patient_name" : PatientDBStruc.name,
    "patient_age" : PatientDBStruc.age,
    "patient_gender" : PatientDBStruc.gender,
    "patient_dob": PatientDBStruc.dob,
    "patient_contact": PatientDBStruc.contact,
    "patient_email": PatientDBStruc.email,
    "patient_address": PatientDBStruc.address,
    "patient_height": PatientDBStruc.height,
    "patient_weight": PatientDBStruc.weight,
    "patient_bloodgroup": PatientDBStruc.blood_group,
    "patient_profileimage": PatientDBStruc.profile_image,
    "patient_allergies": PatientDBStruc.allergies,
    "patient_diseases": PatientDBStruc.diseases,
    "patient_BMI": PatientDBStruc.BMI,
    "patient_medications": PatientDBStruc.medications,
  }
}

function PatientReadAllStruc(PatientDBStruc){
  displaypatient=[];
    for(row in PatientDBStruc){
     data ={
       "patient_id": PatientDBStruc[row]._id,
       "patient_name" : PatientDBStruc[row].name,
       "patient_age" : PatientDBStruc[row].age,
       "patient_gender" : PatientDBStruc[row].gender,
       "patient_dob": PatientDBStruc[row].dob,
       "patient_contact": PatientDBStruc[row].contact,
       "patient_email": PatientDBStruc[row].email,
       "patient_address": PatientDBStruc[row].address,
       "patient_height": PatientDBStruc[row].height,
       "patient_weight": PatientDBStruc[row].weight,
       "patient_bloodgroup": PatientDBStruc[row].blood_group,
       "patient_profileimage": PatientDBStruc[row].profile_image,
       "patient_allergies": PatientDBStruc[row].allergies,
       "patient_diseases": PatientDBStruc[row].diseases,
       "patient_BMI": PatientDBStruc[row].BMI,
       "patient_medications": PatientDBStruc[row].medications,
      }
     displaypatient.push(data);
     }
   return (displaypatient);
  }
module.exports = {PatientStruc,PatientReadAllStruc};
