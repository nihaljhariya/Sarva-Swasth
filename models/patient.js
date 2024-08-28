const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    patientname:{
        type:String,
        required:true,
    },
    emailId:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true, 
    },
    age:{
        type:Number,
        required:true, 
    },
    Gender:{
        type:String,
        required:true, 
    },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;