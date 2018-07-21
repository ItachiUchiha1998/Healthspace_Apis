function ClinicMasterStruc(ClinicMasterDBStruc) {
  return {
    "clinicmaster_id": ClinicMasterDBStruc._id,
    "clinicmaster_name" : ClinicMasterDBStruc.name,
    "clinicmaster_companynumber" : ClinicMasterDBStruc.company_number,
    "clinicmaster_adminname" : ClinicMasterDBStruc.admin_name,
    "clinicmaster_contactinfo" : ClinicMasterDBStruc.contact_info,
    "clinicmaster_clinics": ClinicMasterDBStruc.clinics
  }
}

function ClinicMasterReadAllStruc(ClinicMasterDBStruc){
  displayclinicmaster=[];
    for(row in ClinicMasterDBStruc){
     data ={
        "clinicmaster_id": ClinicMasterDBStruc[row]._id,
        "clinicmaster_name" : ClinicMasterDBStruc[row].name,
        "clinicmaster_companynumber" : ClinicMasterDBStruc[row].company_number,
        "clinicmaster_adminname" : ClinicMasterDBStruc[row].admin_name,
        "clinicmaster_contactinfo" : ClinicMasterDBStruc[row].contact_info,
        "clinicmaster_clinics": ClinicMasterDBStruc[row].clinics
      }
     displayclinicmaster.push(data);
     }
   return (displayclinicmaster);
  }
module.exports = {ClinicMasterStruc,ClinicMasterReadAllStruc};
