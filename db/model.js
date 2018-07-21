const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ClinicMaster_Schema = new Schema({
	created_timestamp: {type: Date,default:Date.now() },
	modify_timestamp: Date,
	name: String,
	company_number: String,
	admin_name: String,
	contact_info: Number,
	clinics: [{ type: Schema.Types.ObjectId, ref: 'clinic_details' }]
})

var Clinic_Schema = new Schema({
	created_timestamp: {type: Date,default:Date.now() },
	modify_timestamp: Date,
	name: String,
	address: Object, //
	//address: { //
	//		   Location: String,// name change
	//		   Locality: String,
	//		   City: String,
	//		   Street: String
	//		},
	categories: [ String ], //
	doctor_ids: [{ type: Schema.Types.ObjectId, ref: 'doctor_details' }],
	contact: Number,//
	email: String, //
	location: [Number],
	timings: Object,
	website: String,
	images: [String],
	display_image: String,//
	services: [String] ,
	description: String,
	//billing_details: [String],
	parent_clinic_id: { type: Schema.Types.ObjectId, ref:'clinic_master_details' },
	patient_ids: [String]
})

var Doctor_Schema = new Schema({
	created_timestamp: {type: Date,default:Date.now() },
	modify_timestamp: Date,
	mci_number: String,
	name: String,
	contact: Number,
	email: String,
	clinic_ids: [{ type: Schema.Types.ObjectId, ref: 'clinic_details' }],
	speciality: [String],
	gender: String, //
	patient_ids: [String],
	qualification: String, //
	experience: String,
	profile_image: String, //
	reviews_ids: [String],
	doctor_appointments: [String],
	clinics:[{clinic_id:String, clinic_name:String, timings:Array, services: Array}]
})

var Patient_Schema = new Schema({
	created_timestamp: {type: Date,default:Date.now() },
	modify_timestamp: Date,
	name: String,
	age: Number,
	gender: String,
	address: {
			   Location: String,
			   Locality: String,
			   City: String,
			   Street: String
			},
	dob: Number,
	contact: Number,
	email: String,
	profile_image: String,
	allergies: [String],
	diseases: [String],
	blood_group: String,
	height: Number,
	weight: Number,
	BMI: Number,
	medications: [String],
	doctor_ids: [String],
	appointment_ids: [String],
	report_ids: [String]
})

var Appointment_Schema = new Schema({
	created_timestamp: {type: Date,default:Date.now() },
	modify_timestamp: Date,
	date: Number,
	time: Number,
	patient_id: String,
	doctor_id: String,
	type: Boolean,
	reason: String,
	services: [String],
	clinic_id: String,
	status: Number, // confirmed| pending| completed, stored in db/ config file
	prescription_ids: [String],
	referedBy: String,
	report_ids: [String]
})

var Report_Schema = new Schema({
	created_timestamp: {type: Date,default:Date.now() },
	description: String,
	modify_timestamp: Date,
	appointment_id: String,
	patient_id: String,
	doctor_id: String,
	clinic_id: String,
	bill: Number,
	date: Number,
	paid: {type: Boolean,default:false},
	report_link: [String]
})

var Prescription_Schema = new Schema({
	created_timestamp: {type: Date,default:Date.now() },
	modify_timestamp: Date,
	appointment_id: String,
	patient_id:String,
	doctor_id: String,
	clinic_id: String,
	reports: [String],
	medicines: [String],
	clinical_notes: [String],
	observations: [String],
	followup_date: Number
});

var Review_Schema = new Schema({
	rating: Number,
	review_body: String,
	patient_id: String,
	doctor_id: String
});

var Categorys_Schema = new Schema({
	category: String,
	role: String
})

var Services_Schema = new Schema({
	service: String,
	role: String
})

var Specialitys_Schema = new Schema({
	speciality: String,
	role: String
})

var Clinic_Master_Details = mongoose.model('clinic_master_details',ClinicMaster_Schema);
var Clinic_Details = mongoose.model('clinic_details',Clinic_Schema);
var Doctor_Details = mongoose.model('doctor_details',Doctor_Schema);
var Patient_Details = mongoose.model('patient_details',Patient_Schema);
var Appointment_Details = mongoose.model('appointment_details',Appointment_Schema);
var Report_Details = mongoose.model('report_details',Report_Schema);
var Prescription_Details = mongoose.model('prescription_details',Prescription_Schema);
var Review_Details = mongoose.model('review_details',Review_Schema);
var Categorys_Details = mongoose.model('categorys_details',Categorys_Schema);
var Services_Details = mongoose.model('services_details',Services_Schema);
var Specialitys_Details = mongoose.model('specialitys_details',Specialitys_Schema);

module.exports =  {
	Clinic_Master_Details: Clinic_Master_Details,
	Clinic_Details: Clinic_Details,
	Doctor_Details: Doctor_Details,
	Appointment_Details: Appointment_Details,
	Patient_Details: Patient_Details,
	Report_Details: Report_Details,
	Prescription_Details: Prescription_Details,
	Review_Details: Review_Details,
	Categorys_Details: Categorys_Details,
	Services_Details: Services_Details,
	Specialitys_Details: Specialitys_Details
};
