function ClinicReadAllStruc(ClinicDBStruc){
  displayclinic=[];
    for(row in ClinicDBStruc){
     data ={
       "clinic_id": ClinicDBStruc[row]._id,
       "clinic_name" : ClinicDBStruc[row].name,
       "clinic_address" : ClinicDBStruc[row].address,
       "clinic_categories" : ClinicDBStruc[row].categories,
       "clinic_opentime" : ClinicDBStruc[row].open_time,
       "clinic_closetime": ClinicDBStruc[row].close_time,
       "clinic_contact": ClinicDBStruc[row].contact,
       "clinic_email": ClinicDBStruc[row].email,
       "clinic_location": ClinicDBStruc.location,
       "clinic_website": ClinicDBStruc[row].website,
       "clinic_images": ClinicDBStruc[row].images,
       "clinic_services": ClinicDBStruc[row].services,
       "clinic_description": ClinicDBStruc[row].description,
       "clinic_workingdays": ClinicDBStruc[row].working_days,
       "clinic_displayimage":ClinicDBStruc[row].display_image
      }
     displayclinic.push(data);
     }
   return (displayclinic);
  }
module.exports = {ClinicReadAllStruc};
