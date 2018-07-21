var mongoose = require('mongoose');

var mongoDB = 'mongodb://localhost:27017/HealthSpace';
mongoose.connect(mongoDB);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
if(db) {console.log("Connected");}
