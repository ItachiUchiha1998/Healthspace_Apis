const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3')
const router = express.Router();

const aws_access_key_id = "";
const aws_secret_access_key = "";

AWS.config.update({
    accessKeyId: aws_access_key_id,
    secretAccessKey: aws_secret_access_key,
    region: 'ap-south-1'
});

const s3 = new AWS.S3();

var upload_clinic_images = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'myhealthspace/ClinicImages',
    key: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
  })
})

var upload_doctor_images = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'myhealthspace/DoctorImages',
    key: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
  })
})

var upload_patient_images = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'myhealthspace/PatientImages',
    key: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
  })
})

var upload_reports = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'myhealthspace/ReportImages',
    key: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
  })
})

var upload_prescription = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'myhealthspace/PrescriptionImages',
    key: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
  })
})

var upload_reports_self = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'myhealthspace/Report_SelfImages',
    key: function (req, file, cb) {
      cb(null, Date.now()+'-'+file.originalname)
    }
  })
})

router.post('/upload/ClinicImages',upload_clinic_images.single('file'), (req, res) => { // file upload
    console.log(req)
    res.send({path: req.file.location, success: true});
})

router.post('/upload/DoctorImages',upload_doctor_images.array('file',1), (req, res) => { // file upload
    console.log("File uploaded to DoctorImages folder")
    res.send({path: req.files[0].location,success: true});
})

router.post('/upload/PatientImages',upload_patient_images.array('file',1), (req, res) => { // file upload
    console.log("File uploaded to PatientImages folder")
    res.send({path: req.files[0].location,success: true});
})

router.post('/upload/Reports',upload_reports.array('file',1), (req, res) => { // file upload
    console.log("File uploaded to Reports folder")
    res.send({path: req.files[0].location,success: true});
})

router.post('/upload/Prescription',upload_prescription.array('file',1), (req, res) => { // file upload
    console.log("File uploaded to Prescription folder")
    res.send({path: req.files[0].location,success: true});
})

router.post('/upload/selfReport',upload_reports_self.array('file',1), (req, res) => { // file upload
    console.log("File uploaded to Report_Self folder")
    res.send({path: req.files[0].location,success: true});
})


module.exports = router
