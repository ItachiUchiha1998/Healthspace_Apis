function SpecialityReadbyRoleAllStruc(SpecialityDBStruc){
  displayspeciality=[];
    for(row in SpecialityDBStruc){
     data ={
      "id": SpecialityDBStruc[row].speciality,
      "text": SpecialityDBStruc[row].speciality
      }
     displayspeciality.push(data);
     }
   return (displayspeciality);
  }

  function SpecialityReadAllStruc(SpecialityDBStruc){
    displayspeciality=[];
      for(row in SpecialityDBStruc){
       data ={
         "speciality_id":SpecialityDBStruc[row]._id,
        "speciality_text": SpecialityDBStruc[row].speciality,
        "speciality_role": SpecialityDBStruc[row].role,
        }
       displayspeciality.push(data);
       }
     return (displayspeciality);
    }

    function SpecialityStruc(SpecialityDBStruc) {
      return {
          "speciality_id":SpecialityDBStruc._id,
          "speciality_text": SpecialityDBStruc.speciality,
          "speciality_role": SpecialityDBStruc.role
      }
    }

module.exports = {SpecialityStruc,SpecialityReadbyRoleAllStruc,SpecialityReadAllStruc};
