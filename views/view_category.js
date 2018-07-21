function CategoryReadbyRoleAllStruc(CategoryDBStruc){
  displaycategory=[];
    for(row in CategoryDBStruc){
     data ={
      "id": CategoryDBStruc[row].category,
      "text": CategoryDBStruc[row].category
      }
     displaycategory.push(data);
     }
   return (displaycategory);
  }

  function CategoryReadAllStruc(CategoryDBStruc){
    displaycategory=[];
      for(row in CategoryDBStruc){
       data ={
         "category_id":CategoryDBStruc[row]._id,
        "category_text": CategoryDBStruc[row].category,
        "category_role": CategoryDBStruc[row].role,
        }
       displaycategory.push(data);
       }
     return (displaycategory);
    }

    function CategoryStruc(CategoryDBStruc) {
      return {
          "category_id":CategoryDBStruc._id,
          "category_text": CategoryDBStruc.category,
          "category_role": CategoryDBStruc.role
      }
    }

module.exports = {CategoryStruc,CategoryReadbyRoleAllStruc,CategoryReadAllStruc};
