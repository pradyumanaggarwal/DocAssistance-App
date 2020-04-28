const Hospital = require("../models/hospital");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.createHospital = (req,res) => {

  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name,address,contact} = fields;

    if (!name ||!address||!contact) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let hospital = new Hospital(fields);

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
    hospital.save((err, hospital) => {
      if (err) {
        res.status(400).json({
          error: "Saving Hospital to DB failed!"
        });
      }
      res.json(hospital);
    });
  });

};

exports.getAllHospitals = (req,res) => {

    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Hospital.find()
    .populate("_id")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, hospitals) => {
      if (err) {
        return res.status(400).json({
          error: "NO Hospital FOUND!"
        });
      }
      res.json(hospitals);
    });
};



