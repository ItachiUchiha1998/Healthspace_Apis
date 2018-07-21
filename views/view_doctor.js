function DoctorStruc(DoctorDBStruc) {
  return {
      "doctor_id": DoctorDBStruc._id,
      "doctor_MCI_Number": DoctorDBStruc.MCI_Number,
      "doctor_name": DoctorDBStruc.name,
      "doctor_contact": DoctorDBStruc.contact,
      "doctor_email": DoctorDBStruc.email,
      "doctor_speciality": DoctorDBStruc.speciality,
      "doctor_gender": DoctorDBStruc.gender,
      "doctor_clinics": DoctorDBStruc.clinics,
      "doctor_qualification": DoctorDBStruc.qualification,
      "doctor_experience": DoctorDBStruc.experience,
      "doctor_profile_image": DoctorDBStruc.profile_image,
      "doctor_clinic_ids": DoctorDBStruc.clinic_ids
  }
}

function DoctorReadAllStruc(DoctorDBStruc){
  displaydoctor=[];
    for(row in DoctorDBStruc){
     data ={
        "doctor_id": DoctorDBStruc[row]._id,
        "doctor_MCI_Number": DoctorDBStruc[row].MCI_Number,
        "doctor_name": DoctorDBStruc[row].name,
        "doctor_contact": DoctorDBStruc[row].contact,
        "doctor_email": DoctorDBStruc[row].email,
        "doctor_speciality": DoctorDBStruc[row].speciality,
        "doctor_gender": DoctorDBStruc[row].gender,
        "doctor_clinics": DoctorDBStruc[row].clinics,
        "doctor_qualification": DoctorDBStruc[row].qualification,
        "doctor_experience": DoctorDBStruc[row].experience,
        "doctor_profile_image": DoctorDBStruc[row].profile_image,
        "doctor_clinic_ids":DoctorDBStruc[row].clinic_ids
      }
     displaydoctor.push(data);
     }
   return (displaydoctor);
  }
module.exports = {DoctorStruc,DoctorReadAllStruc};
