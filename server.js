require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');
const index = require('./routes/index');
const db = require('./db/model');
const app = express();
const port = 7000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);
mongoose.connect('mongodb://healthspaceteam:healthspace101@ds261430.mlab.com:61430/myhealthspace');
app.use(express.static(path.join(__dirname,'dist')));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', 'http://localhost:7000/');
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.listen(port,function(){
	console.log("Listening to port " + port);
});
