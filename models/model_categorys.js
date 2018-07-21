var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Category = db.Categorys_Details;

var loop = function (a,newCategory) {

    for(var i=0;i < a.length;i++) {

          let b = a[i];

        Category.findOne({category: b}).then(function(item){

          if(item) {
            console.log("Duplicate category encountered");
          }
          else {
            Category.create({
              category: b,
              role: newCategory.category_role,
            }).then(function(){
              console.log("Category added")
            })
          }

        })


        }

     var message = {success: true};

    return Promise.resolve(message);
};

function create(newCategory,callback) {

        var a = newCategory.category_text;

        loop(a,newCategory).then(function(data){
          callback(JSON.stringify(data))
          console.log("Response: " + data)
        }).catch(function(err){
          console.error(err)
        })

}

function read(callback) {
    Category.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayCategory= [];
          for(CategoryRow in user)
         {var row = user[CategoryRow];
             displayCategory.push(row);}
            callback(JSON.stringify(displayCategory));
       }
    });
}

function readbyRole(Categoryrole,callback) {
    Category.find({ role : Categoryrole}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayCategory= [];
          for(CategoryRow in user)
         {var row = user[CategoryRow];
             displayCategory.push(row);}
            callback(JSON.stringify(displayCategory));
       }
    });
}

function delete_category(Categoryid, callback){
  Category.remove({_id: Categoryid},function(err,doc){
    if(err){
			console.log(err);
			callback("null");
		}
    else{
			console.log(doc);
      callback(JSON.stringify(doc.n));
    }
  })
}

function update(newCategory,Categoryid,callback){
  Category.findOneAndUpdate({ _id: Categoryid}, {$set: {
              category: newCategory.category_text,
              role: newCategory.category_role,
      }}, {new: true}, function(err, doc){
      if(err){
          console.log(err);
	  callback("0");
      }
      else{
        callback(JSON.stringify(doc));
      }
  });
}

module.exports = {create,read,readbyRole, delete_category,update};
