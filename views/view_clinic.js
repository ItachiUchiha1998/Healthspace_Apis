function ClinicStruc(ClinicDBStruc) {
  return {
    "clinic_id": ClinicDBStruc._id,
    "clinic_name" : ClinicDBStruc.name,
    "clinic_address" : ClinicDBStruc.address,
    "clinic_categories" : ClinicDBStruc.categories,
    "clinic_timings" : ClinicDBStruc.timings,
    "clinic_contact": ClinicDBStruc.contact,
    "clinic_email": ClinicDBStruc.email,
    "clinic_location": ClinicDBStruc.location,
    "clinic_website": ClinicDBStruc.website,
    "clinic_images": ClinicDBStruc.images,
    "clinic_services": ClinicDBStruc.services,
    "clinic_description": ClinicDBStruc.description,
    "clinic_parentclinicid": ClinicDBStruc.parent_clinic_id,
    "clinic_doctors": ClinicDBStruc.doctor_ids
  }
}

function ClinicReadAllStruc(ClinicDBStruc){
  displayclinic=[];
    for(row in ClinicDBStruc){
     data ={
       "clinic_id": ClinicDBStruc[row]._id,
       "clinic_name" : ClinicDBStruc[row].name,
       "clinic_address" : ClinicDBStruc[row].address,
       "clinic_categories" : ClinicDBStruc[row].categories,
       "clinic_timings" : ClinicDBStruc[row].timings,
       "clinic_contact": ClinicDBStruc[row].contact,
       "clinic_email": ClinicDBStruc[row].email,
       "clinic_location": ClinicDBStruc.location,
       "clinic_website": ClinicDBStruc[row].website,
       "clinic_images": ClinicDBStruc[row].images,
       "clinic_services": ClinicDBStruc[row].services,
       "clinic_description": ClinicDBStruc[row].description,
       "clinic_parentclinicid": ClinicDBStruc[row].parent_clinic_id
      }
     displayclinic.push(data);
     }
   return (displayclinic);
  }
module.exports = {ClinicStruc,ClinicReadAllStruc};
