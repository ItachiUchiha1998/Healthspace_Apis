var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Speciality = db.Specialitys_Details;

var loop = function (a,newSpeciality) {

    for(var i=0;i < a.length;i++) {

          let b = a[i];

        Speciality.findOne({speciality: b}).then(function(item){

          if(item) {
            console.log("Duplicate speciality encountered");
          }
          else {
            Speciality.create({
              speciality: b,
              role: newSpeciality.speciality_role,
            }).then(function(){
              console.log("Speciality added")
            })
          }

        })


        }

     var message = {success: true};

    return Promise.resolve(message);
};

function create(newSpeciality,callback) {

        var a = newSpeciality.speciality_text;

        loop(a,newSpeciality).then(function(data){
          callback(JSON.stringify(data))
          console.log("Response: " + data)
        }).catch(function(err){
          console.error(err)
        })

}

function read(callback) {
    Speciality.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displaySpeciality= [];
          for(SpecialityRow in user)
         {var row = user[SpecialityRow];
             displaySpeciality.push(row);}
            callback(JSON.stringify(displaySpeciality));
       }
    });
}

function readbyRole(Specialityrole,callback) {
    Speciality.find({ role : Specialityrole}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displaySpeciality= [];
          for(SpecialityRow in user)
         {var row = user[SpecialityRow];
             displaySpeciality.push(row);}
            callback(JSON.stringify(displaySpeciality));
       }
    });
}

function delete_speciality(Specialityid, callback){
  Speciality.remove({_id: Specialityid},function(err,doc){
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

function update(newSpeciality,Specialityid,callback){
  Speciality.findOneAndUpdate({ _id: Specialityid}, {$set: {
              speciality: newSpeciality.speciality_text,
              role: newSpeciality.speciality_role,
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

module.exports = {create,read,readbyRole, delete_speciality,update};
