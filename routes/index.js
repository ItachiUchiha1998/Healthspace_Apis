const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const db = require('../db/model');
const path = require('path');
const aws = require('./awsfileuploads');
const cors = require('cors');

const clinic_master_crud = require('./clinic_master');
const doctor_crud = require('./doctor');
const review_crud = require('./review');
const report_crud = require('./report');
const clinic_crud = require('./clinic');
const prescription_crud = require('./prescription');
const patient_crud = require('./patient');
const appointment_crud = require('./appointment');
const clbycm = require('./clbycm');
const category_crud = require('./category');
const service_crud = require('./service');
const speciality_crud = require('./speciality');
const docbycl = require('./docbycl')

router.use(bodyParser.urlencoded({ extended: true }));

router.use(cors());
router.use('/', clinic_master_crud);
router.use('/',doctor_crud);
router.use('/',review_crud);
router.use('/',report_crud);
router.use('/',clinic_crud);
router.use('/',prescription_crud);
router.use('/',patient_crud);
router.use('/',appointment_crud);
router.use('/',clbycm);
router.use('/',category_crud);
router.use('/',service_crud);
router.use('/',speciality_crud);
router.use('/',docbycl);
router.use('/',aws);

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
    res.header('Access-Control-Allow-Origin', 'http://localhost:7000/');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

router.get('/', (req,res) => {
    res.send({success: true});
});



router.post('/postClinicDetails', (req,res) => { // Create Clinic Details
	db.Clinic_Details.create({
        name: req.body.name,
		address: {
				   Location: req.body.location,
				   Locality: req.body.locality,
				   City: req.body.city,
				   Street: req.body.street
				},
		categories: req.body.categories,
		open_time: req.body.open_time,
		close_time: req.body.close_time,
		contact: req.body.contact,
		email: req.body.email,
		location: req.body.location,
		website: req.body.website,
		images: req.body.images,
		services: req.body.services,
		description: req.body.description,
		working_days: req.body.working_days
    }).then(function(item){
        var a = item.services;
        a.forEach((v) => {
            db.Tags_Details.findOne({ tag: v , role: "Clinic" }).then(function(data){

                console.log(v);
                if (data) {
                    console.log("Tag exists")
                }
                else {
                    db.Tags_Details.create({
                        tag: v,
                        role: "Clinic"
                    })
                }
            }).catch(function() {
                console.error("err");
                res.send({success: false})
            })
        })
    }).then(function() {
        res.send({ success: true,message: 'Clinic Created'});
    }).catch(function(err) {
        console.log(err);
        res.send({ success: false });
    })
});

router.post('/postDoctor', (req,res) => { // create Doctor Details
	db.Doctor_Details.create({
		MCI_Number: req.body.MCI_Number,
		name: req.body.name,
		contact: req.body.contact,
		email: req.body.email,
		speciality: req.body.speciality,
		gender: req.body.gender,
		open_time: req.body.open_time,
		close_time: req.body.close_time,
		qualification: req.body.qualification,
		experience: req.body.experience,
		profile_image: req.body.profile_image,
    }).then(function(item){
        var a = item.speciality;
        a.forEach((v) => {
            db.Tags_Details.findOne({ tag: v , role: "Doctor" }).then(function(data){

                console.log(v);
                if (data) {
                    console.log("Tag exists")
                }
                else {
                    db.Tags_Details.create({
                        tag: v,
                        role: "Doctor"
                    })
                }
            }).catch(function() {
                console.error("err");
                res.send({success: false})
            })
        })
    }).then(function() {
        res.send({ success: true,message: 'Doctor Created'});
    }).catch(function(err) {
        console.log(err);
        res.send({ success: false });
    })
});

router.post('/postPatient', (req,res) => { // create Patient Details
	db.Patient_Details.create({
		name: req.body.name,
		age: req.body.age,
		gender: req.body.gender,
		dob: req.body.dob,
		contact: req.body.contact,
		email: req.body.email,
		profile_image: req.body.profile_image,
		allergies: req.body.allergies,
		diseases: req.body.diseases,
		blood_group: req.body.blood_group,
		height: req.body.height,
		weight: req.body.weight,
		BMI: req.body.BMI,
		medications: req.body.medications,
    }).then(function() {
        res.send({ success: true,message: 'Patient Created'});
    }).catch(function(err) {
        console.log(err);
        res.send({ success: false });
    })
});

router.post('/postAppointment', (req,res) => { // create Appointment Details
	db.Appointment_Details.create({
		date: req.body.date,
		time: req.body.time,
		patient_id: req.body.patient_id,
		doctor_id: req.body.doctor_id,
		type: req.body.type,
		reason: req.body.reason,
		services: req.body.services,
		clinic_id: req.body.clinic_id,
		status: req.body.status,
		prescription_ids: req.body.prescription_ids,
		referedBy: req.body.referedBy,
		report_ids: req.body.report_ids
	}).then(function() {
        res.send({ success: true,message: 'Appointment Created'});
    }).catch(function(err) {
        console.log(err);
        res.send({ success: false });
    })
});

router.post('/getPatientDets', (req, res) => { // list all patients
    db.Patient_Details.find({}, (err, data) => {
        if (err) {
            res.send({ success: false });
            return console.error(err);
        } else {
            res.send({ success: true, data: data });
        }
    });
});

router.post('/getAppointmentDets', (req, res) => { // list all appointments
    db.Appointment_Details.find({}, (err, data) => {
        if (err) {
            res.send({ success: false });
            return console.error(err);
        } else {
            res.send({ success: true, data: data });
        }
    });
});

router.post('/getPatientDets/:id', (req, res) => { // return patient by id
    db.Patient_Details.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.send({ success: false });
            return console.error(err);
        } else {
            res.send({ success: true, data: data });
        }
    });
});

router.post('/getAppointmentDets/:id', (req, res) => { // return appointment by id
    db.Appointment_Details.find({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.send({ success: false });
            return console.error(err);
        } else {
            res.send({ success: true, data: data });
        }
    });
});

router.post('/delPatient/:id', (req, res) => { // delete a patient
    db.Patient_Details.findOne({ _id: req.params.id }, function(err, data) {
        if (err) {
            return console.error(err);
        }
        if (!data) {
            res.send({ message: 'Does not exist' })
            console.log("Does not exist")
        } else {
            data.remove(function(err, data) {
                if (err) {
                    return console.error(err);
                } else {
                    res.send({ success: true });
                }
            });
        }
    });
});

router.post('/delAppointment/:id', (req, res) => { // delete a appointment
    db.Appointment_Details.findOne({ _id: req.params.id }, function(err, data) {
        if (err) {
            return console.error(err);
        }
        if (!data) {
            res.send({ message: 'Does not exist' })
            console.log("Does not exist")
        } else {
            data.remove(function(err, data) {
                if (err) {
                    return console.error(err);
                } else {
                    res.send({ success: true });
                }
            });
        }
    });
});

router.post('/editPatient/:id', function(req, res) { // edit a patient

    db.Patient_Details.findById(req.params.id, function(err, item) {
        item.update({
                name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        dob: req.body.dob,
        contact: req.body.contact,
        email: req.body.email,
        profile_image: req.body.profile_image,
        allergies: req.body.allergies,
        diseases: req.body.diseases,
        blood_group: req.body.blood_group,
        height: req.body.height,
        weight: req.body.weight,
        BMI: req.body.BMI,
        medications: req.body.medications,
        }, function(err, itemID) {
            if (err) {
                res.send("Error encountered!!" + err);
            } else {
                console.log("Updated:" + itemID)
                res.send({ success: true });
            }
        })
    });
});

router.post('/editAppointment/:id', function(req, res) { // edit a appointment

    db.Appointment_Details.findById(req.params.id, function(err, item) {
        item.update({
            date: req.body.date,
            time: req.body.time,
            patient_id: req.body.patient_id,
            doctor_id: req.body.doctor_id,
            type: req.body.type,
            reason: req.body.reason,
            services: req.body.services,
            clinic_id: req.body.clinic_id,
            status: req.body.status,
            prescription_ids: req.body.prescription_ids,
            referedBy: req.body.referedBy,
            report_ids: req.body.report_ids
        }, function(err, itemID) {
            if (err) {
                res.send("Error encountered!!" + err);
            } else {
                console.log("Updated:" + itemID)
                res.send({ success: true });
            }
        })
    });
});

router.post('/subscribeClinic' , (req,res) => {

    db.Clinic_Master_Details.findById(req.body.clinicmaster_id,function(err,item) {

            item.update( { $push: { clinics: req.body.clinic_id } } ).then(function(item) {

                db.Clinic_Details.findById(req.body.clinic_id,function(err,item) {

                    item.update({

                        parent_clinic_id: req.body.clinicmaster_id

                    }).then(function(item){

                        res.send({success: true})

                    }).catch(function(err) {
                        console.log(err);
                        res.send({ success: false,message: "error2"  });
                    })
                })
            })
            .catch(function(err) {
                console.log(err);
                res.send({ success: false,message:"error1" });
    })
})
})

router.post('/subscribeDoctor/:id' , (req,res) => {

    db.Clinic_Details.findById(req.body.id,function(err,item) {

            item.update( { $push: { doctor_ids: req.params.id } } ).then(function(item) {

                db.Doctor_Details.findById(req.params.id,function(err,item) {

                    item.update({

                         $push: { clinic_ids: req.body.id }

                    }).then(function(item){

                        res.send({success: true})

                    }).catch(function(err) {
                        console.log(err);
                        res.send({ success: false,message: "error2"  });
                    })
                })
            })
            .catch(function(err) {
                console.log(err);
                res.send({ success: false,message:"error1" });
    })
})
})

router.post('/fetchReport/:id', (req,res) => {

    db.Report_Details.find({ clinic_id: req.body.clinic_id,patient_id: req.params.id }).then(function(data) {
        if (!data) {
            res.send({success:true,data:data,message:"Not Found"});
        } else {
            res.send({success:true,data:data,message:"Found"});
        }
    })
})

router.post('/fetchPrescription/:id', (req,res) => {

    db.Prescription_Details.find({ clinic_id: req.body.clinic_id,patient_id: req.params.id }).then(function(data) {
        if (!data) {
            res.send({success:true,data:data,message:"Not Found"});
        } else {
            res.send({success:true,data:data,message:"Found"});
        }
    })
})


router.post('/getClinicPatient/:id', (req,res) => {
    db.Clinic_Details.findOne({_id: req.params.id}).then(function(data) {
        var a = data.patient_ids;

        a.forEach((v) => {
            db.Patient_Details.findOne({ _id: v}).then(function(data){

                console.log(v);
                res.send({data: data,success: true})

            }).catch(function() {
                console.error("err");
                res.send({success: false})
            })
        })

    }).catch(function(err){
        console.error(err);
        res.send({success: false,message: err})
    })
})

router.post('/getDoctorPatient/:id', (req,res) => {
    db.Doctor_Details.findOne({_id: req.params.id}).then(function(data) {
        var a = data.patient_ids;

        a.forEach((v) => {
            db.Patient_Details.findOne({ _id: v}).then(function(data){

                console.log(v);
                res.send({data: data,success: true})

            }).catch(function() {
                console.error("err");
                res.send({success: false})
            })
        })

    }).catch(function(err){
        console.error(err);
        res.send({success: false,message: err})
    })
})

router.post('/getDoctorAppointment/:id', (req,res) => {
    db.Doctor_Details.findOne({_id: req.params.id}).then(function(data) {

        var a = data.doctor_appointments;

        a.forEach((v) => {
            db.Appointment_Details.findOne({ _id: v}).then(function(data){

                console.log(v);
                res.send({data: data,success: true})

            }).catch(function() {
                console.error("err");
                res.send({success: false})
            })
        })


    })
});

router.post('/getPatientAppointment/:id',(req,res) => {
    db.Patient_Details.findOne({_id: req.params.id}).then(function(data) {
        var a = data.appointment_ids;

        a.forEach((v) => {
            db.Appointment_Details.findOne({ _id: v}).then(function(data){

                console.log(v);
                res.send({data: data,success: true})

            }).catch(function() {
                console.error("err");
                res.send({success: false})
            })
        })

    })
})


/*router.post('/getClinics/:id',(req,res) => {
    var item = []
    db.Clinic_Master_Details.findById(req.params.id).then(function(data) {

        var a = data.clinics;

        a.forEach((v) => {

            db.Clinic_Details.findById(v).then(function(data) {

                 var b = {
                     name: data.name,
                     address: {
                                Location: data.address.Location,
                                Locality: data.address.Locality,
                                City: data.address.City,
                                Street: data.address.Street
                             },
                     categories: data.categories ,
                     contact: data.contact,
                     email: data.email,
                     display_image: data.display_image
                 }

                item.push(b);

            })
        })
            res.send({success: true,data: item})


    }).catch(function(err){
        res.send({success: false,message: err})
        console.error(err);
    })
})*/

module.exports = router;
