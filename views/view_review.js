function ReviewStruc(ReviewDBStruc) {
  return {
      "review_id": ReviewDBStruc._id,
      "review_rating": ReviewDBStruc.rating,
      "review_review_body": ReviewDBStruc.review_body,
      "review_patient_id": ReviewDBStruc.patient_id,
      "review_doctor_id": ReviewDBStruc.doctor_id
  }
}

function ReviewReadAllStruc(ReviewDBStruc){
  displayreview=[];
    for(row in ReviewDBStruc){
     data ={
      "review_id": ReviewDBStruc[row]._id,
      "review_rating": ReviewDBStruc[row].rating,
      "review_review_body": ReviewDBStruc[row].review_body,
      "review_patient_id": ReviewDBStruc[row].patient_id,
      "review_doctor_id": ReviewDBStruc[row].doctor_id
      }
     displayreview.push(data);
     }
   return (displayreview);
  }
module.exports = {ReviewStruc,ReviewReadAllStruc};
