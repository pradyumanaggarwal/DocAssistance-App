const Patient = require("../models/patient");
const User = require("../models/user");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const user = require("../models/user");

exports.createPatient = (req,res) => {
  
  /*let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }*/
    //destructure the fields
    const { name,description,address,contact} = req.body.patient;
  

    /*if (!name||!tested) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }*/
    
    let patient = new Patient({
      name:name,
      description:description,
      address:address,
      contact:contact,
      doctor:req.body.userId
    });
    console.log(patient)
    //handle file here
    // if (file.photo) {
    //   if (file.photo.size > 3000000) {
    //     return res.status(400).json({
    //       error: "File size too big!"
    //     });
    //   }
    //   product.photo.data = fs.readFileSync(file.photo.path);
    //   product.photo.contentType = file.photo.type;
    // }
    // console.log(product);

    //save to the DB
    patient.save((err, patient) => {
      if (err) {
        res.status(400).json({
          error: "Saving Patient to DB failed!"
        });
      }
      res.json({
        name : name,
        description:description,
        address,address,
        contact:contact,
        doctor:req.body.userId
    });
  });

};

exports.getAllPatients = (req,res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  
    Patient.find({doctor : req.profile._id})
    //.populate("_id")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, patients) => {
      if (err) {
        return res.status(400).json({
          error: "NO Patient FOUND!"
        });
      }
      res.json(patients);
    });
};



