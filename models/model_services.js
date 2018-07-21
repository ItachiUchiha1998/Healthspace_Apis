var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const db = require('../db/model');

var Service = db.Services_Details;

var loop = function (a,newService) {

    for(var i=0;i < a.length;i++) {

          let b = a[i];

        Service.findOne({service: b}).then(function(item){

          if(item) {
            console.log("Duplicate service encountered");
          }
          else {
            Service.create({
              service: b,
              role: newService.service_role,
            }).then(function(){
              console.log("Service added")
            })
          }

        })


        }

     var message = {success: true};

    return Promise.resolve(message);
};

function create(newService,callback) {

        var a = newService.service_text;

        loop(a,newService).then(function(data){
          callback(JSON.stringify(data))
          console.log("Response: " + data)
        }).catch(function(err){
          console.error(err)
        })

}

function read(callback) {
    Service.find({}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayService= [];
          for(ServiceRow in user)
         {var row = user[ServiceRow];
             displayService.push(row);}
            callback(JSON.stringify(displayService));
       }
    });
}

function readbyRole(Servicerole,callback) {
    Service.find({ role : Servicerole}, function (err, user) {
        if (err) {
            console.log(err);
            callback("0");
        }
       else {
         displayService= [];
          for(ServiceRow in user)
         {var row = user[ServiceRow];
             displayService.push(row);}
            callback(JSON.stringify(displayService));
       }
    });
}

function delete_service(Serviceid, callback){
  Service.remove({_id: Serviceid},function(err,doc){
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

function update(newService,Serviceid,callback){
  Service.findOneAndUpdate({ _id: Serviceid}, {$set: {
              service: newService.service_text,
              role: newService.service_role,
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

module.exports = {create,read,readbyRole, delete_service,update};
