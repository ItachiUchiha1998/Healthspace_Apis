function ReportStruc(ReportDBStruc) {
  return {
      "report_id": ReportDBStruc._id,
      "report_appointment_id": ReportDBStruc.appointment_id,
      "report_clinic_id": ReportDBStruc.clinic_id,
      "report_patient_id": ReportDBStruc.patient_id,
      "report_doctor_id": ReportDBStruc.doctor_id,
      "report_description": ReportDBStruc.description,
      "report_bill": ReportDBStruc.bill,
      "report_paid": ReportDBStruc.paid,
      "report_report_link": ReportDBStruc.report_link
  }
}

function ReportReadAllStruc(ReportDBStruc){
  displayreport=[];
    for(row in ReportDBStruc){
     data ={
      "report_id": ReportDBStruc[row]._id,
      "report_appointment_id": ReportDBStruc[row].appointment_id,
      "report_clinic_id": ReportDBStruc[row].clinic_id,
      "report_description": ReportDBStruc[row].description,
      "report_patient_id": ReportDBStruc[row].patient_id,
      "report_doctor_id": ReportDBStruc[row].doctor_id,
      "report_bill": ReportDBStruc[row].bill,
      "report_paid": ReportDBStruc[row].paid,
      "report_report_link": ReportDBStruc[row].report_link
      }
     displayreport.push(data);
     }
   return (displayreport);
  }
module.exports = {ReportStruc,ReportReadAllStruc};
