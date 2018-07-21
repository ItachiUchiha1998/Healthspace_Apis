function ServiceReadbyRoleAllStruc(ServiceDBStruc){
  displayservice=[];
    for(row in ServiceDBStruc){
     data ={
      "id": ServiceDBStruc[row].service,
      "text": ServiceDBStruc[row].service
      }
     displayservice.push(data);
     }
   return (displayservice);
  }

  function ServiceReadAllStruc(ServiceDBStruc){
    displayservice=[];
      for(row in ServiceDBStruc){
       data ={
         "service_id":ServiceDBStruc[row]._id,
        "service_text": ServiceDBStruc[row].service,
        "service_role": ServiceDBStruc[row].role,
        }
       displayservice.push(data);
       }
     return (displayservice);
    }

    function ServiceStruc(ServiceDBStruc) {
      return {
          "service_id":ServiceDBStruc._id,
          "service_text": ServiceDBStruc.service,
          "service_role": ServiceDBStruc.role
      }
    }

module.exports = {ServiceStruc,ServiceReadbyRoleAllStruc,ServiceReadAllStruc};
