const express =require("express");
const app = express();
const mongoose = require("mongoose");
const Patient = require("./models/patient.js");
const path = require("path");


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

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get("/" , (req,res)=>{
    res.send("Hii this is root");
});
app.get("/home", async(req,res)=>{
    
    res.render("Patient/home.ejs" );

});
// index rout

app.get("/homepage", async(req,res)=>{
      const allPatients = await Patient.find({});
      res.render("Patient/index.ejs" , {allPatients});

}); 

// Adding new Patient
app.get("/homepage/new" , (req,res)=>{
    res.render("Patient/newappoi.ejs");
}) 

// Show Rout 
app.get("/homepage/:id", async(req,res)=>{
    let {id} = req.params;
    const patient = await Patient.findById(id);
    res.render("Patient/show.ejs",{patient});
})

//Paydone
app.get("/pay" , (req,res)=>{
    res.render("Patient/PayDone.ejs");
});


//Addint new appointment to data base
app.post("/homepage" , async(req,res)=>{
     const newPatient = new Patient(req.body.Patient);
    await newPatient.save();
    res.redirect("/pay");
})


// app.get("/testPatients",async(req,res)=>{
//     let samplePatient = new Patient({
//         patientname:"Nihal",
//         emailId:"nihal@gmail.com",
//         mobile:62634499725,
//         age:19,
//         Gender:"Male",
//     });
//     await samplePatient.save();
//     console.log("Sample was saved");
//     res.send("SuccessFully Added");
// })
app.listen(8080 , ()=>{
    console.log("Server is listening to port 8080");
})