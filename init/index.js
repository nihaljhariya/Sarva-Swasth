const mongoose = require("mongoose");
const initData = require("./patientdata.js");
const Patient = require("../models/patient.js")

const MONGO_URL = "mongodb://127.0.0.1:27017/SIH";

main()
  .then(()=>{
    console.log("Connected to DB");
})
  .catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await Patient.deleteMany({});
    await Patient.insertMany(initData.data);
    console.log("data was Initialized");
}
initDB();